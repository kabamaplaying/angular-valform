import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Product } from './Producto';
@Injectable({ providedIn: "root" })
export class ProductServiceService {

  productList: BehaviorSubject<Product[]>;
  listaP: Product[] = [];

  constructor() { }


  listaProductos(): Observable<Product[]> {

    this.listaP = [
      {
        id: 1,
        name: "Zapatos",
        description: "Zapatos Nike",
        year: 1990,
        price: 200000
      },
      {
        id: 2,
        name: "Zapatos",
        description: "Zapatos Reebok",
        year: 1998,
        price: 100000
      },
      {
        id: 3,
        name: "Zapatos",
        description: "Zapatos Azumi",
        year: 1970,
        price: 500000
      }
    ];
    this.productList = new BehaviorSubject(this.listaP);
    return this.productList.asObservable().pipe(
      map(e => { return e as Product[]; }
      )
    );
  }
  agregarProducto(producto: Product) {
    this.productList.next([...this.productList.value, producto]);
  }

  eliminarProducto(idProducto: number) {
    console.log(idProducto)
    this.productList.value
      .forEach((product: Product, index: number) => {
        if (product.id === idProducto) {
          this.productList.value.splice(index, 1);

        }
      });

 
    this.productList.next([...this.productList.value])
  }

  actualizarProducto(idProducto: number, proctuctUpdate: Product) {

  }
}