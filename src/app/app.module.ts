import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ProductServiceService } from './product-service.service';
import { MaterialModule } from './shared/material-module';

@NgModule({
  imports:      [BrowserAnimationsModule, BrowserModule, FormsModule, ReactiveFormsModule, MaterialModule ],
  declarations: [ AppComponent],
  bootstrap:    [ AppComponent ],
  providers: [ProductServiceService]
})
export class AppModule { }
