import { Component, OnInit } from '@angular/core';
import { PerfilService } from "../../services/perfil.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  // Usuario FormControl
  vUsuario = new FormControl('', [Validators.required]);
  vContrasena = new FormControl('', [Validators.required]);

  // Administrativo FormControl
  vPNombre = new FormControl('', [Validators.required]);
  vSNombre = new FormControl(); // Realmente no validará nada solo sirve para obtener su valor
  vPApellido = new FormControl('', [Validators.required]);
  vSApellido = new FormControl('', [Validators.required]);

  // Persona FormControls
  vFNaci = new FormControl();   // Realmente no validará nada solo sirve para obtener su valor
  vEmail = new FormControl('', [Validators.email]);
  vDireccion = new FormControl();// Realmente no validará nada solo sirve para obtener su valor
  vDni = new FormControl('', [
    Validators.pattern("^[0-9]*$"),
    Validators.maxLength(8),
    Validators.minLength(8),
  ]);
  vRuc = new FormControl('', [
    Validators.pattern("^[0-9]*$"),
    Validators.maxLength(11),
    Validators.minLength(11),
  ]);
  vCelular = new FormControl('', [
    Validators.pattern("^[0-9]*$"),
    Validators.maxLength(9),
    Validators.minLength(9),
  ]);
  vTelefono = new FormControl('', [
    Validators.pattern("^[0-9]*$"),
    Validators.maxLength(9),
    Validators.minLength(9),
  ]);

  // Proveedor FormControl
  vRazonSocial = new FormControl('', [Validators.required]);
  vRubro = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  // esta variable contendrá el perfil que se obtenga del servidor
  myPerfil: any = {}

  // en esta variable se guardará la contraseña que se modifique
  usuarioTemp: any = {
    usuario: null,
    contrasena: null,
    comentario: null
  }

  // estado de edición del usuario en el view
  editUsuario = false;

  // estado de edición del administrativo en el view
  editAdministrativo = false;

  // estado de edición del proveedor en el view
  editProveedor = false;

  // Estado de visivilidad de la contraseña
  chPassword = false;

  constructor(
    private perfil: PerfilService,
    private snackBar: MatSnackBar,
    private auth: AuthService) {
      this.read_usuario();
    }

  ngOnInit(): void {
  }

  /**
   * Obtiene el perfil y pasa lo que tenga a el JSON myPerfil
   */
  read_usuario() {
    this.perfil.readme().subscribe(
      (res: any) => {
        try {
          console.log(res);
          this.asignarUsuarioTemp(res.usuario, res.comentario_usuario);
          this.myPerfil = res;
          this.cambiarRolToString()
        } catch (e) {
          console.log(e)
          this.auth.cerrarSesion();
        }
      },
      err => {
        this.snackBar.open(err.error.mensaje, "Error", { duration: 3000, });
      }
    );

  }

  /**
   * Actualiza según los cambios hechos con las variables del perfil.
   */
  updateUsuario() {
    // Creamos un objeto json que utilizaremos para enviar al servidor
    let usuarioTemp1: any = {};

    console.log(this.usuarioTemp.contrasena != '');

    // Comprobamos que lo que escribamos sea diferente a lo que trajimos del servidor y
    // que este campo no sea vacío ''
    if (this.vUsuario.value != this.myPerfil.usuario &&
      this.vUsuario.value != '') usuarioTemp1.usuario = this.vUsuario.value;

    // Comprobamos que la contraseña no sea null (que no se haya modificado) o que no se ''
    // (que sea String pero que esté vacío)
    if (this.vContrasena.value != null && this.vContrasena.value != '') usuarioTemp1.contrasena = this.vContrasena.value;

    // Comprobamos que lo que escribamos sea diferente a lo que trajimos del servidor
    if (this.usuarioTemp.comentario != this.myPerfil.comentario_usuario) usuarioTemp1.comentario = this.usuarioTemp.comentario;

    // El objeto temporal que creamos puede ser null, por eso evaluamos su tamaño
    if (this.length(usuarioTemp1) <= 0) {
      this.eUsuario();
      return this.snackBar.open("No se realizó ninguna modificación", "Aviso", { duration: 3000, });
    }

    // Actualizamos el usuario
    this.perfil.updateme(this.myPerfil.usuario, usuarioTemp1).subscribe(
      (res: any) => {
        this.read_usuario();
        this.usuarioTemp.contrasena = null;
        this.snackBar.open(res.mensaje, "Aceptar", { duration: 3000, })
      },
      err => this.snackBar.open(err.error.mensaje, "Error", { duration: 3000, })
    );

    this.eUsuario();
  }

  /**
   * Método que actualizará al Administrativo
   */
  updateAdministrativo() {
    this.perfil.updateme('a', [
      //                       Nombres en el SP   FormControls
      this.myPerfil.idpersona,  //id             
      this.vFNaci.value,        //fechana         vFNaci
      this.vEmail.value,        //correo          vEmail
      this.vDireccion.value,    //address         vDireccion
      this.vCelular.value,      //celphonephone   vCelular
      this.vTelefono.value,     //phone           vTelefono
      this.vRuc.value,          //ruc             vRuc
      this.vPNombre.value,      //pname           vPNombre
      this.vSNombre.value,      //sname           vSNombre
      this.vPApellido.value,    //plname          vPApellido
      this.vSApellido.value,    //slname          vSApellido
      this.vDni.value,          //dni             vDni
      this.myPerfil.idarea      //idare           
    ]).subscribe(
      (res: any) => {
        this.read_usuario();
        this.snackBar.open(res.mensaje, "Aceptar", { duration: 3000 });
      }, err => this.snackBar.open(err.error.mensaje, "Error", { duration: 3000 })
    );
    this.eAdministrativo();
  }

  /**
   * Método que actualizará al proveedor
   */
  updateProveedor() {
    this.perfil.updateme('p', [
      //                       Nombres en el SP   FormControls
      this.myPerfil.idpersona,  //id             
      this.vFNaci.value,        //fechana         vFNaci
      this.vEmail.value,        //correo          vEmail
      this.vDireccion.value,    //address         vDireccion
      this.vCelular.value,      //celphonephone   vCelular
      this.vTelefono.value,     //phone           vTelefono
      this.vRuc.value,          //ruc             vRuc
      this.vRazonSocial.value,  //rsocial         vRazonSocial
      this.vRubro.value,        //rubre           vRubro
    ]).subscribe(
      (res: any) => {
        this.read_usuario();
        this.snackBar.open(res.mensaje, "Aceptar", { duration: 3000 });
      }, err => this.snackBar.open(err.error.mensaje, "Error", { duration: 3000 })
    );
    this.eProveedor();
  }

  /**
   * Cambia el tipo de datos de JSON a Strings en los permisos
   * para asegurarse que se le envian en ese formato porque Mysql
   */
  cambiarRolToString () {
    this.myPerfil.rusuario = JSON.parse(this.myPerfil.rusuario);
    this.myPerfil.radministrativo = JSON.parse(this.myPerfil.radministrativo);
    this.myPerfil.rproveedor = JSON.parse(this.myPerfil.rproveedor);
    this.myPerfil.rbien = JSON.parse(this.myPerfil.rbien);
    this.myPerfil.rincidente = JSON.parse(this.myPerfil.rincidente);
    this.myPerfil.rtecnico = JSON.parse(this.myPerfil.rtecnico);
    this.myPerfil.rmantenimiento = JSON.parse(this.myPerfil.rmantenimiento);
  }

  /**
   * Método que sirve para comprobar si se está editando o no.
   * Cambia el valor de la propiedad editUsuario
   */
  eUsuario() {
    if (this.editUsuario == false) this.editUsuario = true;
    else this.editUsuario = false;
  }

  /**
   * Método que sirve para comprobar si se está editando o no.
   * Cambia el valor de la propiedad editAdministrativo
   */
  eAdministrativo() {
    if (this.editAdministrativo == false) this.editAdministrativo = true;
    else this.editAdministrativo = false;
  }

  /**
   * Método que sirve para comprobar si se está editando o no.
   * Cambia el valor de la propiedad editProveedor
   */
  eProveedor() {
    if (this.editProveedor == false) this.editProveedor = true;
    else this.editProveedor = false;
  }

  /**
   * Obtiene la longitud del objeto json que le pasemos por parámetro.
   * @param obj Objeto json a ser evaluado
   */
  length(obj: any): number {
    var size = 0, key: string;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  /**
   * Cambia los valores (usuario y comentario) de usuarioTemp.
   * @param usuario Valor que reemplazará al valor que tenga usuarioTemp como hijo usuario
   * @param comentario Valor que reemplazará al hijo comentario del usuarioTemp
   */
  asignarUsuarioTemp(usuario, comentario) {
    this.usuarioTemp.usuario = usuario
    this.usuarioTemp.comentario = comentario
  }

  /*
  asignarProveedorTemp(res: any) {
    for (let campo in this.proveedorTemp) {
      this.proveedorTemp[campo] = res[campo];
    }
    console.log(this.proveedorTemp);
  }

  asignarAdministrativoTemp(res: any) {
    for (let campo in this.administrativoTemp) {
      this.administrativoTemp[campo] = res[campo];
    }
    console.log(this.administrativoTemp);
  }
  */

  /**
   * Cambia la visibilidad de la contraseña
   */
  cambiarVisivilidad() {
    let password;
    password = document.getElementById("password");

    if (this.chPassword == false) {
      password.type = "text";
      this.chPassword = true;
    }
    else {
      password.type = "password";
      this.chPassword = false;
    }
  }

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

  /**
   * Incrementa el contador en 1 y modifica el objeto html pasandole su id.
   * Retornará el valor que se tenga el contador.
   * @param contador Se incrementa en 1 al valor que se le pase
   * @param idtag id del objeto html a modificar
   */
  pasarObjeto(contador: string, idtag: string): string {
    let conta: number = Number.parseInt(contador) + 1;

    if (conta > 2) conta = 0;

    console.log(conta);

    if (conta == 0) {
      document.getElementById(idtag).innerText = this.convertir(0);
      return '0'
    } else if (conta == 1) {
      document.getElementById(idtag).innerText = this.convertir(1);
      return '1'
    } else if (conta == 2) {
      document.getElementById(idtag).innerText = this.convertir(2);
      return '2'
    }
  }

}


/** Error cuando el control no válido está sucio, tocado o enviado. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}