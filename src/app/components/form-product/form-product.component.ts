import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Product } from '../../models/Producto';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ValidationErrors } from '@angular/forms';
import { GenericFormValidator } from '../../validatorsForm/GenericValidator';
import { AllValidationErrors, AllValidationErrorsMin } from '../../validatorsForm/allvalidationerrors';
import { tap, map, filter } from 'rxjs/operators';
import { ValidatorsCustom } from '../../validatorsForm/validatorscustom';


@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {
  @Input() productCreate: Product;
  @Input() productEvent = new EventEmitter();
  productForm: FormGroup;
  private errors: AllValidationErrors[];
  submited: boolean = false;

  constructor(private fb: FormBuilder, private validatorFormError: GenericFormValidator, ) { }

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
      year: [null, [Validators.required, ValidatorsCustom.betweenYear(1900, new Date().getFullYear())]],
      price: [0, [Validators.required, Validators.min(1)]],
      termCondition: [false, [Validators.requiredTrue]]
    });
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
      console.log(tipoErrorActual, 'ssss')
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
      errorName: "required",
      errorValue: "El campo año es obligatorio"
    },
    {
      controlName: 'year',
      errorName: "betweenYear",
      errorValue: "Ingresa un año mínimo 1990"
    },
    {
      controlName: 'price',
      errorName: "min",
      errorValue: "Ingresa un número de mínimo un digito"
    },
    {
      controlName: 'termCondition',
      errorName: "required",
      errorValue: "Debes agregar los terminos y condiciones"
    }


  ];

}