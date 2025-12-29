import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { CustomerHomeComponent } from './Customer/customer-home/customer-home.component';
import { AdminProfileComponent } from './Admin/admin-profile/admin-profile.component';
import { CustomerProfileComponent } from './Customer/customer-profile/customer-profile.component';
import { roleGuard } from './auth/auth.guard';
import { CustomerComponent } from './Customer/customer.component';
import { AdminComponent } from './Admin/admin.component';
import { ForgotPasswordComponent } from './login-register/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login-register/reset-password/reset-password.component';
import { OtpForgotPasswordComponent } from './login-register/otp-forgot-password/otp-forgot-password.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'LoginRegister',
        pathMatch: 'full'
    },
    {
        path: 'LoginRegister',
        component: LoginRegisterComponent
    },
    { 
        path: "forgot-password", 
        component: ForgotPasswordComponent 
    },
    {
        path: "otp-forgot-password",
        component: OtpForgotPasswordComponent
    },
    { 
        path: "reset-password",
        component: ResetPasswordComponent
    },
    {
        path:'Admin',
        component:AdminComponent,
        canActivate: [roleGuard],
        data: { expectedRole: 'Admin' },
        children:[
            { path: 'Home', component: AdminHomeComponent },
            { path: 'Profile', component: AdminProfileComponent },
            { path: '', redirectTo: 'Home', pathMatch: 'full' }
        ]
    },
    {   
        path: 'Customer',
        component: CustomerComponent,
        canActivate: [roleGuard],
        data: { expectedRole: 'Customer' },
        children:[
            { path: 'Home', component: CustomerHomeComponent },
            { path: 'Profile', component: CustomerProfileComponent },
            { path: '', redirectTo: 'Home', pathMatch: 'full' }
        ]
    }
];
