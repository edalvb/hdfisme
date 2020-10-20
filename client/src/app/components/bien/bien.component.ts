import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BienService } from '../../services/bien.service';

@Component({
  selector: 'app-bien',
  templateUrl: './bien.component.html',
  styleUrls: ['./bien.component.css']
})
export class BienComponent implements OnInit {

  bien: any = [];

  columnas: string[] = [
    'denominacion',
    'pecosa',
    'valor_adquisicion',
    'marca',
    'modelo',
    'tipo',
    'color',
    'serie_dimension',
    'estado',
    'unidad_medida',
    'comentario',
    'fecha_adquisicion',
    'acciones'];
  dataSource: MatTableDataSource<any>;

  constructor(
    private bienService: BienService,
    private snackBar: MatSnackBar) { }

  ngOnInit() { this.getsBien() }

  getsBien() {
    this.bienService.gets().subscribe(
      (res: any) => {
        this.dataSource = new MatTableDataSource(res)
        this.bien = res;
      },
      e => this.mostrarMensaje(e.error.mensaje, "Error")
    );
  }

  deleteBien(id: number) {
    this.bienService.delete(id).subscribe(
      (res: any) => {
        this.getsBien();
        this.mostrarMensaje(res.mensaje, "Aceptar")
      },
      e => this.mostrarMensaje(e.error.mensaje, "Error")
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  mostrarMensaje(mensaje: string, accion: string) {
    this.snackBar.open(mensaje == null ? 'No pude mostrar el mensaje original.' : mensaje, accion, { duration: 3000 })
  }
}
