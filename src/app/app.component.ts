import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductServiceService } from './product-service.service';
import { Observable } from 'rxjs';
import { Product } from './Producto';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lista: Observable<Product[]>;
  productForm: FormGroup;
  private errors: AllValidationErrors[];
  constructor(private service: ProductServiceService, private fb: FormBuilder) {
    this.lista = this.service.listaProductos();
  }

  ngOnInit() {
   this.crearForma();

   this.productForm.valueChanges.subscribe(control => console.log(control));
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
  getNameError() {
     const error = 
           this.name.hasError('required') ? 'Este campo es requerido' : 
           this.name.hasError('minLength') ? 'El nombre de tener minimo 5 caracteres': 
           this.name.hasError('maxLength') ? 'El nombre debe tener maximo 120 caracteres' : '';
    console.log(error)
    return this.name.hasError('required') ? 'Este campo es requerido' : 
           this.name.hasError('minLength') ? 'El nombre de tener minimo 5 caracteres': this.name.hasError('maxLength') ? 'El nombre debe tener maximo 120 caracteres' : '';
  }

    calculateErrors(form: FormGroup | FormArray) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.errors = this.errors.concat(this.calculateErrors(control));
        return;
      }

      const controlErrors: ValidationErrors = control.errors;
      if (controlErrors !== null) {
        Object.keys(controlErrors).forEach(keyError => {
          this.errors.push({
            controlName: field,
            errorName: keyError,
            errorValue: controlErrors[keyError]
          });
        });
      }
    });

    // This removes duplicates
    this.errors = this.errors.filter((error, index, self) => self.findIndex(t => {
      return t.controlName === error.controlName && t.errorName === error.errorName;
    }) === index);
    return this.errors;
  }

}
