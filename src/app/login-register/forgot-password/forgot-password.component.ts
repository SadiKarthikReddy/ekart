import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-forgot-password',
    imports: [ReactiveFormsModule],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{

    private authService = inject(AuthService);
    private router = inject(Router);

    resetPasswordForm!: FormGroup;

    ngOnInit(): void {
        this.resetPasswordForm = new FormGroup({
            Email: new FormControl('',Validators.required)
        });
    }
    
    sendOTP(){
        this.authService.sendOTP(this.resetPasswordForm.value).subscribe((response:any)=>{
            localStorage.setItem("resetPasswordEmail",this.resetPasswordForm.get('Email')?.value);
            this.router.navigate(['./otp-forgot-password']);
            alert(response.message || response.Message);
            // this.router.navigate(['./otp-forgot-password'],{ state: { email : this.resetPasswordForm.get('Email')?.value } })
        },(error)=>{
            if(error.status == 404)
                alert(error.message || error.Message);
            else
                alert(error.message || error.Message);
            console.log(error);
        });
    }

}
