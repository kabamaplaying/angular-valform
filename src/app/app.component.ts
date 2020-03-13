import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ProductServiceService } from './services/product-service.service';
import { Product } from './models/Producto';
import { GenericFormValidator } from './validatorsForm/GenericValidator';
import { AllValidationErrors, AllValidationErrorsMin } from './validatorsForm/allvalidationerrors';
import { tap, map, filter } from 'rxjs/operators';
import { ValidatorsCustom } from './validatorsForm/validatorscustom';
import { DialogService } from './services/dialog-service';
import { DialogData } from './models/dialog-data';
import { Producto } from './models/Producto';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lista: Observable<Product[]>;
  productForm: FormGroup;
  productoFormulario: Producto;
  private errors: AllValidationErrors[];
  submited: boolean = false;
  constructor(
    private service: ProductServiceService,


    private dialogoService: DialogService) {
    this.lista = this.service.listaProductos();
  }

  ngOnInit() {

  }
  agregarProducto(producto: Producto) {
    this.service.agregarProducto(producto);
  }

  eliminarProducto(id: number) {
    this.service.eliminarProducto(id);
  }
  abrirDialogo(data: Product) {
    const dataDialog = { data, mensaje: '¿Estás seguro de eliminar el producto seleccionado?', titulo: 'Eliminar producto' };
    this.dialogoService.abrirDialog(dataDialog);
    this.dialogoService.respuestaUsuario$.subscribe(confirmacionDialogo => {
      if (confirmacionDialogo && confirmacionDialogo.confirmacion) {
        this.eliminarProducto(confirmacionDialogo.data);
        this.dialogoService.limpiarRespuestaUsuario();
      }
    }
    )
  }
}
