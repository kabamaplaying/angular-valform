import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog-component';

@NgModule({
  imports: [BrowserModule, FormsModule, MatDialogModule, CommonModule,],
  declarations: [DialogComponent],
  exports: [MatDialogModule],
  entryComponents: [DialogComponent]
})
export class MaterialModule { }