import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';

import { AdministrativosService } from '../../services/administrativo.service';
import { AdminsitrativoFilterService } from '../../services/adminsitrativofilter.service';
import { AreaService } from "../../services/area.service";

@Component({
  selector: 'app-administrativo',
  templateUrl: './administrativo.component.html',
  styleUrls: ['./administrativo.component.css']
})

export class AdministrativoComponent implements OnInit {

  cfDgFArea = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  administrativo: any = {
    idpersona: null,
    fechanacimiento: null,
    email: null,
    direccion: null,
    celular: null,
    telefono: null,
    ruc: null,
    pnombre: null,
    snombre: null,
    papellido: null,
    sapellido: null,
    dni: null,
    idarea: null
  };

  areas: any = [];

  edit = false;
  serializedDate;

  constructor(
    private adService: AdministrativosService,
    private adFilService: AdminsitrativoFilterService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private sArea: AreaService,
    private snackBar: MatSnackBar) {
    this.serializedDate = new FormControl((new Date()).toJSON());
  }

  ngOnInit() {
    const param = this.activatedRoute.snapshot.params;
    if (param.id) {
      this.adFilService.getAdministrativo(param.id).subscribe(
        (res: any) => {
          this.administrativo = res;
          this.edit = true;
        },
        err => this.snackBar.open(err.error.mensaje, "Error", { duration: 3000 })
      );
    }
    this.areaReads();
  }

  saveAdministrativo() {
    this.adService.saveAdministrativo(this.getAdministrativoTemp(1)).subscribe(
      (res: any) => {
        this.route.navigate(['/administrativo']);
        this.snackBar.open(res.mensaje, "Aceptar", { duration: 3000 })
      },
      err => this.snackBar.open(err.error.mensaje, "Error", { duration: 3000 })
    );
  }

  updateAdministrativo() {
    this.adService.updateAdministrativo(this.getAdministrativoTemp(0)).subscribe(
      (res: any) => {
        this.route.navigate(['/administrativo']);
        this.snackBar.open(res.mensaje, "Aceptar", { duration: 3000 })
      },
      err => this.snackBar.open(err.error.mensaje, "Error", { duration: 3000 })
    );
  }

  /**
   * Devuelve un arrar con los valores del Administrativo
   * @param deleteCount Cuantos elementos empezando desde el inicio desea eliminar del array
   */
  getAdministrativoTemp(deleteCount: number) {
    let temp = [
      this.administrativo.idpersona,
      this.administrativo.fechanacimiento,
      this.administrativo.email,
      this.administrativo.direccion,
      this.administrativo.celular,
      this.administrativo.telefono,
      this.administrativo.ruc,
      this.administrativo.pnombre,
      this.administrativo.snombre,
      this.administrativo.papellido,
      this.administrativo.sapellido,
      this.administrativo.dni,
      this.administrativo.idarea
    ];
    temp.splice(0, deleteCount);
    return temp;
  }

  areaReads() {
    this.sArea.gets().subscribe(
      res => {
        this.areas = res;
      },
      err => this.snackBar.open(err.error.mensaje, "Error", { duration: 3000 })
    )
  }
}

/** Error cuando el control no válido está sucio, tocado o enviado. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}