import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  productsObjects = [
    { product_uin: '1', product_name: 'Product 1' },
    { product_uin: '2', product_name: 'Product 2' },
    // Add more products as needed
  ];
  sortedProductDetails = [
    { product_detail: 'Detail 1', count: 10 },
    { product_detail: 'Detail 2', count: 5 },
    // Add more details as needed
  ];
  selectedProductUin = '';
  selectedProductDetail = new Set<string>();
  buttonsDisabled = false;

  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/';
  }
}
