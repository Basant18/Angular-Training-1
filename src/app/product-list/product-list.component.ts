import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { products } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit(): void {
  }
  products = products;

  share(product: any) {
    window.alert('The '+ product.name +' has been shared!');
  }

  onNotify(product: any) {
    window.alert('You will be notified when the ' +product.name+ ' goes on sale');
  }

}
