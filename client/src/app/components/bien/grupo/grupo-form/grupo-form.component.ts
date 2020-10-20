import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BienService } from "../../../../services/bien.service";
import { Bien } from "../../../../models/Bien";

@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.css']
})
export class GrupoBienFormComponent {

  nGrupo = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  mGrupo = new FormControl('', [Validators.required, Validators.maxLength(1000)]);

  bien: Bien[] = [];

  columnas: string[] = [
    'select',
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
    'fecha_adquisicion'
  ];

  nombreGrupo: string = null;
  motivoGrupo: string = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource<Bien>(this.bien);
  selection = new SelectionModel<Bien>(true, []);

  constructor(
    private route: Router,
    private bienService: BienService,
    private snackBar: MatSnackBar, ) {
    this.bienService.gets().subscribe(
      (res: Bien[]) => {
        this.dataSource = new MatTableDataSource<Bien>(res);
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource.paginator)
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.sort)
        console.log(this.sort)
        this.bien = res;
      }, e => {
        this.snackBar.open(
          e.error.mensaje == null ? 'Algo salió Mal' : e.error.mensaje,
          "Error", { duration: 3000, });
      }
    );

  }

  agrupar() {
    let v = new Array();
    this.selection.selected.forEach((b: any) => {
      v.push(b.idbien);
    });
    console.log({
      grupo: this.nombreGrupo,
      motivo: this.motivoGrupo,
      bienes: v
    });
    
    this.bienService.agrupar({
      grupo: this.nombreGrupo,
      motivo: this.motivoGrupo,
      bienes: v
    }).subscribe (
      (res: any) => {
        this.snackBar.open(
          res.mensaje == null ? 'Algo salió Mal' : res.mensaje,
          "Aceptar", { duration: 3000, });
      }, e => {
        this.snackBar.open(
          e.error.mensaje == null ? 'Algo salió Mal' : e.error.mensaje,
          "Error", { duration: 3000, });
      }
    );

    this.route.navigate(['/conf/bien/grupo']);
  }

  /** Si el número de elementos seleccionados coincide con el número total de filas. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selecciona todas las filas si no están todas seleccionadas; de lo contrario, limplia la selección. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** La etiqueta de la casilla de verificación en la fila pasada */
  checkboxLabel(row?: Bien): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.denominacion + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}