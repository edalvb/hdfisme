import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ResponsableFilterService } from "../../../services/responsablefilter.service";
import { AsignaService } from "../../../services/asigna.service";
import { BienService } from "../../../services/bien.service";

@Component({
  selector: 'app-asigna-form',
  templateUrl: './asigna-form.component.html',
  styleUrls: ['./asigna-form.component.css']
})
export class AsignaFormComponent implements OnInit {

  asigna: any = {
    idresponsable_anterior: null,
    idresponsable_nuevo: null,
    cantidad: null,
    comentario: null
  }

  edit = false;
  idbien: number;
  stocka: number;

  responsablefilter: any = [];
  bien: any = [];

  constructor(
    private route: Router,
    private rfService: ResponsableFilterService,
    private aService: AsignaService,
    private bSrvice: BienService) { }

  ngOnInit(): void {
    this.bSrvice.gets().subscribe(
      res => this.bien = res,
      err => console.log(err)
    )
  }

  resetAsigna(){
    this.asigna.idresponsable_anterior = null;
    this.asigna.idresponsable_nuevo = null;
    this.asigna.cantidad = null;
    this.asigna.comentario = null;
  }

  getResponsable() {
    this.rfService.get(this.idbien).subscribe (
      res => this.responsablefilter = res,
      err => console.log(err)
    )
  }

  save() {
    this.aService.save(this.asigna).subscribe(
      () => this.route.navigate(['/conf/responsable/asigna']),
      err => console.log(err)
    )
  }

}
