import { Routes } from '@angular/router';
import LoginFormComponent from './login-form.component';
import { AccountCardComponent } from './account-card/account-card.component';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Login',
        component: LoginFormComponent,
    },
    {
        path: 'accounts',
        title: 'Accounts',
        component: AccountCardComponent,
    }
];
