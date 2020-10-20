import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { AsignaService } from 'src/app/services/asigna.service';

@Component({
  selector: 'app-asigna',
  templateUrl: './asigna.component.html',
  styleUrls: ['./asigna.component.css']
})
export class AsignaComponent implements OnInit {

  asigna: any = [];
  columnas: string[] = [
    'fecha_creacion',
    'responsable_anterior',
    'responsable_nuevo',
    'bien',
    'cantidad',
    'comentario'
  ];
  dataSource: MatTableDataSource <any>;

  constructor(private aService: AsignaService) { }

  ngOnInit(): void {this.gets()}

  gets() {
    this.aService.gets().subscribe(
      res => {
        this.asigna = res;
        this.dataSource = new MatTableDataSource(this.asigna)},
      err => console.log(err)
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
