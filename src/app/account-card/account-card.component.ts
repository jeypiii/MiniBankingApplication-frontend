import { Component, input, computed, inject } from '@angular/core';
import { Account, Balance } from '../types/account';
import { Router } from '@angular/router';
import { Utilities } from '../utils.service';

@Component({
  selector: 'app-account-card',
  imports: [],
  template: `
      <div class="rounded-xl bg-gray-50 p-2 shadow-sm min-w-max {{ this.isClickable() ? 'cursor-pointer' : '' }}"
          (click)="goToAccountDetails()"
      >
      <div class="flex p-4">
        <!-- {Icon ? <Icon class="h-5 w-5 text-gray-700" /> : null} -->
        <h3 class="ml-2 text-sm font-mono font-extrabold">Account No. {{ accountNumber() }}</h3>
        <!-- <h5 class="block ml-2 text-sm font-small ml-6">Id: {{ this.account.accountId }}</h5> -->
      </div>
  
      <div class="rounded-xl bg-white px-4 py-8 text-left text-sxs shrink-0 min-w-max">
          @for(item of displayDetailItems(); track 'account-' + this.account().accountId + '-' + item[0]) {
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
  account = input.required<Account>();
  isClickable = input(true);

  utilities = inject(Utilities);

  constructor(private router: Router) {}

  accountNumber = computed(() => {
    const accountNumberString = this.account().accountNumber.toString();
    return (
      accountNumberString.substring(0, 4)
      + '-' + 
      accountNumberString.substring(4, 7)
      + '-' + 
      accountNumberString.substring(7, 9)
    );
  });

  displayDetails = computed(() => { 
    let details: any = {
      "Account Id": this.account().accountId,
      "Owner": this.account().ownerName,
      "Type": this.account().accountType.name[0].toUpperCase() + this.account().accountType.name.substring(1).toLowerCase(),
    };
    
    if (this.account()?.balance?.totalBalance ?? null != null) {
      details["Net Balance"] = this.utilities.formatNetBalance(this.account().balance);
    }

    return details;
  });
  displayDetailItems = computed(() => Object.entries(this.displayDetails()));

  goToAccountDetails() {
    if (!this.isClickable()) {
      return;
    }

    this.router.navigate(['/account', this.account().accountId])
  }
}
