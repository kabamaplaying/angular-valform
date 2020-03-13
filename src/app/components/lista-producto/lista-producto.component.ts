import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Producto } from '../../models/Producto';
import { Observable, of } from 'rxjs';
import { DialogService } from '../../services/dialog-service';
import { DialogData } from '../../dialog-data';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {
  @Input() listaProductos: Observable<Producto>;
  @Output() listaProductoEvento = new EventEmitter(null);
  @Output() listaAcrualizarProductoEvento = new EventEmitter(null);
  constructor(private dialogoService: DialogService) { }
  ngOnInit() {
  }

  eliminarProducto(data: number) {
    this.listaProductoEvento.emit(data);
  }
  actualizarProducto(data: Producto) {
    this.listaAcrualizarProductoEvento.emit(data);
  }
  abrirDialogo(data: Producto) {
    const dataDialog = { data, mensaje: '¿Estás seguro de eliminar el producto seleccionado?', titulo: 'Eliminar producto' };
    this.dialogoService.abrirDialog(dataDialog);
    this.dialogoService.respuestaUsuario$.subscribe(confirmacionDialogo => {
      if (confirmacionDialogo && confirmacionDialogo.confirmacion) {
        this.eliminarProducto(confirmacionDialogo.data);
        this.dialogoService.limpiarRespuestaUsuario();
      }
    }
    )
  }

  abrirDialogoActualizar(data: Producto) {
    const dataDialog = { data, mensaje: '¿Estás seguro de actualizar el producto seleccionado?', titulo: 'Actualizar producto' };
    this.dialogoService.abrirDialog(dataDialog);
    this.dialogoService.respuestaUsuario$.subscribe(confirmacionDialogo => {
      if (confirmacionDialogo && confirmacionDialogo.confirmacion) {
        this.actualizarProducto(confirmacionDialogo.data);
        this.dialogoService.limpiarRespuestaUsuario();
      }
    }
    )
  }

}