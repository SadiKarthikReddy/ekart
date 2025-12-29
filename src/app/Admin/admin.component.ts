import { Component, inject, Inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-admin',
    imports: [RouterLink, RouterLinkActive, RouterOutlet],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css'
})
export class AdminComponent {
    private authService = inject(AuthService);

    logout(){
        this.authService.logout();
    }
}
