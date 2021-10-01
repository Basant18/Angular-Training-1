import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './products';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CartService implements CanDeactivate<CanComponentDeactivate>{
  items: Product[] = [];

  addToCart(product: Product)
  {
    this.items.push(product);
  }

  countMethod(){
    let mp = new Map();

    for(let item of this.items)
    {
      if(!mp.has(item))
      {
        mp.set(item,1);
      }
      else if(mp.has(item))
      {
        //let k = this.mp.get(item);
        mp.set(item,mp.get(item)+1);
      }
    }
    return mp;
  }

  deleteFromCart(product: Product){
    let mp = this.countMethod();
    mp.set(product,mp.get(product)-1);
    let elem = this.items.indexOf(product);
    if(elem >= 0)
    {
      this.items.splice(elem,1);
    }
    product.qty+=1;
    return mp;
  }

  getItems(){
    return this.items;
  }

  clearCart(){
    //this.items = [];
    this.items.splice(0,this.items.length);
    return this.items;
  }

  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>('/assets/shipping.json');
  }

  canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //throw new Error('Method not implemented.');
    return component.canDeactivate();
  }

  constructor(private http: HttpClient) { }
  
}
