import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-login-register',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './login-register.component.html',
    styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent implements OnInit {

    private authService = inject(AuthService);
    private router = inject(Router);

    loginForm!:FormGroup;
    registerForm!:FormGroup;
    
    constructor(){}

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            Email: new FormControl('',Validators.required),
            Password: new FormControl('',Validators.required)
        });
        
        this.registerForm = new FormGroup({
            FullName: new FormControl('',Validators.required),
            FirstName: new FormControl('',Validators.required),
            LastName: new FormControl(''),
            Gender: new FormControl(''),
            Email: new FormControl('',Validators.required),
            MobileNumber: new FormControl('',Validators.required),
            Password: new FormControl('',Validators.required),
            ConfirmPassword: new FormControl('',Validators.required)
        });
    }

    // login function
    userLogin(){
        // console.log(this.loginForm.value);
        this.authService.userLogin(this.loginForm.value).subscribe((response:any)=>{
            localStorage.setItem('userToken', JSON.stringify(response));
            this.authService.autoLogout(response.token);
            const role = this.authService.getRoleFromToken();
            if (role === 'Customer') {
                alert(response.message || response.Message);
                this.router.navigate(['/Customer/Home']); 
            } else if (role === 'Admin') {
                alert(response.message || response.Message);
                this.router.navigate(['/Admin/Home']);
            }
        },
        (error)=>{
            console.log(error.error);
            if(error.status == 404){
                alert("Invalid credentials!!");
                // alert("Invalid credentials!!");
            }
        });
    }

    // register function
    userRegister(){
        // console.log(this.registerForm.value);
        this.authService.userRegister(this.registerForm.value).subscribe((response:any)=>{
                alert(response.message || response.Message);
            },
            (error)=>{
                alert(error.message || error.Message);
                console.log(error);
            }
        );
    }

}
