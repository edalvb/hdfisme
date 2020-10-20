import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IncidenteService } from "../../../services/incidente.service";
import { TecnicoService } from "../../../services/tecnico.service";
import { PerfilService } from "../../../services/perfil.service";
import { BienService } from ".././../../services/bien.service";
import { IncidenteEstado, IncidenteGravedad, IncidenteTipo, IncidenteSolucion, Incidente } from "../../../models/Incidente";
import { GrupoTecnicoSimple } from "../../../models/Tecnico";

@Component({
  selector: 'app-incidente-form',
  templateUrl: './incidente-form.component.html',
  styleUrls: ['./incidente-form.component.css']
})
export class IncidenteFormComponent implements OnInit {

  estadoForm = new FormControl('', [Validators.required]);
  gravedadForm = new FormControl('', [Validators.required]);
  tipoForm = new FormControl('', [Validators.required]);
  incidenteForm = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  vFNaci = new FormControl();

  matcher = new MyErrorStateMatcher();

  constructor(
    private iService: IncidenteService,
    private perfilS: PerfilService,
    private tecService: TecnicoService,
    private bService: BienService,
    private snackBar: MatSnackBar,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }

  estadoIncidentes: IncidenteEstado[];
  gravedadIncidentes: IncidenteGravedad[];
  tipoIncidentes: IncidenteTipo[];
  solucionIncidentes: IncidenteSolucion[];

  personaGrupe: GrupoTecnicoSimple[];

  tecnicos: any[];

  grupo_bien: any[];

  usuario = {
    idusuario: null,
    usuario: null
  }

  incidente: Incidente = {
    idincidente: null,
    idsolicitante: null,
    idestado: null,
    idgravedad: null,
    idtipo: null,
    idtecnico: null,
    idgrupo_bien: null,
    incidente: null,
    idsolucion: null,
    descripcion: null,
    fecha_creacion: new Date(),
    fecha_actualizacion: new Date(),
    fecha_cierre: null,
  }

  edit = false;

  ngOnInit(): void {
    const param = this.activatedRoute.snapshot.params;
    if (param.id) {
      // Leer el incidente
    }
    this.leerPerfil();
    this.leerEstados();
    this.leerGravedades();
    this.leerTipos();
    this.leerTecnicos();
    this.leerTodosGrupos();
    this.leerSoluciones();
  }

  leerTodosGrupos() {
    this.bService.leerTodosGrupos().subscribe(
      (res: any) => {
        this.grupo_bien = res;
        console.log(this.grupo_bien);
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    );
  }

  leerTecnicos() {
    this.tecService.leerAdminProve().subscribe(
      (res: any) => {
        this.personaGrupe = [
          {
            nombre: 'Administrativo',
            tecnico: res.administrativo
          },
          {
            nombre: 'Proveedor',
            tecnico: res.proveedor
          }
        ];
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    )
  }

  leerPerfil() {
    this.perfilS.leerUsuarioFiltrado().subscribe(
      (res: any) => {
        this.usuario = res;
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    )
  }

  leerEstados() {
    this.iService.leerTodosEstado().subscribe(
      (res: any) => {
        this.estadoIncidentes = res;
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    )
  }

  leerTipos() {
    this.iService.leerTodosTipo().subscribe(
      (res: any) => {
        this.tipoIncidentes = res;
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    )
  }

  leerGravedades() {
    this.iService.leerTodosGravedad().subscribe(
      (res: any) => {
        this.gravedadIncidentes = res;
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    )
  }

  leerSoluciones() {
    this.iService.leerTodosSolucion().subscribe(
      (res: any) => {
        this.solucionIncidentes = res;
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    )
  }

  actualizar() {
    /*this.iService.actualizar(this.incidente.idincidente, this.incidente).subscribe(
      (res: any) => {
        this.route.navigate(['conf/incidente']);
        this.snackBar.open(res.mensaje, 'Aceptar', { duration: 3000 })
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    )*/
  }

  guardar() {
    // Estos campos son autogenerados por MySQL
    delete this.incidente.idincidente
    delete this.incidente.fecha_creacion
    delete this.incidente.fecha_actualizacion

    this.incidente.idsolicitante = this.usuario.idusuario;
    console.log(this.incidente);

    this.iService.guardar(this.incidente).subscribe(
      (res: any) => {
        this.route.navigate(['conf/incidente']);
        this.snackBar.open(res.mensaje, 'Aceptar', { duration: 3000 })
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    )
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

