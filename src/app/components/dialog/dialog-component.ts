import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  OnInit
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';

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
  @Inject(MAT_DIALOG_DATA) public data: {data},
    public dialogRef: MatDialogRef<DialogComponent>

  ) { }

  public cancel() {
    // if (this.data.cancel !== undefined) {
    //   // this.store.dispatch(this.data.cancel);
    // }
    this.close();
  }

  public close() {
    this.dialogRef.close();
  }

  public delete() {
    //this.store.dispatch(this.data.delete);
    this.close();
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close();
  }
}