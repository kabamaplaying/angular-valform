import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Product } from '../';
@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {
  @Input() productCreate: Product;
  @Input() productEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}