import { OnInit, AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { MantenimientoEstadoComponent } from "../mantenimiento/mantenimiento-estado/mantenimiento-estado.component";
import { MantenimientoTipoComponent } from "../mantenimiento/mantenimiento-tipo/mantenimiento-tipo.component";
import { MantenimientoPrioridadComponent } from "../mantenimiento/mantenimiento-prioridad/mantenimiento-prioridad.component";

// Clase del dialogo a heredar
import { ConfigDialog } from '../../utils/dialog-config';

// Modelos
import { Usuario } from "../../models/Usuario";
import { IncidenteEstado, IncidenteGravedad, IncidenteTipo, IncidenteSolucion } from "../../models/Incidente";

// Servicios para realizar la vinculación con el usuario
import { VincularUsuarioService } from "../../services/vincular-usuario.service";
import { VincularAdministrativoService } from "../../services/vincular-administrativo.service";
import { VincularProveedorService } from "../../services/vincular-proveedor.service";
// Servicios importados
import { AreaService } from '../../services/area.service';
import { TipomovimientoService } from '../../services/tipomovimiento.service';
import { EstadoMovimientoService } from '../../services/estadomovimiento.service';
import { EstadoBienService } from 'src/app/services/estadobien.service';
import { TipoBienService } from 'src/app/services/tipobien.service';
import { MarcaBienService } from '../../services/marcabien.service';
import { ModeloBienService } from 'src/app/services/modelobien.service';
import { PecosaService } from 'src/app/services/pecosa.service';
import { UnidadMedidaBienService } from 'src/app/services/unidadmedidabien.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RolUsuarioService } from 'src/app/services/rol-usuario.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { IncidenteService } from 'src/app/services/incidente.service';
import { ColorBienService } from 'src/app/services/colorbien.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { AuthService } from 'src/app/services/auth.service';
import { MantenimientoTareaComponent } from '../mantenimiento/mantenimiento-tarea/mantenimiento-tarea.component';



@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})

export class ConfiguracionComponent {

  constructor(
    public dialog: MatDialog,
    private perfil: PerfilService,
    private snackBar: MatSnackBar,
    private auth: AuthService) {
    this.perfil.readme().subscribe(
      () => { },
      e => {
        this.auth.cerrarSesion();
        this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
      }
    );
  }

  /**
   * Método que se usa para abrir un Dialog, se le pasa un 
   * Componente y además las logitudes del Dialog
   * @param componentDialog Componente que será rendereado para mostrar en pantalla
   * @param ancho Ancho del Dialog
   * @param alto Alto del Dialog
   */
  private openDialog(componentDialog: any, ancho?: string, alto?: string): void {
    this.dialog.open(componentDialog, {
      width: ancho == null ? '600px' : ancho,
      height: alto == null ? '500px' : alto
    });
  }

  openAreaDialog() {
    this.openDialog(AreaDialogComponent);
  }

  openTipoMovimientoDialog() {
    this.openDialog(TipoMovimientoDialogComponent);
  }

  openEstadoMovimientoDialog() {
    this.openDialog(EstadoMovimientoDialogComponent);
  }

  openEstadobienDialog() {
    this.openDialog(EstadoBienDialogComponent);
  }

  openTipoBienDialog() {
    this.openDialog(TipoBienDialogComponent);
  }

  openMarcaBienDialog() {
    this.openDialog(MarcaBienDialogComponent);
  }

  openModeloBienDialog() {
    this.openDialog(ModeloBienDialogComponent);
  }

  openPecosaDialog() {
    this.openDialog(PecosaDialogComponent);
  }

  openUnidadMedidaBienDialog() {
    this.openDialog(UnidadMedidaBienDialogComponent);
  }

  openColorBienDialog() {
    this.openDialog(ColorDialogComponent);
  }

  openUsuarioDialog() {
    this.openDialog(UsuarioComponent, null, '600px');
  }

  openUsuarioVincularDialog() {
    this.openDialog(UsuarioVincularComponent);
  }

  openTecnicoDialog() {
    this.openDialog(TecnicoVincularDialogComponent);
  }

  openTecnicoListarDialog() {
    this.openDialog(TecnicoListarDialogComponent);
  }

  openIncidenteEstadoDialog() {
    this.openDialog(IncidenteEstadoDialogComponent);
  }

  openIncidenteTipoDialog() {
    this.openDialog(IncidenteTipoDialogComponent);
  }

  openIncidenteGravedadDialog() {
    this.openDialog(IncidenteGravedadDialogComponent);
  }

  openIncidenteSolucionDialog() {
    this.openDialog(IncidenteSolucionDialogComponent);
  }

  openEstadoMantenimientoDialog() {
    this.openDialog(MantenimientoEstadoComponent);
  }

  openTipoMantenimientoDialog() {
    this.openDialog(MantenimientoTipoComponent);
  }

