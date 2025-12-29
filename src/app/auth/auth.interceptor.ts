import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const router = inject(Router);
    const rawData = localStorage.getItem('userToken');
    
    let token = null;
    
    // Getting token details form the localstorage
    if(rawData){
        try{
            const parseData = JSON.parse(rawData);
            token = parseData.token;
        }catch(error){ 
            console.log("Problem with the token : "+error); 
        }
    }
    
    // Token handling
    if(token){
        const cloneRequest = req.clone({
            setHeaders:{ Authorization:`Bearer ${token}` }
        });
        return next(cloneRequest);
    }
    return next(req);

};