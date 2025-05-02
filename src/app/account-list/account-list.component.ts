import { Component, input, computed, effect } from '@angular/core';
import { AccountCardComponent } from "../account-card/account-card.component";
import { Account } from '../types/account';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArchiveBoxXMark } from '@ng-icons/heroicons/outline'

@Component({
  selector: 'app-account-list',
  imports: [AccountCardComponent, NgIcon],
  providers: [provideIcons({heroArchiveBoxXMark})],
  template: `
      <div class="flex flex-row gap-6 flex-wrap justify-items-center">
        @for(account of this.activeAccounts(); track "account-" + account.accountId) {
          <app-account-card [account]="account" />
        }
      </div>
    
      @if (this.closedAccounts().length > 0) {
        <h1 class="m-5 pt-5 text-xl">
          <ng-icon name="heroArchiveBoxXMark" class="ml-auto h-5 w-5 text-gray-50" />
          Closed Accounts 
        </h1>
        <div class="flex flex-row gap-6 flex-wrap justify-items-center">
          @for(account of this.closedAccounts(); track "account-" + account.accountId) {
            <app-account-card [account]="account" />
          }
        </div>
      }
  `,
})
export class AccountListComponent {
  accountsInput = input.required<Account[]>();

  accounts = computed(() => this.accountsInput());
  // TODO: iterate over accounts only once to separate accounts into active/closed
  activeAccounts = computed(() => this.accounts().filter(account => !account.closed!));
  closedAccounts = computed(() => this.accounts().filter(account => account.closed!));

  constructor() {
    effect(() => {
      console.log("AccountList GOT", this.accounts());
      console.log("AccountList CLOSED", this.closedAccounts());
    })
  }
}
