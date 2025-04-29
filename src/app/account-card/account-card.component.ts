import { Component } from '@angular/core';
import { Account } from '../types/account';

@Component({
  selector: 'account-card',
  imports: [],
  template: `
      <div class="rounded-xl bg-gray-50 p-2 shadow-sm min-w-max">
      <div class="flex p-4">
        <!-- {Icon ? <Icon class="h-5 w-5 text-gray-700" /> : null} -->
        <h3 class="ml-2 text-sm font-mono font-extrabold">{{this.account.accountNumber}}</h3>
        <!-- <h5 class="block ml-2 text-sm font-small ml-6">Id: {{ this.account.accountId }}</h5> -->
      </div>
  
      <div class="rounded-xl bg-white px-4 py-8 text-left text-sxs shrink-0 min-w-max">
          @for(item of this.displayDetailItems; track 'account-' + this.account.accountId + '-' + item[0]) {
                <p class="font-semibold inline">{{item[0]}}: </p>
                <p class="font-normal inline px-3 min-w-max">{{item[1]}}</p>
                <br/>
          }
      </div>
      <!-- {children} -->
    </div>
  `
})
export class AccountCardComponent {
  account: Account = {
      accountId: 1,
      accountNumber: 123456789,
      userId: 1,
      ownerName: "Test",
      accountType: {
        typeId: 1,
        name: "SAVINGS"
      }
    };

  displayDetails = {
    "Account Id": this.account.accountId,
    "Owner": this.account.ownerName,
    "Type": this.account.accountType.name[0].toUpperCase() + this.account.accountType.name.substring(1).toLowerCase(),
  }
  displayDetailItems = Object.entries(this.displayDetails);
}
