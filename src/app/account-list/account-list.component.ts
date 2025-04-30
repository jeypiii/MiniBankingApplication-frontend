import { Component } from '@angular/core';
import { AccountCardComponent } from "../account-card/account-card.component";
import { Account } from '../types/account';

@Component({
  selector: 'app-account-list',
  imports: [AccountCardComponent],
  template: `
      testing
      <div class="flex flex-row gap-6 flex-wrap justify-items-center">
        @for(account of this.accounts; track "account-" + account.accountId) {
          <app-account-card [account]="account" />
        }
      </div>
  `,
})
export class AccountListComponent {
  accounts: Account[] = [
    {
      accountId: 1,
      accountNumber: 100000001,
      userId: 2,
      ownerName: "MAPAGBIGAY, Mandy",
      accountType: {
          typeId: 2,
          name: "SAVINGS"
      }
    },
    {
      accountId: 2,
      accountNumber: 100000002,
      userId: 3,
      ownerName: "TURISIV, Brett R.",
      accountType: {
          typeId: 2,
          name: "SAVINGS"
      }
    },
    {
      accountId: 3,
      accountNumber: 100000003,
      userId: 2,
      ownerName: "MAPAGBIGAY, Mandy",
      accountType: {
          typeId: 1,
          name: "CHECKINGS"
      }
    },
    {
      accountId: 4,
      accountNumber: 100000004,
      userId: 4,
      ownerName: "LOS DOS, Porque N.",
      accountType: {
          typeId: 2,
          name: "SAVINGS"
      }
    }  
  ]
}
