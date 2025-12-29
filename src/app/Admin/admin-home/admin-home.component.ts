import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-admin-home',
    imports: [ReactiveFormsModule],
    templateUrl: './admin-home.component.html',
    styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {

    private authService = inject(AuthService);
    private router = inject(Router);

    selectedFile: File | null = null;

    ngOnInit(): void {
        
    }

    addProductDetails = new FormGroup({
        ProductName: new FormControl(''),
        ProductPrice: new FormControl(''),
        ProductDiscription: new FormControl(''),
        // ProductImage:   new FormControl('')
    });

    onFileSelected(event:any){
        this.selectedFile = event.target.files[0];
    }

    addproduct(){
        
        const formData = new FormData();

        formData.append('ProductName', this.addProductDetails.get('ProductName')?.value || '');
        formData.append('ProductPrice', this.addProductDetails.get('ProductPrice')?.value || '0');
        formData.append('ProductDescription', this.addProductDetails.get('ProductDiscription')?.value || '');
    
    }

}
