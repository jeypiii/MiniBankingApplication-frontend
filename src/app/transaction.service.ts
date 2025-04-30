import { inject, Injectable } from '@angular/core';
import { Utilities } from './utils.service';
import { Transaction } from './types/transaction';
import { Balance } from './types/account';

export type TransactionsPage = {
    transactions: Transaction[],
    totalPages: number
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  utilities: Utilities;
  constructor() {
    this.utilities = inject(Utilities);
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
}