  openPrioridadMantenimientoDialog() {
    this.openDialog(MantenimientoPrioridadComponent);
  }

  openTareaMantenimientoDialog() {
    this.openDialog(MantenimientoTareaComponent);
  }


}

/** Error cuando el control no válido está sucio, tocado o enviado. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * Este componente pertenece al Card Area, en la seccion de movimientos
 * Lo que hace es mostrar un dialogo en donde contiene un tab para listar y añadir un area
 */

@Component({
  selector: 'app-area-dialog',
  templateUrl: './dialogs/config-dialog.html',
  styleUrls: ['./configuracion.component.css']
})
export class AreaDialogComponent extends ConfigDialog {

  constructor(
    public dialogRef: MatDialogRef<AreaDialogComponent>,
    public service: AreaService,
    public _snackBar: MatSnackBar) {
    super(service, _snackBar);
    this.nombre = 'Area';
  }

}


/**
 * Este componente pertenece al Card Tipo de Movimiento, en la seccion de movimientos
 * Lo que hace es mostrar un dialogo en donde contiene un tab para listar y añadir un area
 */

@Component({
  selector: 'app-area-dialog',
  templateUrl: './dialogs/config-dialog.html',
  styleUrls: ['./configuracion.component.css']
})
export class TipoMovimientoDialogComponent extends ConfigDialog {

  constructor(
    public dialogRef: MatDialogRef<TipoMovimientoDialogComponent>,
    public service: TipomovimientoService,
    public _snackBar: MatSnackBar) {
    super(service, _snackBar);
    this.nombre = 'Tipo de Movimiento';
  }
}


/**
 * Este componente pertenece al Card Tipo de Movimiento, en la seccion de movimientos
 * Lo que hace es mostrar un dialogo en donde contiene un tab para listar y añadir un area
 */

@Component({
  selector: 'app-area-dialog',
  templateUrl: './dialogs/config-dialog.html',
  styleUrls: ['./configuracion.component.css']
})
export class EstadoMovimientoDialogComponent extends ConfigDialog {

  constructor(
    public dialogRef: MatDialogRef<EstadoMovimientoDialogComponent>,
    public service: EstadoMovimientoService,
    public _snackBar: MatSnackBar) {
    super(service, _snackBar);
    this.nombre = 'Estado de Movimiento';
  }
}

/** 
 * Este componente pertenece al Card EstadoBien, en la seccion de bien
 * Lo que hace es mostrar un dialogo en donde contiene un tab para listar y añadir un area
 */

@Component({
  selector: 'app-area-dialog',
  templateUrl: './dialogs/config-dialog.html',
  styleUrls: ['./configuracion.component.css']
})
export class EstadoBienDialogComponent extends ConfigDialog {

  constructor(
    public dialogRef: MatDialogRef<EstadoBienDialogComponent>,
    public service: EstadoBienService,
    public _snackBar: MatSnackBar) {
    super(service, _snackBar);
    this.nombre = 'Estado del Bien';
  }
}

/**
 * Este componente pertenece al Card TipoBien, en la seccion de bien
 * Lo que hace es mostrar un dialogo en donde contiene un tab para listar y añadir un area
 */

@Component({
  selector: 'app-area-dialog',
  templateUrl: './dialogs/config-dialog.html',
  styleUrls: ['./configuracion.component.css']
})
export class TipoBienDialogComponent extends ConfigDialog {

  constructor(
    public dialogRef: MatDialogRef<TipoBienDialogComponent>,
    public service: TipoBienService,
    public _snackBar: MatSnackBar) {
    super(service, _snackBar);
    this.nombre = 'Tipo de Bien';
  }
}


/**
 * Este componente pertenece al Card Tipo de Movimiento, en la seccion de movimientos
 * Lo que hace es mostrar un dialogo en donde contiene un tab para listar y añadir un area
 */

@Component({
  selector: 'app-area-dialog',
  templateUrl: './dialogs/config-dialog.html',
  styleUrls: ['./configuracion.component.css']
})
export class MarcaBienDialogComponent extends ConfigDialog {

  constructor(
    public dialogRef: MatDialogRef<MarcaBienDialogComponent>,
    public service: MarcaBienService,
    public _snackBar: MatSnackBar) {
    super(service, _snackBar);
    this.nombre = 'Marca del Bien';
  }
}

/**
 * Este componente pertenece al Card Modelo de Movimiento, en la seccion de movimientos
 * Lo que hace es mostrar un dialogo en donde contiene un tab para listar y añadir un area
 */

@Component({
  selector: 'app-area-dialog',
  templateUrl: './dialogs/config-dialog.html',
  styleUrls: ['./configuracion.component.css']
})
export class ModeloBienDialogComponent extends ConfigDialog {

