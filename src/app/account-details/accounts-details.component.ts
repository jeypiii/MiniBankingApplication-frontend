import { Component, inject, OnInit } from '@angular/core';
import { Account } from '../types/account';
import { AccountService, AccountsPage } from '../account.service';
import { AccountCardComponent } from '../account-card/account-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService, TransactionsPage } from '../transaction.service';
import { Transaction } from '../types/transaction';
import { TransactionCardComponent } from "../transaction-card.component";

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBanknotes, heroPaperAirplane} from '@ng-icons/heroicons/outline'
import { Utilities } from '../utils.service';

@Component({
  selector: 'app-account-details',
  imports: [AccountCardComponent, TransactionCardComponent, NgIcon],
  providers: [provideIcons({ heroBanknotes, heroPaperAirplane})],
  template: `
    <h1 class="mb-4 text-xl md:text-2xl">
      <div>
      Details for Account No. {{ this.account.accountNumber }}
      </div>
    </h1>
    <div>
        <app-account-card [account]="account" [isClickable]=false/>

        <div class="flex flex-row">
          <button type="submit" class="m-5 mt-4 w-full flex-1 h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            (click)="this.showBalance()"
          >
            <ng-icon name="heroBanknotes" class="ml-auto h-5 w-5 text-gray-50" />
            Check Balance 
          </button>
          <button type="submit" class="m-5 mt-4 w-full flex-1 h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            (click)="this.newFundTransfer()"
          >
            <ng-icon name="heroPaperAirplane" class="ml-auto h-5 w-5 text-gray-50" />
            New Fund Transfer 
          </button>
        </div>
        <div class="m-5 p-5">
          <h2 class="ml-2 text-xl font-extrabold">Transaction History</h2>
          @if (this.transactions.length > 0) {
            @for (transaction of this.transactions; 
                track "account-" + this.account.accountId + '-transaction-' + transaction.transactionId
            ) {
              <app-transaction-card [transaction]="transaction" [relativeToAccountWithId]="this.account.accountId" />
            }
          } @else {
            <h3 class="ml-2 text-l">There are no transactions for this account</h3>
          }
        </div>
    </div>
  `
})
export class AccountDetailsComponent implements OnInit{
  // accountId = input.required<number>();
  accountsService = inject(AccountService);
  utitilities = inject(Utilities);
  transactionsService = inject(TransactionService);

  account!: Account;
  transactions!: Transaction[];

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    const accountId = parseInt(this.route.snapshot.paramMap.get('id') as string);
    const accountGet: Account | null = await this.accountsService.getAccount(accountId, true);
    if (!accountGet) {
      const errMsg = `Fetch for account with id ${accountId} failed`;
      console.error(errMsg);
      alert(errMsg);
    } else {
      this.account = accountGet;
    }

    const transactionsGet: TransactionsPage | null = await this.transactionsService.getTransactionsForAccount(accountId);
    if (!transactionsGet) {
      const errMsg = `Fetch for transactions of user with id ${accountId} failed`;
      console.error(errMsg);
      alert(errMsg);
    } else {
      this.transactions = transactionsGet.transactions;
      this.transactions.sort((a, b) => a.closureTimeStamp <= b.closureTimeStamp ? 1 : -1);
    }
  };

  async showBalance() {
    const accountId = this.account.accountId;
    const balance = await this.transactionsService.getBalanceCheck(accountId);
    alert(`The current balance for Account No. ${accountId}: ${this.utitilities.formatNetBalance(this.account.balance)}`);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['account', this.account.accountId]));
  }

  async newFundTransfer() {
    this.router.navigate(['fundTransfer', this.account.accountId]);
  }
}
