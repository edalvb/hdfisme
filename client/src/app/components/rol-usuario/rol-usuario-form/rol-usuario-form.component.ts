import { Component, OnInit } from '@angular/core';
import { RolUsuarioService } from "../../../services/rol-usuario.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-rol-usuario-form',
  templateUrl: './rol-usuario-form.component.html',
  styleUrls: ['./rol-usuario-form.component.css']
})
export class RolUsuarioFormComponent implements OnInit {

  cfDgFRol = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  filas = [
    'Usuario',
    'Bien',
    'Administrativo',
    'Proveedor',
    'Incidente'
  ]

  columnas = [
    'Crear',
    'Leer',
    'Actualizar',
    'Eliminar'
  ]

  edit = false;

  rolUsuario: any = {
    id: null,
    rol: null,
    descripcion: null,
    usuario: {
      "crear": 0,
      "leer": 0,
      "actualizar": 0,
      "eliminar": 0
    },
    administrativo: {
      "crear": 0,
      "leer": 0,
      "actualizar": 0,
      "eliminar": 0
    },
    proveedor: {
      "crear": 0,
      "leer": 0,
      "actualizar": 0,
      "eliminar": 0
    },
    bien: {
      "crear": 0,
      "leer": 0,
      "actualizar": 0,
      "eliminar": 0
    },
    incidente: {
      "crear": 0,
      "leer": 0,
      "actualizar": 0,
      "eliminar": 0
    },
    tecnico: {
      "crear": 0,
      "leer": 0,
      "actualizar": 0,
      "eliminar": 0
    },
    mantenimiento: {
      "crear": 0,
      "leer": 0,
      "actualizar": 0,
      "eliminar": 0
    },
  };

  constructor(
    private rUsuario: RolUsuarioService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const param = this.activatedRoute.snapshot.params;
    if (param.id) {
      this.rUsuario.read(param.id).subscribe(
        (res: any) => {
          this.pasarDatos(res);
          this.edit = true;
        },
        err => this.openSnackBar(err.error.mensaje, "Error")
      );
    }
  }

  crear() {
    delete this.rolUsuario.id;
    this.cambiarRolToString();
    console.log(this.rolUsuario)
    this.rUsuario.create(this.rolUsuario).subscribe(
      (res: any) => {
        this.openSnackBar(res.mensaje, "Aceptar");
        this.router.navigate(['/conf/rolusuario']);
      },
      err => {
        this.openSnackBar(err.error.mensaje, "Error")
      }
    )
  }

  actualizar() {
    const idrol = this.rolUsuario.id;
    delete this.rolUsuario.id;
    this.cambiarRolToString()
    this.rUsuario.update(idrol, this.rolUsuario).subscribe(
      (res: any) => {
        this.openSnackBar(res.mensaje, "Aceptar")
        this.router.navigate(['/conf/rolusuario/']);
      },
      err => this.openSnackBar(err.error.mensaje, "Error")
    );
  }

  /**
   * Pasa todos los datos que se traen del servidor a rolUsuario
   * y se cambia el tipo de dato de Strings a JSON en los permisos
   * @param res La respuesta del servidor
   */
  pasarDatos(res: any) {
    this.rolUsuario.id = res.id;
    this.rolUsuario.rol = res.rol;
    this.rolUsuario.descripcion = res.descripcion;
    this.rolUsuario.usuario = JSON.parse(res.usuario);
    this.rolUsuario.administrativo = JSON.parse(res.administrativo);
    this.rolUsuario.proveedor = JSON.parse(res.proveedor);
    this.rolUsuario.bien = JSON.parse(res.bien);
    this.rolUsuario.incidente = JSON.parse(res.incidente);
    this.rolUsuario.tecnico = JSON.parse(res.tecnico);
    this.rolUsuario.mantenimiento = JSON.parse(res.mantenimiento);
  }