  constructor(
    public dialogRef: MatDialogRef<ModeloBienDialogComponent>,
    public service: ModeloBienService,
    public _snackBar: MatSnackBar) {
    super(service, _snackBar);
    this.date = new FormControl(new Date());
    this.serializedDate = new FormControl((new Date()).toLocaleDateString());
    this.columnas = [
      'nombre',
      'fecha_fabricacion',
      'comentario',
      'acciones'];
    this.nombre = 'Modelo de Equipo';
  }

  resetForm() {
    this.model.nombre = '';
    this.model.fecha_fabricacion = '';
    this.model.comentario = '';
  }
}

/**
 * Este componente pertenece al Card Pecosa, en la seccion de Equipos
 * Lo que hace es mostrar un dialogo en donde contiene un tab para listar y añadir un area
 */

@Component({
  selector: 'app-area-dialog',
  templateUrl: './dialogs/config-dialog.html',
  styleUrls: ['./configuracion.component.css']
})
export class PecosaDialogComponent extends ConfigDialog {

  constructor(
    public dialogRef: MatDialogRef<PecosaDialogComponent>,
    public service: PecosaService,
    public _snackBar: MatSnackBar) {
    super(service, _snackBar);
    this.columnas = [
      'numero',
      'year',
      'comentario',
      'acciones'];
    this.nombre = 'Pecosa';
  }

  public save(nombre: string) {
    delete this.model.id;
    console.log(this.model);
    this.service.save(this.model)
      .subscribe(
        res => {
          this.gets();
          this.selected = new FormControl(0);
          this.resetForm();
        }
      );
  }

  resetForm() {
    this.model.numero = '';
    this.model.fecha = '';
    this.model.comentario = '';
  }

}

/**
 * Este componente pertenece al Card Unidad de Medida Bien, en la seccion de Equipos
 * Lo que hace es mostrar un dialogo en donde contiene un tab para listar y añadir un area
 */

@Component({
  selector: 'app-area-dialog',
  templateUrl: './dialogs/config-dialog.html',
  styleUrls: ['./configuracion.component.css']
})
export class UnidadMedidaBienDialogComponent extends ConfigDialog {

  constructor(
    public dialogRef: MatDialogRef<UnidadMedidaBienDialogComponent>,
    public service: UnidadMedidaBienService,
    public _snackBar: MatSnackBar) {
    super(service, _snackBar);
    this.nombre = 'Unidad de Medida';
  }
}

/**
 * Color Bien
 */

@Component({
  selector: 'app-area-dialog',
  templateUrl: './dialogs/config-dialog.html',
  styleUrls: ['./configuracion.component.css']
})
export class ColorDialogComponent extends ConfigDialog {

  constructor(
    public dialogRef: MatDialogRef<ColorDialogComponent>,
    public service: ColorBienService,
    public _snackBar: MatSnackBar) {
    super(service, _snackBar);
    this.nombre = 'Color';
  }
}

/**
* Este componente pertenece al Card Pecosa, en la seccion de Equipos
* Lo que hace es mostrar un dialogo en donde contiene un tab para listar y añadir un area
*/

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './dialogs/usuario-dialog.html',
  styleUrls: ['./configuracion.component.css']
})

export class UsuarioComponent implements OnInit {

  cfDgFUsuario = new FormControl('', [Validators.required]);
  cfDgFContrasena = new FormControl('', [Validators.required]);
  cfDgFRol = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  models: any = []; // Este es un array que contienen a todos los registros que traiga de la base de datos.
  model: Usuario = {
    idrol: null,
    usuario: null,
    contrasena: null,
    comentario: null
  }; // Este es solo un registro específico que trae de la base de datos.

  // Roles de usuarios
  roles: any = [];

  columnas: string[] = [
    'rol',
    'usuario',
    'comentario',
    'acciones'];

  dataSource: MatTableDataSource<any>;

  // Crea un FormControl que será el que validará en que Tab se muestre inicialmente
  // En este caso se mostrará en el (0), que por lo general es "Listar"
  selected = new FormControl(0);

  // Esta variable valida el "Tab (Añadir | Editar)" 
  edit = false;

  valido = false;
  usuario = '';

  constructor(
    public dialogRef: MatDialogRef<UsuarioComponent>,
    public sUsuario: UsuarioService,
    public sRol: RolUsuarioService,
    public _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.gets_roles()
    this.gets_users()
  }

  gets_roles() {
    this.sRol.reads().subscribe(
      (res: any) => {
        this.roles = res;
      },
      err => this.openSnackBar(err.error.mensaje, "Error")
    )
  }

  gets_users() {
    this.sUsuario.gets().subscribe(
      (res: any) => {
        this.models = res;
        this.dataSource = new MatTableDataSource(this.models);
      },
      err => this.openSnackBar(err.error.mensaje, "Error")
    )
  }

