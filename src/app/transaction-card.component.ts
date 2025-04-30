import { Component, input, computed } from '@angular/core';
import { Transaction, TransactionTypes } from './types/transaction';
import { Balance } from './types/account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-card',
  imports: [],
  template: `
      <div class="rounded-xl bg-gray-50 p-2 shadow-sm min-w-max {{ this.isClickable() ? 'cursor-pointer' : '' }}"
          (click)="goToTransactionDetails()"
      >
      <div class="flex p-4">
        <!-- {Icon ? <Icon class="h-5 w-5 text-gray-700" /> : null} -->
        <h3 class="ml-2 text-sm font-mono font-extrabold">{{ transactionTitle() }}</h3>
        <!-- <h5 class="block ml-2 text-sm font-small ml-6">Id: {{ this.transaction.transactionId }}</h5> -->
      </div>
      <div class="rounded-xl bg-white px-4 py-8 text-left text-sxs shrink-0 min-w-max">
          @for(item of displayDetailItems(); track 'transaction-' + this.transaction().transactionId + '-' + item[0]) {
                <p class="font-semibold inline">{{item[0]}}: </p>
                <p class="font-normal inline px-3 min-w-max">{{item[1]}}</p>
                <br/>
          }
      </div>
      <!-- {children} -->
    </div>
  `
})
export class TransactionCardComponent {
  transaction = input.required<Transaction>();
  isClickable = input(true);

  constructor(private router: Router) {}

  shouldShowBalance = false;
  transactionTitle = computed(() => {
      let title = this.transaction().closureTimeStamp.toString();
      switch(this.transaction().transactionType.typeId) {
        case TransactionTypes.BALANCE_CHECK.valueOf():
          title = `Balance Check - ${title}`;
          break;
        case TransactionTypes.FUND_TRANSFER.valueOf():
          title = `Fund Transfer - ${title}`;
          this.shouldShowBalance = true;
          break;
        default:
          title = `UNKNOWN Transaction - ${title}`;
          break;
      }

      return title;
  });

  displayDetails = computed(() => { 
    let details: any = {
      "Transaction Id": this.transaction().transactionId,
      // TODO: get account number instead of id
      "Source Account No.": this.transaction().sourceAccountId,
      "Target Account No.": this.transaction().targetAccountId,
    };
    
    if (this.shouldShowBalance && (this.transaction()?.affectedBalance?.totalBalance ?? null != null)) {
      // TODO: show - or + depending on send/receive
      details["Amount"] = this.transaction().affectedBalance.totalBalance;
    }

    return details;
  });
  displayDetailItems = computed(() => Object.entries(this.displayDetails()));

  goToTransactionDetails() {
    if (!this.isClickable()) {
      return;
    }

    // TODO: implement transaction details page
    // this.router.navigate(['/transaction', this.transaction().transactionId])
  }
}
