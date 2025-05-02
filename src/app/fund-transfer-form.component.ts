import { Component, inject } from "@angular/core";

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroIdentification, heroBanknotes, heroPaperAirplane} from '@ng-icons/heroicons/outline'

import "@fontsource/lusitana";
import { Authentication } from './authentication.service';
import { TransactionService } from "./transaction.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'login-form',
  imports: [NgIcon],
  providers: [provideIcons({ heroIdentification, heroBanknotes, heroPaperAirplane})],
  template: `
    <main class="flex min-h-screen flex-col p-6">
      <h1 class="mb-4 text-xl md:text-2xl">
        Fund Transfer
      </h1>
      <form class="space-y-3" (submit)="this.newFundTransfer($event)">
        <div class="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 class="mb-3 text-2xl">
            Enter the details for a new fund transfer
          </h1>
          <input type="hidden" id="sourceAccountId" name="sourceAccountId" [value]="this.sourceAccountId" required readonly/>
          <div class="w-full">
            <div>
              <label
                class="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="targetAccountNumber"
              >
                Target Account No
              </label>
              <div class="relative">
                <input
                  class="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="targetAccountNumber"
                  type="number"
                  name="targetAccountNumber"
                  placeholder="Enter the account number for the target account"
                />
                <ng-icon name="heroIdentification" class="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div class="mt-4">
              <label
                class="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="amount"
              >
                Amount
              </label>
              <!-- NOTE: step= denotes max precision to be 4 decimal digits-->
              <div class="relative">
                <input
                  class="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="amount"
                  type="number"
                  name="amount"
                  placeholder="Enter amount to transfer"
                />
                <ng-icon name="heroBanknotes" class="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <button type="submit" class="mt-4 w-full flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
            Tranfer <ng-icon name="heroPaperAirplane" class="ml-auto h-5 w-5 text-gray-50" />
          </button>
        </div>
      </form>
    </main>
  `
})
export default class FundTransferFormComponent {
  transactionsService = inject(TransactionService);
  sourceAccountId!: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    this.sourceAccountId = parseInt(this.route.snapshot.paramMap.get('sourceAccountId') !);
  }

  async newFundTransfer(event: SubmitEvent) {
    this.transactionsService.submitFundTransferForm(event).then((success) => {
      if (!success) {
        return;
      }

      alert("Fund Transfer successful");
      this.router.navigate(["account", this.sourceAccountId]);
    });
  }
}
