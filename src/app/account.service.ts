import { inject, Injectable } from '@angular/core';
import { Utilities } from './utils.service';
import { Account } from './types/account';

export type AccountsPage = {
    accounts: Account[],
    totalPages: number
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  utilities: Utilities;
  constructor() {
    this.utilities = inject(Utilities);
  }

  getCurUserId() {
    return this.utilities.getCurUserId();
  }

  async getAccountsOfUser(accountId: number, page?: number) 
  : Promise<AccountsPage> {
    let endpoint = `${this.utilities.getServerUrl()}/api/accountsOfUser/${accountId}`;
    const bearerToken = this.utilities.getAuthToken();
    console.log("GET", endpoint, bearerToken);
    if (page) {
        endpoint += `?pageNo=${page}`;
    }

    let returnVal: AccountsPage;
    return await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": bearerToken
        }
    }).then(async (response) => {
    if (response.ok) {
        const accountsPage = await response.json()

        let accounts = accountsPage["content"];
        accounts.forEach((e: any) => {
          e.accountTypeId = e.accountType.typeId;
        });
        console.log("accountS ", accounts);
        return {
            accounts: accounts,
            totalPages: accountsPage["totalPages"],
        }
    } else {
        const errorMessage = await response.text();
        alert("ERROR: " + errorMessage);

        return null;
    }
    }).then((promiseReturnVal: AccountsPage | null) => {
        if (promiseReturnVal === null) {
            returnVal = {
                accounts: [],
                totalPages: -1,
            }
        } else {
            returnVal = promiseReturnVal;
        }

        console.warn("RETURNING", returnVal);
        return returnVal;
    });
  }
}
