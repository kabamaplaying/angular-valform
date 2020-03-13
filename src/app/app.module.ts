import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material-module';
import { FormProductComponent } from './components/form-product/form-product.component';

@NgModule({
  imports:      [BrowserModule, FormsModule, ReactiveFormsModule, MaterialModule ],
  declarations: [ AppComponent, FormProductComponent],
  bootstrap:    [ AppComponent ],
  providers: []
})
export class AppModule { }
