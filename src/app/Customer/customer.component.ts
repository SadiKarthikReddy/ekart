import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-customer',
    imports: [RouterLink, RouterLinkActive, RouterOutlet],
    templateUrl: './customer.component.html',
    styleUrl: './customer.component.css'
})
export class CustomerComponent {
    private authService = inject(AuthService);

    logout(){
        this.authService.logout();
    }
}
