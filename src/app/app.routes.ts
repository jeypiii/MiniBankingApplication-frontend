import { Routes } from '@angular/router';
import LoginFormComponent from './login-form.component';
import { AccountListComponent } from './account-list/account-list.component';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Login',
        component: LoginFormComponent,
    },
    {
        path: 'accounts',
        title: 'Accounts',
        component: AccountListComponent,
    }
];
