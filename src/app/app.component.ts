import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ProductServiceService } from './product-service.service';
import { Product } from './Producto';
import { GenericFormValidator } from './validatorsForm/GenericValidator';
import { AllValidationErrors, AllValidationErrorsMin } from './validatorsForm/allvalidationerrors';
import { tap, map, filter } from 'rxjs/operators';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lista: Observable<Product[]>;
  productForm: FormGroup;
  private errors: AllValidationErrors[];

  constructor(
    private service: ProductServiceService,
    private fb: FormBuilder,
    private validatorFormError: GenericFormValidator) {
    this.lista = this.service.listaProductos();
  }

  ngOnInit() {
    this.crearForma();
    this.productForm.valueChanges.subscribe(e => {
      this.errors = this.validatorFormError.calculateErrors(this.productForm);
    });
  }

  private crearForma() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      description: ['', [Validators.required, Validators.minLength(6)]],
      year: [0, [Validators.required, Validators.min(1990)]],
      price: [0, [Validators.required, Validators.min(1)]]
    });
  }

  agregarProducto() {
    console.log(this.name.dirty, this.name.errors);
    console.log('aca vamos...', this.productForm.valid)
  }

  get name() {
    return this.productForm.get('name');
  }

  get description() {
    return this.productForm.get('description');
  }

  get year() {
    return this.productForm.get('year');
  }

  get price() {
    return this.productForm.get('price');
  }

  getErrorControl(controlName) {
    const jsonErrors: any = this.productForm.get(controlName).errors;
    if (jsonErrors !== null && this.errors != undefined) {
      const tipoErrorActual = Object.keys(jsonErrors).map(key => key === null ? '' : key).join('');
      return this.mensajeError.map((error, index, self) => {
        if (error.errorName === tipoErrorActual) {
          return error.errorValue;
        }
      }).join('');
    }
    return '';
  }
  private mensajeError: AllValidationErrorsMin[] = [
    {
      errorName: "required",
      errorValue: "el campo es obligatorio"
    },
    {
      errorName: "minlength",
      errorValue: "Minimo 5"
    },
    {
      errorName: "maxlength",
      errorValue: "Maximo 5"
    }
  ]
}
