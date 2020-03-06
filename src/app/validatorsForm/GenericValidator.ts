//  import { FormGroup, AbstractControl } from '@angular/forms';
//  export class GenericValidator {
// //   constructor(private validationMessages: { [key: string]: { [key: string]: string } }) {
// //   }

// //   processMessages(container: FormGroup): { [key: string]: string } {
// //     const messages = {};
// //     for (const controlKey in container.controls) {
// //       if (container.controls.hasOwnProperty(controlKey)) {
// //         const c = container.controls[controlKey];
// //         if (c instanceof FormGroup) {
// //           const childMessages = this.processMessages(c);
// //           // handling formGroup errors messages
// //           const formGroupErrors = {};
// //           if (this.validationMessages[controlKey]) {
// //             formGroupErrors[controlKey] = '';
// //             if (c.errors) {
// //               Object.keys(c.errors).map((messageKey) => {
// //                 if (this.validationMessages[controlKey][messageKey]) {
// //                   formGroupErrors[controlKey] += this.validationMessages[controlKey][messageKey] + ' ';
// //                 }
// //               })
// //             }
// //           }
// //           Object.assign(messages, childMessages, formGroupErrors);
// //         } else {
// //           // handling control fields errors messages
// //           if (this.validationMessages[controlKey]) {
// //             messages[controlKey] = '';
// //             if ((c.dirty || c.touched) && c.errors) {
// //               Object.keys(c.errors).map((messageKey) => {
// //                 if (this.validationMessages[controlKey][messageKey]) {
// //                   messages[controlKey] += this.validationMessages[controlKey][messageKey] + ' ';
// //                 }
// //               })
// //             }
// //           }
// //         }
// //       }
// //     }
// //     return messages;
// //   }
// // }

// isFormGroup(control: AbstractControl): control is FormGroup {
//   return !!(<FormGroup>control).controls;
// }

// collectErrors(control: AbstractControl): any | null {
//   if (this.isFormGroup(control)) {
//     return Object.Entry(control.controls)
//       .reduce(
//         (acc, [key, childControl]) => {
//           const childErrors = this.collectErrors(childControl);
//           if (childErrors) {
//             acc = {...acc, [key]: childErrors};
//           }
//           return acc;
//         },
//         null
//       );
//   } else {
//     return control.errors;
//   }
// }

// }