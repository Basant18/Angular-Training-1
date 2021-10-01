import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { Product } from '../products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  //item: Product = this.items[this.items.length-1];

  map = this.cartService.countMethod();

  deleteFromCart(product: Product){
    this.map = this.cartService.deleteFromCart(product);
    window.alert("This product"+ this.map +"is being removed from cart");
  }
  

  constructor(private cartService: CartService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {}


}