  /**
   * Cambia el tipo de datos de JSON a Strings en los permisos
   * para asegurarse que se le envian en ese formato porque Mysql
   */
  cambiarRolToString() {
    this.rolUsuario.usuario = this.normalizar(this.rolUsuario.usuario);
    this.rolUsuario.administrativo = this.normalizar(this.rolUsuario.administrativo);
    this.rolUsuario.proveedor = this.normalizar(this.rolUsuario.proveedor);
    this.rolUsuario.bien = this.normalizar(this.rolUsuario.bien);
    this.rolUsuario.incidente = this.normalizar(this.rolUsuario.incidente);
    this.rolUsuario.tecnico = this.normalizar(this.rolUsuario.tecnico);
    this.rolUsuario.mantenimiento = this.normalizar(this.rolUsuario.mantenimiento);
  }

  /**
   * A los valores "crear, actualizar y eliminar" por el 
   * checkbox tiene un valor "true o false" entonces
   * para validar los roles en el servidor, deben ser "1 o 0"
   * Lo que hace este método es cambiar los valores true a 1
   * y false a 0.
   * @param objeto Objeto JSON
   */
  normalizar(objeto: JSON): String {
    objeto['crear'] = objeto['crear'] == true ? 1 : 0;
    objeto['actualizar'] = objeto['actualizar'] == true ? 1 : 0;
    objeto['eliminar'] = objeto['eliminar'] == true ? 1 : 0;

    return JSON.stringify(objeto);
  }

  /**
   * Este método es llamado al momento que se preciona el boton 
   * de leer, cabiará la propiedad de rolUsuario.algo[leer] y
   * retornará "No" si es 0, "Si" si es 1 y "Si, para todos" si es 2
   * @param permiso valor rolUsuario.algo[leer]
   */
  convertir(permiso: any): string {
    if (permiso == 0) {
      return 'No';
    } else if (permiso == 1) {
      return 'Si';
    } else if (permiso == 2) {
      return 'Si, para todos';
    }
    return '';
  }

  setAccion(accion: string) {
    switch (accion) {
      case 'usuario':
        this.rolUsuario.usuario.leer = this.pasarObjeto(this.rolUsuario.usuario.leer, accion);
        break;
      case 'bien':
        this.rolUsuario.bien.leer = this.pasarObjeto(this.rolUsuario.bien.leer, accion);
        break;
      case 'administrativo':
        this.rolUsuario.administrativo.leer = this.pasarObjeto(this.rolUsuario.administrativo.leer, accion);
        break;
      case 'proveedor':
        this.rolUsuario.proveedor.leer = this.pasarObjeto(this.rolUsuario.proveedor.leer, accion);
        break;
      case 'incidente':
        this.rolUsuario.incidente.leer = this.pasarObjeto(this.rolUsuario.incidente.leer, accion);
        break;
      case 'tecnico':
        this.rolUsuario.tecnico.leer = this.pasarObjeto(this.rolUsuario.tecnico.leer, accion);
        break;
      case 'mantenimiento':
        this.rolUsuario.mantenimiento.leer = this.pasarObjeto(this.rolUsuario.mantenimiento.leer, accion);
        break;
      default:
        return this.openSnackBar("No puedo cambiar esta propiedad Leer", "Aceptar");
    }
  }

  pasarObjeto(contador: string, accion: string): number {
    let conta: number = Number.parseInt(contador) + 1;

    if (conta > 2) conta = 0;

    console.log(conta);

    if (conta == 0) {
      document.getElementById(accion).innerText = this.convertir(0);
      return 0
    } else if (conta == 1) {
      document.getElementById(accion).innerText = this.convertir(1);
      return 1
    } else if (conta == 2) {
      document.getElementById(accion).innerText = this.convertir(2);
      return 2
    }
  }

  openSnackBar(mensaje: any, accion: any) {
    this._snackBar.open(mensaje, accion, {
      duration: 3000,
    })
  }

}


/** Error cuando el control no válido está sucio, tocado o enviado. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}