  save() {
    this.sUsuario.save(this.model).subscribe(
      (res: any) => {
        this.selected = new FormControl(0);
        this.resetForm();
        this.openSnackBar(res.mensaje, "Aceptar")
        this.gets_users();
      }, err => {
        this.openSnackBar(err.error.mensaje, "Error")
      }
    );
  }

  update() {
    if (this.model.contrasena === null) delete this.model.contrasena;
    console.log(this.model);
    this.sUsuario.update(this.usuario, this.model).subscribe(
      (res: any) => {
        this.resetForm();
        this.gets_users();
        this.edit = false;
        this.selected = new FormControl(0);
        console.log(res);
        this.openSnackBar(res.mensaje, 'Aceptar');
      },
      err => this.openSnackBar(err.error.mensaje, 'Error')
    );
  }

  delete(usuario: string) {
    this.sUsuario.delete(usuario).subscribe(
      (res: any) => {
        this.gets_users();
        this.openSnackBar(res.mensaje, 'Aceptar');
      },
      err => this.openSnackBar(err.error.mensaje, 'Aceptar')
    );
  }

  edits(mode: any): void {
    // tslint:disable-next-line: forin
    console.log(this.model)
    for (const clave in mode) {
      if (clave == 'rol') continue;
      this.model[clave] = mode[clave];
    }
    this.model.contrasena = null;

    this.usuario = this.model.usuario;
    console.log(this.model)
    this.edit = true; // se cambia a true porque se va a editar el area.
    this.selected = new FormControl(1); // se pasa al siguiente tab para añadir una nueva area.
  }

  evaluacfDgFContrasena(): boolean {
    if (this.edit) return true;
    return this.cfDgFContrasena.value;
  }

