import { Routes } from '@angular/router';
import LoginFormComponent from './login-form.component';
import { AccountsDashboardComponent } from './accounts-dashboard/accounts-dashboard.component';
import { AccountDetailsComponent } from './account-details/accounts-details.component';
import FundTransferFormComponent from './fund-transfer-form.component';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Login',
        component: LoginFormComponent,
    },
    {
        path: 'accounts',
        title: 'Accounts',
        component: AccountsDashboardComponent,
    },
    {
        path: 'account/:id',
        title: 'Account Details',
        component: AccountDetailsComponent,
    },
    {
        path: 'fundTransfer/:sourceAccountId',
        title: 'New Fund Transfer',
        component: FundTransferFormComponent,
    },
];
