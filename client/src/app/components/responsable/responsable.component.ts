import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { ResponsableService } from "../../services/responsable.service";

@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.css']
})
export class ResponsableComponent implements OnInit {

  responsable: any = [];
  columnas: string[] = [
    'responsable',
    'bien',
    'stock',
    'comentario',
    'acciones'
  ];
  dataSource: MatTableDataSource<any>;

  constructor(private responsableService: ResponsableService) { }

  ngOnInit(): void {
    this.gets();
  }

  gets() {
    this.responsableService.gets().subscribe(
      (res: any) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.responsable = res;
      },
      err => console.log(err))
  }

  delete(id: number) {
    this.responsableService.delete(id).subscribe(
      () => this.gets(),
      err => console.log(err))
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
