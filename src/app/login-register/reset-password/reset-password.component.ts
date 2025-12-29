import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-reset-password',
    imports: [ReactiveFormsModule],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{
    
    private authService = inject(AuthService);
    private router = inject(Router);

    resetPasswordForm!: FormGroup;
    email:string = '';

    constructor(){
        this.email = localStorage.getItem('resetPasswordEmail') || '';
    }

    ngOnInit(): void {
        this.resetPasswordForm = new FormGroup({
            Email: new FormControl(this.email),
            password: new FormControl('',Validators.required),
            confirmPassword: new FormControl('',Validators.required)
        });
    }

    resetPassword(){
        this.authService.resetPassword(this.resetPasswordForm.value).subscribe((response:any) =>{
            alert(response.message || response.message);
            this.router.navigate(['./']);
        },(error)=>{
            alert(error.message);
        })
    }
}