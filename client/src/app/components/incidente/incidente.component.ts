import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IncidenteService } from "../../services/incidente.service";
import { IncidenteMostrar } from "../../models/Incidente";

@Component({
  selector: 'app-incidente',
  templateUrl: './incidente.component.html',
  styleUrls: ['./incidente.component.css']
})
export class IncidenteComponent {

  incidente: IncidenteMostrar[] = [];

  columnas: string[] = [
    'idincidente',
    'fecha_creacion',
    'solicitante',
    'incidente',
    'descripcion',
    'estado_incidente',
    'gravedad_incidente',
    'tipo_incidente',
    'grupo_bien',
    'tecnico'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource = new MatTableDataSource<IncidenteMostrar>(this.incidente);

  constructor(
    private iService: IncidenteService,
    private snackBar: MatSnackBar) {
    this.iService.leerTodos().subscribe(
      (res: any) => {
        this.dataSource = new MatTableDataSource<IncidenteMostrar>(res);
        this.dataSource.paginator = this.paginator;
      }, e => {
        this.snackBar.open(
          e.error.mensaje == null ? 'Algo salió Mal' : e.error.mensaje,
          "Error", { duration: 3000, });
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
