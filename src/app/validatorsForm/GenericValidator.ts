import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { ValidationErrors } from './validatorsForm/allvalidationerrors';
export class GenericFormValidator {
  private errors: AllValidationErrors[];
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