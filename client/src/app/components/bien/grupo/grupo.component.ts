import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BienService } from "../../../services/bien.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoBienComponent implements OnInit {

  grupo_bien: any = [];

  columnas: string[] = [
    'grupo_bien',
    'motivo',
    'acciones'
  ];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private bService: BienService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.leerTodosGrupos();
  }

  leerTodosGrupos() {
    this.bService.leerTodosGrupos().subscribe(
      (res: any) => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.grupo_bien = res;
        console.log(res);
      },
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDetallesGrupoDialog(idgrupo_bien: number, grupo_bien: string): void {
    this.dialog.open(GrupoBienDetallesDialog, {
      width: '600px',
      data: { id: idgrupo_bien, nombre: grupo_bien }
    });
  }

}

@Component({
  selector: 'grupo-bien-detalles-dialog',
  templateUrl: 'grupo-bien-detalles-dialog.html',
})
export class GrupoBienDetallesDialog implements OnInit {

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
    'fecha_adquisicion'];
  dataSource: MatTableDataSource<any>;

  constructor(
    public dialogRef: MatDialogRef<GrupoBienDetallesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bienService: BienService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() { this.getsBien() }

  getsBien() {
    console.log(this.data);
    this.bienService.leerBienesGrupo(this.data.id).subscribe(
      (res: any) => {
        this.dataSource = new MatTableDataSource(res)
        this.bien = res;
      }, err => console.log(err))
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}