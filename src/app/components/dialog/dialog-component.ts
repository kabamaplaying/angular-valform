import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  OnInit
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig  } from '@angular/material/dialog';

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
    this.dialogRef.close(false);
  }
  public confirmarAccion() {
    //this.store.dispatch(this.data.delete);
    this.dialogRef.close(true);
  }

 
  public close() {
    this.dialogRef.close();
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close();
  }
}