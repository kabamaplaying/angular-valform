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
  enviado: boolean = false;
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
      description: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(120)]],
      year: [0, [Validators.required, Validators.min(1990)]],
      price: [0, [Validators.required, Validators.min(1)]]
    });
  }
  get validForm() {
    return this.productForm.invalid;
  }
  agregarProducto() {
    this.enviado = true;
    if (this.productForm.invalid) {
      return;
    }

    this.enviado = false;
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
    console.log(jsonErrors, 'controlErrors')
    if (jsonErrors !== null) {
      const tipoErrorActual = Object.keys(jsonErrors).map(key => key === null ? '' : key).join('');
      return this.mensajeError.map((error, index, self) => {
        if (error.controlName === controlName && error.errorName === tipoErrorActual) {
          return error.errorValue;
        }
      }).join('');
    }
    return '';
  }
  private mensajeError: AllValidationErrors[] = [
    {
      controlName: 'name',
      errorName: "required",
      errorValue: "El campo es obligatorio"
    },
    {
      controlName: 'name',
      errorName: "minlength",
      errorValue: "Ingresa un nombre con mínimo 5 caracteres"
    },
    {
      controlName: 'name',
      errorName: "maxlength",
      errorValue: "Ingresa un nombre con maximo 120 caracteres"
    },
    {
      controlName: 'description',
      errorName: "required",
      errorValue: "el campo es obligatorio"
    },
    {
      controlName: 'description',
      errorName: "minlength",
      errorValue: "Ingresa una descrición con mínimo 5 caracteres"
    },
    {
      controlName: 'description',
      errorName: "maxlength",
      errorValue: "Ingresa una descripción con maximo 120 caracteres"
    },
    {
      controlName: 'year',
      errorName: "min",
      errorValue: "Ingresa un año mínimo 1990"
    },
    {
      controlName: 'price',
      errorName: "min",
      errorValue: "Ingresa un número de mínimo un digito"
    }
  ]
}
