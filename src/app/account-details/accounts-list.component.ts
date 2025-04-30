import { Component, inject, OnInit } from '@angular/core';
import { Account } from '../types/account';
import { AccountService, AccountsPage } from '../account.service';
import { AccountCardComponent } from '../account-card/account-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-details',
  imports: [AccountCardComponent],
  template: `
    <h1 class="mb-4 text-xl md:text-2xl">
      <div>
      Details for Account No. {{ this.account.accountNumber }}
      </div>
    </h1>
    <div>
        <app-account-card [account]="account" [isClickable]=true/>
    </div>
  `
})
export class AccountDetailsComponent implements OnInit{
  // accountId = input.required<number>();
  accountsService = inject(AccountService);
  account!: Account;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    const accountId = parseInt(this.route.snapshot.paramMap.get('id') as string);
    const accountGet: Account | null = await this.accountsService.getAccount(accountId);
    if (!accountGet) {
      const errMsg = `Fetch for account with id ${accountId} failed`;
      console.error(errMsg);
      alert(errMsg);
    } else {
      this.account = accountGet;
    }
  };
}
