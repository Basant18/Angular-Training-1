import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, products } from '../products';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  //product: Product = {} as Product;
  product: Product|any; 

  constructor(private route: ActivatedRoute,private cartService: CartService) { }

  addToCart(product:Product){
    this.cartService.addToCart(product);
    this.product.qty--;
    //window.alert('Your product has been added to the cart!');
  }

  mp = this.cartService.countMethod();
  productInCart(){
    this.mp = this.cartService.countMethod();
  }

  ngOnInit() {
  const routeParams = this.route.snapshot.paramMap;
  const productIdFromRoute = Number(routeParams.get('productId'));

  this.product =  products.find(product => product.id === productIdFromRoute);
  /*console.log(x);
  if(x!= undefined)
  {
    this.product = x;
  }*/
  //this.product = ;
  }

}
