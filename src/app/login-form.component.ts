import { Component, inject } from "@angular/core";

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroKey, heroAtSymbol, heroArrowRight } from '@ng-icons/heroicons/outline'

import "@fontsource/lusitana";
import { Authentication } from './authentication.service';

@Component({
  selector: 'login-form',
  imports: [NgIcon],
  providers: [provideIcons({ heroKey, heroAtSymbol, heroArrowRight })],
  template: `
    <main class="flex min-h-screen flex-col p-6">
      <h1 class="mb-4 text-xl md:text-2xl">
        Login
      </h1>
      <form class="space-y-3" (submit)="this.authentication.login($event)">
        <div class="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 class="mb-3 text-2xl">
            Please log in to continue.
          </h1>
          <div class="w-full">
            <div>
              <label
                class="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div class="relative">
                <input
                  class="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
                <ng-icon name="heroAtSymbol" class="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div class="mt-4">
              <label
                class="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div class="relative">
                <input
                  class="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={4}
                />
                <ng-icon name="heroKey" class="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <button type="submit" class="mt-4 w-full flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
            Log in <ng-icon name="heroArrowRight" class="ml-auto h-5 w-5 text-gray-50" />
          </button>
        </div>
      </form>
    </main>
  `
})
export default class LoginFormComponent {
  authentication;
  constructor() {
    this.authentication = inject(Authentication);
  }
}
