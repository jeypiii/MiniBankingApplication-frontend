import { Component, inject, OnInit } from '@angular/core';
import { Account } from '../types/account';
import { AccountService, AccountsPage } from '../account.service';
import { AccountCardComponent } from '../account-card/account-card.component';
import { ActivatedRoute } from '@angular/router';
import { TransactionService, TransactionsPage } from '../transaction.service';
import { Transaction } from '../types/transaction';
import { TransactionCardComponent } from "../transaction-card.component";

@Component({
  selector: 'app-account-details',
  imports: [AccountCardComponent, TransactionCardComponent],
  template: `
    <h1 class="mb-4 text-xl md:text-2xl">
      <div>
      Details for Account No. {{ this.account.accountNumber }}
      </div>
    </h1>
    <div>
        <app-account-card [account]="account" [isClickable]=true/>
 
        <div class="m-5 p-5">
          <h2 class="ml-2 text-xl font-extrabold">Transaction History</h2>
          @if (this.transactions.length > 0) {
            @for (transaction of this.transactions; 
                track "account-" + this.account.accountId + '-transaction-' + transaction.transactionId
            ) {
              <app-transaction-card [transaction]="transaction" />
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
  transactionsService = inject(TransactionService);

  account!: Account;
  transactions!: Transaction[];

  constructor(private route: ActivatedRoute) {}

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
    }
  };
}
