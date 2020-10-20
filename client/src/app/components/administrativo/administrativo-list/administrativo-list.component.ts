import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AdminsitrativoFilterService } from '../../../services/adminsitrativofilter.service';
import { PersonaService } from '../../../services/persona.service';


@Component({
  selector: 'app-administrativo-list',
  templateUrl: './administrativo-list.component.html',
  styleUrls: ['./administrativo-list.component.css'],
})

export class AdministrativoListComponent implements OnInit {

  admiper: any = {
    idpersona: null,
    nombres: null,
    dni: null,
    ruc: null,
    email: null,
    area: null,
    fechanacimiento: new Date(),
    celular: null,
    telefono: null,
    direccion: null,
  };

  columnas: string[] = [
    'nombres',
    'dni',
    'ruc',
    'email',
    'area',
    'fechanacimiento',
    'celular',
    'telefono',
    'direccion',
    'acciones'
  ];

  dataSource: MatTableDataSource<any>;

  constructor(
    private adminService: AdminsitrativoFilterService,
    private persoService: PersonaService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAdmins();
  }

  getAdmins() {
    this.adminService.getAdministrativos().subscribe(
      res => {
        this.admiper = res;
        this.dataSource = new MatTableDataSource(this.admiper);
      },
      err => this.snackBar.open(err.error.mensaje, "Error", {duration: 3000})
    );
  }

  deletePersona(id: number) {
    this.persoService.deletepersona(id).subscribe(
      (res: any) => {
        this.getAdmins();
        this.snackBar.open(res.mensaje, "Aceptar", {duration: 3000})
      },
      err => this.snackBar.open(err.error.mensaje, "Error", {duration: 3000})
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
