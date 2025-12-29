import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    
    const expectedRole = route.data['expectedRole'];
    // console.log('Expected Role:', expectedRole);
    
    const userRole = auth.getRoleFromToken();
    // console.log('User Role from Token:', userRole);

    const token = localStorage.getItem('userToken');

    if (token && userRole === expectedRole) {
        return true;
    }

    router.navigate(['/LoginRegister']);
    return false;
};
