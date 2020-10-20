import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';

import { ProveedorFilterService } from '../../../services/proveedorfilter.service';
import { PersonaService } from '../../../services/persona.service';


@Component({
  selector: 'app-proveedor-list',
  templateUrl: './proveedor-list.component.html',
  styleUrls: ['./proveedor-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ProveedorListComponent implements OnInit {

  proper: any = {
    codigo: '',
    razon_social: '',
    rubro: '',
    ruc: '',
    email: '',
    fechanacimiento: new Date(),
    celular: '',
    telefono: '',
    direccion: '',
  };

  columnas: string[] = [
    'razon_social',
    'rubro',
    'ruc',
    'email',
    'fechanacimiento',
    'celular',
    'telefono',
    'direccion',
    'acciones'
  ];

  dataSource: MatTableDataSource<any>;

  constructor(
    private provService: ProveedorFilterService,
    private persoService: PersonaService) { }

  ngOnInit() {
    this.getProv();
  }

  getProv() {
    this.provService.getProveedores().subscribe(
      res => {
        this.proper = res;
        this.dataSource = new MatTableDataSource(this.proper);
        console.log(res);
      },
      err => console.log(err)
    );
  }

  deletePersona(id: number) {
    this.persoService.deletepersona(id).subscribe(
      res => {
        console.log(res);
        this.getProv();
      },
      err => console.log(err)
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
