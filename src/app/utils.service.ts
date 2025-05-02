import { Injectable } from '@angular/core';
import { Balance, AccountDetails, Account, AccountType } from './types/account';

@Injectable({
  providedIn: 'root'
})
export class Utilities {
    getCurUserId() {
      const userId: string = sessionStorage.getItem("userId") ?? '';
      console.log("USER ID", userId);
      if (!userId) {
          alert("No user id found. Please login again");
      }

      return parseInt(userId);
    }

    getAuthToken(redirectToLogin: boolean = true): string {
      const authToken: string = sessionStorage.getItem("authToken") ?? '';
      if (!authToken) {
          alert("No user authentication token found. Please login again");

          if (redirectToLogin) {
            window.location.replace("/login");
          }
      }

      return authToken;
  }

  clearAuthToken(redirectToLogin: boolean = true) : void {
      sessionStorage.removeItem("authToken")
  }

  getServerUrl() {
    return 'http://localhost:8080';
  }

  formatNetBalance(balance: Balance) {
    console.log("FORMAT BALANCE", balance, typeof balance.totalBalance)
    // TODO: find out why typeof balance.totalBalance  === number, NOT bigDecimal
    //       since we want to use bigDecimal.getPrettyValue() instead of number.toLocaleString()
    return `${balance.currencyCode} ${balance.totalBalance.toLocaleString()}`;
  }

  formatAccountType(accountType: AccountType) {
      return accountType.name[0].toUpperCase() + accountType.name.substring(1).toLowerCase();
  }

  formatAccountDetails(accountDetails: AccountDetails) {
    return `${accountDetails.accountNumber} (${accountDetails.ownerName} - ${this.formatAccountType(accountDetails.accountType)})`
  }
}
