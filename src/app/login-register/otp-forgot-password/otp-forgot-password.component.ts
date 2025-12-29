import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-otp-forgot-password',
    imports: [ReactiveFormsModule],
    templateUrl: './otp-forgot-password.component.html',
    styleUrl: './otp-forgot-password.component.css'
})
export class OtpForgotPasswordComponent implements OnInit {
    
    private authService = inject(AuthService);
    private router = inject(Router);

    otpForgotPasswordForm!: FormGroup;
    email: string = '';

    constructor(){
        this.email = localStorage.getItem('resetPasswordEmail') || '';
    }
    
    ngOnInit(): void {
        this.otpForgotPasswordForm = new FormGroup({
            Email: new FormControl(this.email),
            OTP: new FormControl('',Validators.required)
        });
    }

    otpForgotPassword(){
        this.authService.otpForgotPassword(this.otpForgotPasswordForm.value).subscribe((response:any)=>{
            this.router.navigate(['./reset-password']);
            alert(response.message || response.Message);
        },(error)=>{
            alert(error.message || error.Message);
            console.log(error);
        })
    }

}
