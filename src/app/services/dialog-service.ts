import { Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog-component';
import { DialogData } from '../models/dialog-data';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: "root" })
export class DialogService {
  private respuestaUsuario: BehaviorSubject<any> = new BehaviorSubject(null);
  respuestaUsuario$ = this.respuestaUsuario.asObservable();

  constructor(public dialog: MatDialog) { }


  abrirDialog(data: DialogData<any>) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(DialogComponent, { data });

    dialogRef.afterClosed().subscribe(dialogResult => {
      const resultado =  dialogResult as DialogData<any>;
      this.respuestaUsuario.next(resultado);
    });

  }
  limpiarRespuestaUsuario() {
    this.respuestaUsuario.next(null);
  }
}