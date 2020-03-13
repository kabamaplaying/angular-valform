import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
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
export class FormProductComponent implements OnInit, OnChanges {
  @Input() productoFormulario: Product;
  @Output() productEvent = new EventEmitter();
  @Output() productEventEdit = new EventEmitter();
  productForm: FormGroup;
  private errors: AllValidationErrors[];
  submited: boolean = false;
  @Input() editar: boolean = false;
  constructor(private fb: FormBuilder, private validatorFormError: GenericFormValidator) {
  }

  ngOnChanges() {
    this.crearForma();
    if (this.productoFormulario !== null && this.productoFormulario !== undefined) {
     this.productForm.patchValue(this.productoFormulario);
    } else{
       this.limpiarFormulario()
    }
  }

  ngOnInit() {
    this.crearForma();
    this.productForm.valueChanges.subscribe(e => {
      this.errors = this.validatorFormError.calculateErrors(this.productForm);
    });

  }

  agregarProducto() {
    this.submited = true;
    if (this.productForm.invalid) {
      return;
    }
    let productoFormulario = { id: -1, ...this.productForm.value };
    this.productEvent.emit(productoFormulario);
    this.limpiarFormulario();
  }

    editarProducto() {
    this.submited = true;
    if (this.productForm.invalid) {
      return;
    }
    let productoFormulario = { ...this.productForm.value, id: this.productoFormulario.id };
    this.productEventEdit.emit(productoFormulario);
    this.limpiarFormulario();
  }

  enviarAccion() {
    if (this.editar) {
      this.editarProducto();
    } else {
      this.agregarProducto();
    }
  }

  get validForm() {
    return this.productForm.invalid;
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

  limpiarFormulario() {
    this.submited = false;
    this.editar = false;
    this.productForm.patchValue({});
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