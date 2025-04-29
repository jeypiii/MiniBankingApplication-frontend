import { Routes } from '@angular/router';
import LoginFormComponent from './login-form.component';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Login',
        component: LoginFormComponent,
    }
];
