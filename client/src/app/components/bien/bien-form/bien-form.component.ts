import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BienService } from '../../../services/bien.service';
import { EstadoBienService } from '../../../services/estadobien.service';
import { MarcaBienService } from '../../../services/marcabien.service';
import { ModeloBienService } from '../../../services/modelobien.service';
import { TipoBienService } from '../../../services/tipobien.service';
import { PecosaService } from 'src/app/services/pecosa.service';
import { UnidadMedidaBienService } from 'src/app/services/unidadmedidabien.service';
import { ColorBienService } from "../../../services/colorbien.service";
import { AdministrativosService } from "../../../services/administrativo.service";

import { BienResponsable } from "../../../models/Bien";
import { AdministrativoPersona } from "../../../models/Administrativo";

@Component({
  selector: 'app-bien-form',
  templateUrl: './bien-form.component.html',
  styleUrls: ['./bien-form.component.css']
})
export class BienFormComponent implements OnInit {

  denominacionForm = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  administrativoForm = new FormControl('', [Validators.required]);
  stockForm = new FormControl('', [Validators.required, Validators.maxLength(16)]);

  matcher = new MyErrorStateMatcher();

  serializedDate = new FormControl((new Date()).toISOString());

  bien: BienResponsable = {
    idbien: null,
    denominacion: null,
    idpecosa: null,
    valor_adquisicion: null,
    idmarca: null,
    idmodelo: null,
    idtipo: null,
    idcolor: null,
    serie_dimension: null,
    idestado: null,
    idunidad_medida: null,
    comentario: null,
    fecha_adquisicion: null,
    fecha_creacion: null,
    administrativo: null,
    stock: null
  };

  edit = false;

  estado: any = [];
  tipo: any = [];
  marca: any = [];
  modelo: any = [];
  pecosa: any = [];
  unidadMedida: any = [];
  color: any = [];
  administrativo: AdministrativoPersona[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private bienService: BienService,
    private estadosService: EstadoBienService,
    private marcaService: MarcaBienService,
    private moService: ModeloBienService,
    private tipService: TipoBienService,
    private pecosaService: PecosaService,
    private uniMedidaService: UnidadMedidaBienService,
    private coloService: ColorBienService,
    private adminService: AdministrativosService) { }

  ngOnInit() {
    const param = this.activatedRoute.snapshot.params;
    if (param.id) {
      this.bienService.get(param.id).subscribe(
        (res: BienResponsable) => {
          this.bien = res;
          this.edit = true;
        },
        e => this.mostrarMensaje(e.error.mensaje, "Error")
      );
    }

    this.marcaService.gets().subscribe(
      res => { this.marca = res; },
      e => this.mostrarMensaje(e.error.mensaje, "Error")
    );

    this.estadosService.gets().subscribe(
      res => { this.estado = res; },
      e => this.mostrarMensaje(e.error.mensaje, "Error")
    );

    this.moService.gets().subscribe(
      res => { this.modelo = res; },
      e => this.mostrarMensaje(e.error.mensaje, "Error")
    );

    this.tipService.gets().subscribe(
      res => { this.tipo = res; },
      e => this.mostrarMensaje(e.error.mensaje, "Error")
    );

    this.pecosaService.gets().subscribe(
      res => { this.pecosa = res; },
      e => this.mostrarMensaje(e.error.mensaje, "Error")
    );

    this.uniMedidaService.gets().subscribe(
      res => { this.unidadMedida = res; },
      e => this.mostrarMensaje(e.error.mensaje, "Error")
    );

    this.coloService.gets().subscribe(
      res => { this.color = res; },
      e => this.mostrarMensaje(e.error.mensaje, "Error")
    );

    this.adminService.getAdministrativos().subscribe(
      (res: AdministrativoPersona[]) => {
        this.administrativo = res;
        console.log(this.administrativo)
        this.adminService.obtenerMiIdAdministrativo().subscribe(
          (rs: any) => {
            console.log(rs)
            if (rs.idpersona != null) {
              console.log(this.bien.administrativo)
              this.bien.administrativo = rs.idpersona
            }
          }, e => this.mostrarMensaje(e.error.mensaje, "Error")
        )
      },
      e => this.mostrarMensaje(e.error.mensaje, "Error")
    )
  }

  saveBien() {
    delete this.bien.idbien;
    delete this.bien.fecha_creacion;

    console.log(this.bien);

    this.bienService.save(this.bien)
      .subscribe(
        res => {
          console.log(res);
          this.route.navigate(['/bien']);
        },
        e => this.mostrarMensaje(e.error.mensaje, "Error")
      );
  }

  updateBien() {
    delete this.bien.fecha_creacion;
    delete this.bien.administrativo;
    delete this.bien.stock;
    this.bienService.update(this.bien.idbien, this.bien).subscribe(
      res => {
        console.log(res);
        this.route.navigate(['/bien']);
      },
      e => this.mostrarMensaje(e.error.mensaje, "Error")
    );
  }

  mostrarMensaje(mensaje: string, accion: string) {
    this.snackBar.open(mensaje == null ? 'No pude mostrar el mensaje original.' : mensaje, accion, { duration: 3000 })
  }

}

/** Error cuando el control no válido está sucio, tocado o enviado. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
