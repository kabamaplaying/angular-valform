import { Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog-component';

@Injectable({ providedIn: "root" })
export class DialogService {

  constructor(public dialog: MatDialog) { }


  abrirDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        animal: 'panda'
      }
    });
  }
}