import { Routes } from '@angular/router';
import LoginFormComponent from './login-form.component';
import { AccountsDashboardComponent } from './accounts-dashboard/accounts-dashboard.component';

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
    }
];
