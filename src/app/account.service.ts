import { inject, Injectable } from '@angular/core';
import { Utilities } from './utils.service';
import { Account, AccountDetails, Balance } from './types/account';

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

  async getAccountsOfUser(userId: number, page?: number) 
  : Promise<AccountsPage> {
    let endpoint;
    // HACK: for now, hardcode admin to userId 1
    // NOTE: for admin, return ALL accounts
    if (userId == 1) {
        endpoint = `${this.utilities.getServerUrl()}/api/accounts?pageSize=0`;
    } else {
        endpoint = `${this.utilities.getServerUrl()}/api/accountsOfUser/${userId}?pageSize=0`;
    }
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
        // accounts.forEach((a: Account) => {
        //     if (a?.balance ?? null == null) {
        //         a.balance = {
        //             depositBalance: "*****",
        //             totalBalance: "*************",
        //         }
        //     }
        // });
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


  async getAccount(accountId: number, withBalance?: boolean) 
  : Promise<Account | null> {
    let endpoint = `${this.utilities.getServerUrl()}/api/account/${accountId}`;
    const bearerToken = this.utilities.getAuthToken();
    console.log("GET", endpoint, bearerToken);

    let returnVal: Account | null;
    return await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": bearerToken
        }
    }).then(async (response) => {
    if (response.ok) {
        let account = await response.json()

        if (withBalance) {
            const balance = await this.getBalance(accountId);
            if (balance) {
                account.balance = balance;
            }
            // TODO: handle balance === null
        }
        console.log("account ", account);
        return account;
    } else {
        const errorMessage = await response.text();
        alert("ERROR: " + errorMessage);

        return null;
    }
    }).then((promiseReturnVal: Account | null) => {
        if (promiseReturnVal === null) {
            // TODO: send dummy account value on error?
            returnVal = null;
        } else {
            returnVal = promiseReturnVal;
        }

        console.warn("RETURNING", returnVal);
        return returnVal;
    });
  }

  async getAccountIdForAccountNumber(accountNumber: number, withBalance?: boolean) 
  : Promise<number | null> {
    let endpoint = `${this.utilities.getServerUrl()}/api/getAccountIdForAccountNumber/${accountNumber}`;
    const bearerToken = this.utilities.getAuthToken();
    console.log("GET", endpoint, bearerToken);

    let returnVal: number | null;
    return await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": bearerToken
        }
    }).then(async (response) => {
    if (response.ok) {
        let account = await response.json()

        if (withBalance) {
            const balance = await this.getBalance(accountNumber);
            if (balance) {
                account.balance = balance;
            }
            // TODO: handle balance === null
        }
        console.log("account ", account);
        return account;
    } else {
        const errorMessage = await response.text();
        alert("ERROR: " + errorMessage);

        return null;
    }
    }).then((promiseReturnVal: number | null) => {
        if (promiseReturnVal === null) {
            // TODO: send dummy account value on error?
            returnVal = null;
        } else {
            returnVal = promiseReturnVal;
        }

        console.warn("RETURNING", returnVal);
        return returnVal;
    });
  }

  async getAccountDetails(accountId: number) 
  : Promise<AccountDetails | null> {
    let endpoint = `${this.utilities.getServerUrl()}/api/getAccountDetails/${accountId}`;
    const bearerToken = this.utilities.getAuthToken();
    console.log("GET", endpoint, bearerToken);

    let returnVal: AccountDetails | null;
    return await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": bearerToken
        }
    }).then(async (response) => {
    if (response.ok) {
        let account = await response.json()

        console.log("account ", account);
        return account;
    } else {
        const errorMessage = await response.text();
        alert("ERROR: " + errorMessage);

        return null;
    }
    }).then((promiseReturnVal: AccountDetails | null) => {
        if (promiseReturnVal === null) {
            // TODO: send dummy account value on error?
            returnVal = null;
        } else {
            returnVal = promiseReturnVal;
        }

        console.warn("RETURNING", returnVal);
        return returnVal;
    });
  }

  async getBalance(accountId: number) 
  : Promise<Balance | null> {
    let endpoint = `${this.utilities.getServerUrl()}/api/getBalance/${accountId}`;
    const bearerToken = this.utilities.getAuthToken();
    console.log("GET", endpoint, bearerToken);

    let returnVal: Balance | null;
    return await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": bearerToken
        }
    }).then(async (response) => {
    if (response.ok) {
        const balance: Balance = await response.json()
        console.log("balance ", balance);
        return balance;
    } else {
        const errorMessage = await response.text();
        alert("ERROR: " + errorMessage);

        return null;
    }
    }).then((promiseReturnVal: Balance | null) => {
        if (promiseReturnVal === null) {
            // TODO: send dummy account value on error?
            returnVal = null;
        } else {
            returnVal = promiseReturnVal;
        }

        console.warn("RETURNING", returnVal);
        return returnVal;
    });
  }

  async closeAccount(accountId: number) 
  : Promise<Account | null> {
    let endpoint = `${this.utilities.getServerUrl()}/api/closeAccount/${accountId}`;
    const bearerToken = this.utilities.getAuthToken();
    console.log("DELETE", endpoint, bearerToken);

    let returnVal: Account | null;
    return await fetch(endpoint, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": bearerToken
        }
    }).then(async (response) => {
    if (response.ok) {
        let account = await response.json()

        console.log("account deleted", account);
        return account;
    } else {
        const errorMessage = await response.text();
        alert("ERROR: " + errorMessage);

        return null;
    }
    }).then((promiseReturnVal: Account | null) => {
        if (promiseReturnVal === null) {
            // TODO: send dummy account value on error?
            returnVal = null;
        } else {
            returnVal = promiseReturnVal;
        }

        console.warn("RETURNING", returnVal);
        return returnVal;
    });
  }
}
