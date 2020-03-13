import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Product } from '../models/Producto';

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
    let mayor = 1;
    const pId = this.productList.value.forEach((e: Product, index: number) => {
      if (e.id > mayor) {
        mayor = e.id
      }
    });
    producto.id = mayor + 1;
    this.productList.next([...this.productList.value, producto]);
  }

  eliminarProducto(idProducto: number) {
    this.productList.value
      .forEach((product: Product, index: number) => {
        if (product.id === idProducto) {
          this.productList.value.splice(index, 1);
        }
      });
    this.productList.next([...this.productList.value])
  }

  actualizarProducto(proctuctUpdate: Product) {
    this.productList.value.map((value, i) => {
      if (value.id === proctuctUpdate.id) {
        this.productList.value[i] = proctuctUpdate;
        return;
      }
    });

    this.productList.next([...this.productList.value]);
  }
}