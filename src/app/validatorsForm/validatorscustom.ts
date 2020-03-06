import { ValidatorFn, AbstractControl } from '@angular/forms';

export class ValidatorsCustom {

  static betweenYear(yearA: number, yearB: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const year: number = control.value;
      if (year >= yearA && year <= yearB) {
        return null;
      } else {
        return { betweenYear: { yearA: yearA, yearB: yearB } };
      }
    };
  }
}