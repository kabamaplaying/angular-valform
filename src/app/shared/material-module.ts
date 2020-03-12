import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports:      [ BrowserModule, FormsModule,MatDialogModule ],
  declarations: [ ],
  exports: [MatDialogModule]
})
export class MaterialModule{}