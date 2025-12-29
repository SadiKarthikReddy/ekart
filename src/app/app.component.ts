import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
    title = 'e-kart-task';
    
    private authServices = inject(AuthService);

    ngOnInit(): void {
        const rawToken = localStorage.getItem("userToken");
        
        if(rawToken){
            try{
                const token = JSON.parse(rawToken).token;
                if(token)
                    this.authServices.autoLogout(token);
            }catch(e){
                this.authServices.logout();
            }
        }
    }
}
