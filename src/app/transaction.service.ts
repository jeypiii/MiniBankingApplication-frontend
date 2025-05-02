import { inject, Injectable } from '@angular/core';
import { bigDecimal } from 'js-big-decimal';

import { Utilities } from './utils.service';
import { Transaction, TransactionType, TransactionTypes } from './types/transaction';
import { Balance } from './types/account';
import { Authentication } from './authentication.service';
import { AccountService } from './account.service';

export type TransactionsPage = {
    transactions: Transaction[],
    totalPages: number
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  utilities: Utilities;
  accountService: AccountService;

  constructor() {
    this.utilities = inject(Utilities);
    this.accountService = inject(AccountService);
  }

  async getTransactionsForAccount(accountId: number, page?: number) 
  : Promise<TransactionsPage> {
    let endpoint = `${this.utilities.getServerUrl()}/api/transactionsForAccount/${accountId}?pageSize=0`;
    const bearerToken = this.utilities.getAuthToken();
    console.log("GET", endpoint, bearerToken);
    if (page) {
        endpoint += `?pageNo=${page}`;
    }

    let returnVal: TransactionsPage;
    return await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": bearerToken
        }
    }).then(async (response) => {
    if (response.ok) {
        const transactionsPage = await response.json()

        let transactions = transactionsPage["content"];
        console.log("transactionS ", transactions);
        return {
            transactions: transactions,
            totalPages: transactionsPage["totalPages"],
        }
    } else {
        const errorMessage = await response.text();
        alert("ERROR: " + errorMessage);

        return null;
    }
    }).then((promiseReturnVal: TransactionsPage | null) => {
        if (promiseReturnVal === null) {
            returnVal = {
                transactions: [],
                totalPages: -1,
            }
        } else {
            returnVal = promiseReturnVal;
        }

        console.warn("RETURNING", returnVal);
        return returnVal;
    });
  }


  async getTransaction(transactionId: number) 
  : Promise<Transaction | null> {
    let endpoint = `${this.utilities.getServerUrl()}/api/transaction/${transactionId}`;
    const bearerToken = this.utilities.getAuthToken();
    console.log("GET", endpoint, bearerToken);

    let returnVal: Transaction | null;
    return await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": bearerToken
        }
    }).then(async (response) => {
    if (response.ok) {
        let transaction = await response.json()
        console.log("transaction ", transaction);
        return transaction;
    } else {
        const errorMessage = await response.text();
        alert("ERROR: " + errorMessage);

        return null;
    }
    }).then((promiseReturnVal: Transaction | null) => {
        if (promiseReturnVal === null) {
            // TODO: send dummy transaction value on error?
            returnVal = null;
        } else {
            returnVal = promiseReturnVal;
        }

        console.warn("RETURNING", returnVal);
        return returnVal;
    });
  }

  async getBalanceCheck(accountId: number) 
  : Promise<Balance | null> {
    let endpoint = `${this.utilities.getServerUrl()}/api/checkBalance/${accountId}`;
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

  async submitFundTransferForm(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    console.log("FORM", form);

    let fundTransferForm = new FormData(form);
    const sourceAccountId = parseInt(fundTransferForm.get("sourceAccountId")!.toString());
    const targetAccountNumberRaw = fundTransferForm.get("targetAccountNumber")?.toString() !;
    const amountRaw = fundTransferForm.get("amount")!.toString();

    //  VALIDATION
    // TODO: place this in client code
    if (! (Number.isInteger(parseInt(targetAccountNumberRaw))
           && targetAccountNumberRaw.toString().length == 9)
      ){
        alert("Target Account number must be a 8-digit number";
        return null;
    }

    if (! (amountRaw && parseInt(amountRaw) > 0)) {
        alert("Please enter a positive transfer amount");
        return null;
    }

    // END OF VALIDATION

    let targetAccountId = -1;
    if (targetAccountNumberRaw) {
        targetAccountId = await this.accountService.getAccountIdForAccountNumber(
                parseInt(targetAccountNumberRaw)
            )  as number;
    }

    // NOTE: js-big-decimal functions similar to Java's BigDecimal to hopefully prevent precision errors
    const amountBigDecimal = new bigDecimal(amountRaw)
                                .stripTrailingZero().getValue();

    let fundTransferJson = {
        "transactionType": {
            "typeId": TransactionTypes.FUND_TRANSFER.valueOf(),
            // TODO: don't hardcode string name
            "name": "FUND_TRANSFER"
        },
        "sourceAccountId": sourceAccountId,
        "targetAccountId": targetAccountId,
        "affectedBalance": {
            "depositBalance": amountBigDecimal,
            "totalBalance": amountBigDecimal,
        }
    };

    let endpoint = `${this.utilities.getServerUrl()}/api/fundTransfer`;
    const bearerToken = this.utilities.getAuthToken();
    console.log("POST", endpoint, fundTransferJson, bearerToken);

    return fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": bearerToken,
        },
        body: JSON.stringify(fundTransferJson),
    }).then(response => {
        if (response.ok) {
            response.json().then(data => {
                console.log("FUND TRANSFER", data);
                return true;
            });

            return true;
        } else {
            response.text().then(data => {
                alert("ERROR: " + data);
            })
            
            return false;
        }
    }).catch(() => false);
  }
}
