import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    apiUrl = 'https://localhost:7297/api/User';
    
    private tokenTimer: any; // Variable to hold the timer

    // Automatically logout when token is expired 
    autoLogout(token: string) {
        clearTimeout(this.tokenTimer);
        const expiry = (jwtDecode(token) as any).exp * 1000;
        const delay = expiry - Date.now();
        if (delay <= 0) return this.logout();
        this.tokenTimer = setTimeout(() => this.logout(), delay);
    }
    
    // Logout method
    logout() {
        if (this.tokenTimer) 
            clearTimeout(this.tokenTimer);
        localStorage.removeItem('userToken');
        this.router.navigate(['./']);
    }

    // Gets role from token
    getRoleFromToken() {
        const token = localStorage.getItem('userToken');
        if (token) {
            const decodedToken: any = jwtDecode(token);
            return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decodedToken.role;
        }
        return null;
    }

    // User Registration
    userRegister(data: any){ return this.http.post(this.apiUrl+'/Register',data) }
    
    // User Login
    userLogin(data: any){ return this.http.post(this.apiUrl+'/Login',data) }

    // Get user profile (or) details 
    getProfile(){ return this.http.get(this.apiUrl+"/Profile") }
    
    // Updates user details
    updateProfile(data:any){ return this.http.put(this.apiUrl+"/updateProfile",data) }

    // Updates user password
    updatePassword(data:any){ return this.http.patch(this.apiUrl+"/updatePassword",data) }

    // Delete user
    deleteUser(){ return this.http.delete(this.apiUrl+"/deleteUser") }

    // Reset password
    sendOTP(data:any){ return this.http.put(this.apiUrl+"/resetPasswordOTP",data) }

    // OTP reset password
    otpForgotPassword(data:any){ return this.http.put(this.apiUrl+'/otpForgotPassword', data) }

    // Update forgot password
    resetPassword(data:any){ return this.http.put(this.apiUrl+"/resetPassword", data) }

}