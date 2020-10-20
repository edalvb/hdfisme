import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BienService } from "../../../services/bien.service";
import { AdministrativosService } from "../../../services/administrativo.service";
import { ResponsableService } from "../../../services/responsable.service"

@Component({
  selector: 'app-responsable-form',
  templateUrl: './responsable-form.component.html',
  styleUrls: ['./responsable-form.component.css']
})
export class ResponsableFormComponent implements OnInit {

  responsable: any = {
    idresponsable: null,
    idbien: null,
    idpersona: null, // ID del Administrativo
    stock: null,
    comentario: null,
    fecha_creacion: null
  }

  edit = false;

  bien: any = [];
  administrativo : any = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private route: Router,
    private bienService: BienService,
    private administrativoService: AdministrativosService,
    private responsableService: ResponsableService) { }

  ngOnInit(): void {
    const param = this.activateRoute.snapshot.params;
    if(param.id) {
      this.responsableService.get(param.id).subscribe(
        res => {
          this.responsable = res;
          this.edit = true;},
        err => console.log(err)
      );
    }

    this.bienService.gets().subscribe(
      res => this.bien = res,
      err => console.log(err));

    this.administrativoService.getAdministrativos().subscribe(
      res => this.administrativo = res,
      err => console.log(err));
  }

  save() {
    delete this.responsable.idresponsable;

    this.responsableService.save(this.responsable).subscribe (
      res => this.route.navigate(['/conf/responsable']),
      err => console.log(err))}

  update() {
    this.responsableService.update(this.responsable).subscribe(
      res => this.route.navigate(['/conf/responsable']),
      err => console.log(err))}

}
