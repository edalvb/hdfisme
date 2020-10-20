import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { TareaMantenimiento } from "../../models/Mantenimiento";

import { GrupoBienDetallesDialog } from "../bien/grupo/grupo.component";

import { MantenimientoService } from 'src/app/services/mantenimiento.service';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {

  tareas: TareaMantenimiento[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource<TareaMantenimiento>(this.tareas);
  selection = new SelectionModel<TareaMantenimiento>(true, []);

  columnas: string[] = [
    'tipo',
    'prioridad',
    'estado',
    'grupo_bien',
    'tecnico',
    'descripcion',
    'tareas',
    'fecha_mantenimiento',
    'fecha_fin',
    'acciones'
  ];

  constructor(
    private snackBar: MatSnackBar,
    private mService: MantenimientoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.leerTodoMantenimiento();
  }

  leerTodoMantenimiento() {
    this.mService.leerTodos().subscribe(
      (res: any) => {
        this.dataSource = new MatTableDataSource<TareaMantenimiento>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.tareas = res;
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

  mostrarMensaje(mensaje: string, accion: string) {
    this.snackBar.open(mensaje == null ? 'No pude mostrar el mensaje original.' : mensaje, accion, { duration: 3000 })
  }

  openDetallesGrupoDialog(idgrupo_bien: number, grupo_bien: string): void {
    const dialogRef = this.dialog.open(GrupoBienDetallesDialog, {
      width: '600px',
      data: { id: idgrupo_bien, nombre: grupo_bien }
    });
  }

  mostrarTareaDialog(idmante: number): void {
    this.dialog.open(MantenimientoTareaDialog, {
      width: '600px',
      data: { id: idmante}
    });
  }

}

@Component({
  selector: 'mantenimiento-tarea-dialog',
  templateUrl: 'mantenimiento-tarea-dialog.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoTareaDialog {

  models: any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource<any>(this.models);
  selection = new SelectionModel<any>(true, []);

  columnas: string[] = [
    'tarea_mantenimiento',
    'descripcion',
    'horas'
  ];

  constructor(
    public dialogRef: MatDialogRef<MantenimientoTareaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private mService: MantenimientoService) {
    this.mService.leerTareaGrupo(data.id).subscribe(
      (res: any) => {
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.models = res;
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