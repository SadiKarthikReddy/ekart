import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-customer-profile',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './customer-profile.component.html',
    styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent {
    
    private authServices = inject(AuthService);
    private router = inject(Router);

    ProfileForm = new FormGroup({
        FullName: new FormControl(''),
        FirstName: new FormControl(''),
        LastName: new FormControl(''),
        Gender: new FormControl(''),
        Email: new FormControl(''),
        MobileNumber: new FormControl('')
    });

    PasswordForm = new FormGroup({
        CurrentPassword: new FormControl(''),
        Password: new FormControl(''),
        ConfirmPassword: new FormControl('')
    });

    ngOnInit(): void {this.getProfile()}

    // Get user datails
    getProfile(){
        this.authServices.getProfile().subscribe((response:any)=>{
            this.ProfileForm.patchValue({
                FullName: response.fullName,
                FirstName: response.firstName,
                LastName: response.lastName,
                Gender: response.gender,
                Email: response.email,
                MobileNumber: response.mobileNumber
            });
        },
        error => {
            console.log(error.error);
        });
    }

    // Update user details
    updateProfile(){
        this.authServices.updateProfile(this.ProfileForm.value).subscribe((response:any)=>{
            this.reload();
        },
        (error)=>{
            console.log(error.error);
        });
    }

    // Update user password
    updatePassword(){
        this.authServices.updatePassword(this.PasswordForm.value).subscribe((response:any)=>{
            alert(response.Message || response.message);
        },
        (error)=>{
            if(error.status == 400){
                alert(error.Message || error.message);
            }
            console.log(error);
        });
    }

    // Delete user
    userDelete(){
        this.authServices.deleteUser().subscribe((response:any)=>{
            alert(response.value);
            localStorage.removeItem("userToken");
            this.router.navigate(["./login-register"]);
        },(error)=>{
            console.log(error.error);
        });
    }

    // Details edit enabling button
    DetailsEditing:boolean = false;
    editDetails(){
        if(this.DetailsEditing)
            this.DetailsEditing=false;
        else
            this.DetailsEditing=true;
    }

    // Reloading the same page
    reload() {
        // const currentUrl = this.router.url;
        // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {this.router.navigate([currentUrl])}); // Navigates to fake url and brings back to the current url
        
        this.getProfile(); // Gets user profile
        this.DetailsEditing=false; 
        
        // window.location.reload(); // Reloads the page
    }

    changeText(){
        
    }
}
