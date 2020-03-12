import { Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog-component';
import { DialogData } from '../models/dialog-data';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: "root" })
export class DialogService {
  private respuestaUsuario: BehaviorSubject<boolean> = new BehaviorSubject(false);
  respuestaUsuario$ = this.respuestaUsuario.asObservable();

  constructor(public dialog: MatDialog) { }


  abrirDialog(data: DialogData<any>) {
    console.log(data)
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "400px",
      data
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
          this.respuestaUsuario.next(dialogResult);
    });
  }
}