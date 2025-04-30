import { Component, input, computed, effect } from '@angular/core';
import { AccountCardComponent } from "../account-card/account-card.component";
import { Account } from '../types/account';

@Component({
  selector: 'app-account-list',
  imports: [AccountCardComponent],
  template: `
      testing
      <div class="flex flex-row gap-6 flex-wrap justify-items-center">
        @for(account of this.accounts(); track "account-" + account.accountId) {
          <app-account-card [account]="account" />
        }
      </div>
  `,
})
export class AccountListComponent {
  accountsInput = input.required<Account[]>();

  accounts = computed(() => this.accountsInput());
  constructor() {
    effect(() => {
      console.log("AccountList GOT", this.accounts());
    })
  }
}
