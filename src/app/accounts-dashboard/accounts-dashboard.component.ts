import { Component, inject, input, computed, OnChanges, signal, Signal, SimpleChanges, OnInit } from '@angular/core';
import { AccountListComponent } from "../account-list/account-list.component";
import { Account } from '../types/account';
import { AccountService, AccountsPage } from '../account.service';

@Component({
  selector: 'app-accounts-dashboard',
  imports: [AccountListComponent],
  template: `
    <h1 class="mb-4 text-xl md:text-2xl">
      <div>
      {{ headerMessage }}
      <!-- <Search setSearchString={(searchString: string) => {
              let newfilteredEmployees = employees;
              let filterChanged: boolean = false;

              if (!searchString) {
                  filterChanged = true;
              }
              searchString = searchString.trim().toLowerCase();

              if (searchString.length == 0) {
                  filterChanged = true;
              }

              if (!filterChanged) {
                  const tokens = searchString.split(" ");
                  newfilteredEmployees = employees.filter((employee) => {
                      const employeeDetails = JSON.stringify(Object.values(employee)).toLocaleLowerCase();
                      for (let token of tokens) {
                          if (employeeDetails.includes(token)) {
                              return true;
                              break;
                          }
                      }

                      return false;
                  });

                  filterChanged = true;
              }

              if (filterChanged) {
                  setFilteredEmployees(newfilteredEmployees);
              }

              console.log("AFTER FILTER", filteredEmployees, newfilteredEmployees);
            }
          }
          placeholder="Search employee by name, salary, etc."
      /> -->
      </div>
    </h1>
    <div>
        <app-account-list [accountsInput]="accounts"/>
    </div>
  `
})
export class AccountsDashboardComponent implements OnInit{
  accountsService = inject(AccountService);
  accounts: Account[] = [];
  headerMessage = "";

  async ngOnInit() {
    const curUserId = this.accountsService.getCurUserId();
    const accountsPage: AccountsPage = await this.accountsService.getAccountsOfUser(curUserId);
    this.accounts = accountsPage.accounts;

    // HACK: for now, hardcode admin to userId 1
    if (curUserId == 1) {
      this.headerMessage = "All accounts (admin view)";
    } else if (this.accounts.length > 0) {
      this.headerMessage = `Accounts for user ${this.accounts[0].ownerName}`;
    }
  };
}