  openSnackBar(message: any, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  /**
   * Cuando se cambia de tab se considera éste método
   * Sirve para evaluar si el tab a cambiado al tab de Lista, si ese es el caso entonces restaura los valores del formulario
   * y la variable edit la convierte en false para cambiar los labels e iconos del tab y el formulario.
   */
  changeTab() {
    if (this.selected.value === 0) {
      this.resetForm();
      this.edit = false;
      this.cfDgFUsuario.reset();
      this.cfDgFContrasena.reset();
      this.cfDgFRol.reset();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  /**
   * Limpia el formulario
   */
  resetForm() {
    this.model.idrol = null;
    this.model.usuario = null;
    this.model.contrasena = null;
    this.model.comentario = null;
    this.usuario = null;
  }

}



/**
* Este componente pertenece al Card Pecosa, en la seccion de Equipos
* Lo que hace es mostrar un dialogo en donde contiene un tab para listar y añadir un area
*/

@Component({
  selector: 'app-usuario-vincular-dialog',
  templateUrl: './dialogs/usuario-vincular-dialog.html',
  styleUrls: ['./configuracion.component.css']
})

export class UsuarioVincularComponent {
  personaControl = new FormControl('', [Validators.required]);
  usuarioControl = new FormControl('', [Validators.required]);

  administrativos: Persona[] = [];
  proveedores: Persona[] = [];
  usuarios = [];
  personaGrupe: personaGrupo[];

  constructor(
    private vUsuario: VincularUsuarioService,
    private vAdministrativo: VincularAdministrativoService,
    private vProveedor: VincularProveedorService,
    private snackBar: MatSnackBar) {
    this.gets_administrativo();
    this.gets_usuario();
  }

  gets_usuario() {
    this.vUsuario.gets().subscribe(
      (res: any) => {
        this.usuarios = res
      }, e => {
        console.log(e)
        this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
      }
    );
  }
  gets_administrativo() {
    this.vAdministrativo.gets().subscribe(
      (res: any) => {
        this.administrativos = res
        this.gets_proveedor();
      }, e => {
        console.log(e)
        this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
      }
    );
  }
  gets_proveedor() {
    this.vProveedor.gets().subscribe(
      (res: any) => {
        console.log(res);
        this.proveedores = res
        this.obtener();
      }, e => {
        console.log(e)
        this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
      }
    );
  }

  obtener() {
    this.personaGrupe = [
      {
        name: 'Administrativo',
        persona: this.administrativos
      },
      {
        name: 'Proveedor',
        persona: this.proveedores
      }
    ];
  }

  // Json que contiene los datos que se enviarán al servidor para vincular
  datos: any = {
    idpersona: -1,
    idusuario: -1
  }

  vincular() {
    console.log(this.datos);
    this.vUsuario.vincular(this.datos).subscribe(
      res => {
        this.gets_administrativo();
        this.gets_usuario();
      }, e => {
        console.log(e)
        this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
      }
    )
  }


  personaGrupos: personaGrupo[] = [
    {
      name: 'Administrativo',
      persona: this.administrativos
    },
    {
      name: 'Proveedor',
      persona: this.proveedores
    }
  ];
}

interface Persona {
  idpersona: number;
  nombre: string;
}

interface personaGrupo {
  name: string;
  persona: Persona[];
}







/**
* Este componente pertenece al Card Pecosa, en la seccion de Equipos
* Lo que hace es mostrar un dialogo en donde contiene un tab para listar y añadir un area
*/

@Component({
  selector: 'app-tecnico-vincular-dialog',
  templateUrl: './dialogs/tecnico-vincular-dialog.html',
  styleUrls: ['./configuracion.component.css']
})

export class TecnicoVincularDialogComponent implements OnInit {
  personaControl = new FormControl('', [Validators.required]);
  funcionControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  administrativos: Persona[] = [];
  proveedores: Persona[] = [];

  personaGrupe: personaGrupo[];

  tecnico: any = {
    idtecnico: null,
    funcion: null,
    comentario: null
  }

  constructor(
    private vTecnico: TecnicoService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.reads_ap_sinvincular();
  }


  reads_ap_sinvincular() {
    this.vTecnico.reads_ap_sinvincular().subscribe(
      (res: any) => {
        console.log(res);
        this.obtener(res.administrativo, res.proveedor);
      },
      err => this.snackBar.open(err.error.mensaje, "Error", { duration: 2000, })
    );
  }


  obtener(administrativo: any, proveedor: any) {
    this.personaGrupe = [
      {
        name: 'Administrativo',
        persona: administrativo
      },
      {
        name: 'Proveedor',
        persona: proveedor
      }
    ];
  }


  vincular() {
    console.log(this.tecnico);
    this.vTecnico.vincular(this.tecnico).subscribe(
      (res: any) => {
        this.reads_ap_sinvincular();
        this.snackBar.open(res.mensaje, "Aceptar", { duration: 2000, })
      },
      err => this.snackBar.open(err.error.mensaje, "Error", { duration: 2000, })
    )
  }


  personaGrupos: personaGrupo[] = [
    {
      name: 'Administrativo',
      persona: this.administrativos
    },
    {
      name: 'Proveedor',
      persona: this.proveedores
    }
  ];
}



@Component({
  selector: 'app-estado-incidente',
  templateUrl: './dialogs/incidente-estado.html',
  styleUrls: ['./configuracion.component.css']
})
export class IncidenteEstadoDialogComponent implements OnInit {

  /**
   * 
   * @param service Este parámetro debe ser de tipo de un servicio para que funcione correctamente.
   * @param snackBar SnackBar por defecto.
   * @param servicioMore Este es un servicio adicional, puede ser utilizado como usted guste
   */
  constructor(
    public service: IncidenteService,
    public snackBar: MatSnackBar) { }

  iestadoForm = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  models: any = []; // Este es un array que contienen a todos los registros que traiga de la base de datos.
  model: IncidenteEstado = {
    idestado_incidente: null,
    estado_incidente: null,
    descripcion: null
  }; // Este es solo un registro específico que trae de la base de datos.

  dataSource: MatTableDataSource<any>;

  // Crea un FormControl que será el que validará en que Tab se muestre inicialmente
  // En este caso se mostrará en el (0), que por lo general es "Listar"
  selected = new FormControl(0);

  // Esta variable valida el "Tab (Añadir | Editar)" 
  edit = false;

  valido = false;

  /** Nombres que se mostrarán como encabezado en la tabla.
   * Además deben tener el mismo nombre que los campos de la
   * base de datos.
   * Excepto acciones, que es donde se mostrarán las opciones
   * (editar o eliminar)
   */
  columnas: string[] = [
    'estado_incidente',
    'descripcion',
    'acciones'];

  ngOnInit() {
    this.gets();
  }

  /**
   * pone los valores del formulario para añadir/editar en ''
   */
  resetForm() {
    this.model.estado_incidente = '';
    this.model.descripcion = '';
  }

  edits(mode: any): void {
    // tslint:disable-next-line: forin
    for (const clave in mode) {
      this.model[clave] = mode[clave];
    }
    this.edit = true; // se cambia a true porque se va a editar el area.
    this.selected = new FormControl(1); // se pasa al siguiente tab para añadir una nueva area.
  }

  /**
   * Cuando se cambia de tab se considera éste método
   * Sirve para evaluar si el tab a cambiado al tab de Lista, si ese es el caso entonces restaura los valores del formulario
   * y la variable edit la convierte en false para cambiar los labels e iconos del tab y el formulario.
   */
  changeTab() {
    if (this.selected.value === 0) {
      this.resetForm();
      this.edit = false;
      this.iestadoForm.reset();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Método que guarda los datos ingresados en la base de datos
   * En el dialog-config puede que se pase el parámetro nombre
   * Pero usted puede modificar a su gusto en el configuracion.components.ts
   * @param nombre identificador (id | usuario | nombre | ...)
   */
  public save() {
    delete this.model.idestado_incidente;
    this.service.guardarEstado(this.model)
      .subscribe(
        (res: any) => {
          this.gets();
          this.selected = new FormControl(0);
          this.resetForm();
          this.snackBar.open(res.mensaje, 'Aceptar', { duration: 2000 });
        }, e => this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
      );
  }

  gets() {
    console.log('vas a leer')
    this.service.leerTodosEstado().subscribe(
      res => {
        this.models = res;
        this.dataSource = new MatTableDataSource(this.models);
      }, e => {
        console.log(e)
        this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
      }
    );
  }

  update() {
    this.service.actualizarEstado(this.model.idestado_incidente, this.model).subscribe(
      (res: any) => {
        console.log(res);
        this.resetForm();
        this.gets();
        this.edit = false;
        this.selected = new FormControl(0);
        this.snackBar.open(res.mensaje, 'Aceptar', { duration: 2000 });
      },
      e => this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
    );
  }

  delete(id: number) {
    this.service.eliminarEstado(id).subscribe(
      (res: any) => {
        this.gets();
        this.snackBar.open(res.mensaje, 'Aceptar', { duration: 2000 });
      },
      e => this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
    );
  }
}

@Component({
  selector: 'app-tipo-incidente',
  templateUrl: './dialogs/incidente-tipo.html',
  styleUrls: ['./configuracion.component.css']
})
export class IncidenteTipoDialogComponent implements OnInit {

  /**
   * 
   * @param service Este parámetro debe ser de tipo de un servicio para que funcione correctamente.
   * @param snackBar SnackBar por defecto.
   * @param servicioMore Este es un servicio adicional, puede ser utilizado como usted guste
   */
  constructor(
    public service: IncidenteService,
    public snackBar: MatSnackBar) { }

  iForm = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  models: any = []; // Este es un array que contienen a todos los registros que traiga de la base de datos.
  model: IncidenteTipo = {
    idtipo_incidente: null,
    tipo_incidente: null,
    descripcion: null
  }; // Este es solo un registro específico que trae de la base de datos.

  dataSource: MatTableDataSource<any>;

  // Crea un FormControl que será el que validará en que Tab se muestre inicialmente
  // En este caso se mostrará en el (0), que por lo general es "Listar"
  selected = new FormControl(0);

  // Esta variable valida el "Tab (Añadir | Editar)" 
  edit = false;

  valido = false;

  /** Nombres que se mostrarán como encabezado en la tabla.
   * Además deben tener el mismo nombre que los campos de la
   * base de datos.
   * Excepto acciones, que es donde se mostrarán las opciones
   * (editar o eliminar)
   */
  columnas: string[] = [
    'tipo_incidente',
    'descripcion',
    'acciones'];

  ngOnInit() {
    this.gets();
  }

  /**
   * pone los valores del formulario para añadir/editar en ''
   */
  resetForm() {
    this.model.tipo_incidente = '';
    this.model.descripcion = '';
  }

  edits(mode: any): void {
    // tslint:disable-next-line: forin
    for (const clave in mode) {
      this.model[clave] = mode[clave];
    }
    this.edit = true; // se cambia a true porque se va a editar el area.
    this.selected = new FormControl(1); // se pasa al siguiente tab para añadir una nueva area.
  }

  /**
   * Cuando se cambia de tab se considera éste método
   * Sirve para evaluar si el tab a cambiado al tab de Lista, si ese es el caso entonces restaura los valores del formulario
   * y la variable edit la convierte en false para cambiar los labels e iconos del tab y el formulario.
   */
  changeTab() {
    if (this.selected.value === 0) {
      this.resetForm();
      this.edit = false;
      this.iForm.reset();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Método que guarda los datos ingresados en la base de datos
   * En el dialog-config puede que se pase el parámetro nombre
   * Pero usted puede modificar a su gusto en el configuracion.components.ts
   * @param nombre identificador (id | usuario | nombre | ...)
   */
  public save() {
    delete this.model.idtipo_incidente;
    this.service.guardarTipo(this.model)
      .subscribe(
        (res: any) => {
          this.gets();
          this.selected = new FormControl(0);
          this.resetForm();
          this.snackBar.open(res.mensaje, 'Aceptar', { duration: 2000 });
        }, e => this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
      );
  }

  gets() {
    console.log('vas a leer')
    this.service.leerTodosTipo().subscribe(
      res => {
        this.models = res;
        this.dataSource = new MatTableDataSource(this.models);
      }, e => {
        console.log(e)
        this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
      }
    );
  }

  update() {
    this.service.actualizarTipo(this.model.idtipo_incidente, this.model).subscribe(
      (res: any) => {
        console.log(res);
        this.resetForm();
        this.gets();
        this.edit = false;
        this.selected = new FormControl(0);
        this.snackBar.open(res.mensaje, 'Aceptar', { duration: 2000 });
      },
      e => this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
    );
  }

  delete(id: number) {
    this.service.eliminarTipo(id).subscribe(
      (res: any) => {
        this.gets();
        this.snackBar.open(res.mensaje, 'Aceptar', { duration: 2000 });
      },
      e => this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
    );
  }
}

/**
 * IncidenteGravedadDialogComponent
 */

@Component({
  selector: 'app-gravedad-incidente',
  templateUrl: './dialogs/incidente-gravedad.html',
  styleUrls: ['./configuracion.component.css']
})
export class IncidenteGravedadDialogComponent implements OnInit {

  /**
   * 
   * @param service Este parámetro debe ser de tipo de un servicio para que funcione correctamente.
   * @param snackBar SnackBar por defecto.
   * @param servicioMore Este es un servicio adicional, puede ser utilizado como usted guste
   */
  constructor(
    public service: IncidenteService,
    public snackBar: MatSnackBar) { }

  iForm = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  models: any = []; // Este es un array que contienen a todos los registros que traiga de la base de datos.
  model: IncidenteGravedad = {
    idgravedad_incidente: null,
    gravedad_incidente: null,
    descripcion: null
  }; // Este es solo un registro específico que trae de la base de datos.

  dataSource: MatTableDataSource<any>;

  // Crea un FormControl que será el que validará en que Tab se muestre inicialmente
  // En este caso se mostrará en el (0), que por lo general es "Listar"
  selected = new FormControl(0);

  // Esta variable valida el "Tab (Añadir | Editar)" 
  edit = false;

  valido = false;

  /** Nombres que se mostrarán como encabezado en la tabla.
   * Además deben tener el mismo nombre que los campos de la
   * base de datos.
   * Excepto acciones, que es donde se mostrarán las opciones
   * (editar o eliminar)
   */
  columnas: string[] = [
    'gravedad_incidente',
    'descripcion',
    'acciones'];

  ngOnInit() {
    this.gets();
  }

  /**
   * pone los valores del formulario para añadir/editar en ''
   */
  resetForm() {
    this.model.gravedad_incidente = '';
    this.model.descripcion = '';
  }

  edits(mode: any): void {
    // tslint:disable-next-line: forin
    for (const clave in mode) {
      this.model[clave] = mode[clave];
    }
    this.edit = true; // se cambia a true porque se va a editar el area.
    this.selected = new FormControl(1); // se pasa al siguiente tab para añadir una nueva area.
  }

  /**
   * Cuando se cambia de tab se considera éste método
   * Sirve para evaluar si el tab a cambiado al tab de Lista, si ese es el caso entonces restaura los valores del formulario
   * y la variable edit la convierte en false para cambiar los labels e iconos del tab y el formulario.
   */
  changeTab() {
    if (this.selected.value === 0) {
      this.resetForm();
      this.edit = false;
      this.iForm.reset();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Método que guarda los datos ingresados en la base de datos
   * En el dialog-config puede que se pase el parámetro nombre
   * Pero usted puede modificar a su gusto en el configuracion.components.ts
   * @param nombre identificador (id | usuario | nombre | ...)
   */
  public save() {
    delete this.model.idgravedad_incidente;
    this.service.guardarGravedad(this.model)
      .subscribe(
        (res: any) => {
          this.gets();
          this.selected = new FormControl(0);
          this.resetForm();
          this.snackBar.open(res.mensaje, 'Aceptar', { duration: 2000 });
        }, e => this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
      );
  }

  gets() {
    console.log('vas a leer')
    this.service.leerTodosGravedad().subscribe(
      res => {
        this.models = res;
        this.dataSource = new MatTableDataSource(this.models);
      }, e => {
        console.log(e)
        this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
      }
    );
  }

  update() {
    this.service.actualizarGravedad(this.model.idgravedad_incidente, this.model).subscribe(
      (res: any) => {
        console.log(res);
        this.resetForm();
        this.gets();
        this.edit = false;
        this.selected = new FormControl(0);
        this.snackBar.open(res.mensaje, 'Aceptar', { duration: 2000 });
      },
      e => this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
    );
  }

  delete(id: number) {
    this.service.eliminarGravedad(id).subscribe(
      (res: any) => {
        this.gets();
        this.snackBar.open(res.mensaje, 'Aceptar', { duration: 2000 });
      },
      e => this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
    );
  }
}




/**
 * TecnicoListarDialogComponent
 */

@Component({
  selector: 'app-tecnico-listar',
  templateUrl: './dialogs/tecnico-listar-dialog.html',
  styleUrls: ['./configuracion.component.css']
})
export class TecnicoListarDialogComponent implements OnInit {

  /**
   * 
   * @param service Este parámetro debe ser de tipo de un servicio para que funcione correctamente.
   * @param snackBar SnackBar por defecto.
   * @param servicioMore Este es un servicio adicional, puede ser utilizado como usted guste
   */
  constructor(
    public tecService: TecnicoService,
    public snackBar: MatSnackBar) { }

  tecnicos: any = []; // Este es un array que contienen a todos los registros que traiga de la base de datos.
  model: any = {
    idtecnico: null,
    tecnico: null,
    funcion: null,
    comentario: null
  };

  dataSource: MatTableDataSource<any>;

  /** Nombres que se mostrarán como encabezado en la tabla.
   * Además deben tener el mismo nombre que los campos de la
   * base de datos.
   * Excepto acciones, que es donde se mostrarán las opciones
   * (editar o eliminar)
   */
  columnas: string[] = [
    'tecnico',
    'funcion',
    'comentario'
  ];

  ngOnInit() {
    this.gets();
  }

  gets() {
    this.tecService.leerTodos().subscribe(
      (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.tecnicos = res;
      }, e => {
        console.log(e)
        this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

/**
 * IncidenteSolucionDialogComponent
 */

@Component({
  selector: 'app-solucion-incidente',
  templateUrl: './dialogs/incidente-solucion.html',
  styleUrls: ['./configuracion.component.css']
})
export class IncidenteSolucionDialogComponent implements OnInit {

  /**
   * 
   * @param service Este parámetro debe ser de tipo de un servicio para que funcione correctamente.
   * @param snackBar SnackBar por defecto.
   */
  constructor(
    public service: IncidenteService,
    public snackBar: MatSnackBar) { }

  solucionForm = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  models: any = []; // Este es un array que contienen a todos los registros que traiga de la base de datos.
  model: IncidenteSolucion = {
    idsolucion_incidente: null,
    solucion_incidente: null
  }; // Este es solo un registro específico que trae de la base de datos.

  dataSource: MatTableDataSource<any>;

  // Crea un FormControl que será el que validará en que Tab se muestre inicialmente
  // En este caso se mostrará en el (0), que por lo general es "Listar"
  selected = new FormControl(0);

  // Esta variable valida el "Tab (Añadir | Editar)" 
  edit = false;

  valido = false;

  /** Nombres que se mostrarán como encabezado en la tabla.
   * Además deben tener el mismo nombre que los campos de la
   * base de datos.
   * Excepto acciones, que es donde se mostrarán las opciones
   * (editar o eliminar)
   */
  columnas: string[] = [
    'solucion_incidente',
    'acciones'];

  ngOnInit() {
    this.gets();
  }

  /**
   * pone los valores del formulario para añadir/editar en ''
   */
  resetForm() {
    this.model.solucion_incidente = '';
  }

  edits(mode: any): void {
    // tslint:disable-next-line: forin
    for (const clave in mode) {
      this.model[clave] = mode[clave];
    }
    this.edit = true; // se cambia a true porque se va a editar el area.
    this.selected = new FormControl(1); // se pasa al siguiente tab para añadir una nueva area.
  }

  /**
   * Cuando se cambia de tab se considera éste método
   * Sirve para evaluar si el tab a cambiado al tab de Lista, si ese es el caso entonces restaura los valores del formulario
   * y la variable edit la convierte en false para cambiar los labels e iconos del tab y el formulario.
   */
  changeTab() {
    if (this.selected.value === 0) {
      this.resetForm();
      this.edit = false;
      this.solucionForm.reset();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Método que guarda los datos ingresados en la base de datos
   * En el dialog-config puede que se pase el parámetro nombre
   * Pero usted puede modificar a su gusto en el configuracion.components.ts
   * @param nombre identificador (id | usuario | nombre | ...)
   */
  public save() {
    delete this.model.idsolucion_incidente;
    this.service.guardarSolucion(this.model)
      .subscribe(
        (res: any) => {
          this.gets();
          this.selected = new FormControl(0);
          this.resetForm();
          this.snackBar.open(res.mensaje, 'Aceptar', { duration: 2000 });
        }, e => this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
      );
  }

  gets() {
    console.log('vas a leer')
    this.service.leerTodosSolucion().subscribe(
      res => {
        this.models = res;
        this.dataSource = new MatTableDataSource(this.models);
      }, e => {
        console.log(e)
        this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
      }
    );
  }

  update() {
    this.service.actualizarSolucion(this.model.idsolucion_incidente, this.model).subscribe(
      (res: any) => {
        console.log(res);
        this.resetForm();
        this.gets();
        this.edit = false;
        this.selected = new FormControl(0);
        this.snackBar.open(res.mensaje, 'Aceptar', { duration: 2000 });
      },
      e => this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
    );
  }

  delete(id: number) {
    this.service.eliminarSolucion(id).subscribe(
      (res: any) => {
        this.gets();
        this.snackBar.open(res.mensaje, 'Aceptar', { duration: 2000 });
      },
      e => this.snackBar.open(e.error.mensaje, 'Error', { duration: 2000 })
    );
  }
}