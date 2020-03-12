import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  OnInit
} from '@angular/core';
import { DialogData } from '../../models/dialog-data';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

// import { Action, Store } from "@ngrx/store";
// import { State } from "../../app.reducers";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'dialog-component',
  templateUrl: './dialog-component.html',
  styleUrls: ['./dialog-component.css']
})

export class DialogComponent implements OnInit {
  ngOnInit() { }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { data },
    public dialogRef: MatDialogRef<DialogComponent>

  ) { }

  public cancelarAccion() {
    // if (this.data.cancel !== undefined) {
    //   // this.store.dispatch(this.data.cancel);
    // }
    const confirmacion = { ...this.data, confirmacion: false };
    this.dialogRef.close(confirmacion);
  }
  public confirmarAccion() {
    //this.store.dispatch(this.data.delete);
    const confirmacion = { ...this.data, confirmacion: true };
    this.dialogRef.close(confirmacion);
  }


  public close() {
    this.dialogRef.close();
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close();
  }
}