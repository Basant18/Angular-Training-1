import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Product } from '../products';

@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.scss']
})
export class ProductAlertsComponent implements OnInit {

  @Input() product: Product | undefined;
  @Output() notifyEvent = new EventEmitter();
  @Output() shareEvent = new EventEmitter();
  
  productMethod(){
    this.notifyEvent.emit(this.product);
  }

  shareMethod(){
    this.shareEvent.emit(this.product);
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
