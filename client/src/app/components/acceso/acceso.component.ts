import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent implements OnInit {

  vUsuario = new FormControl('', [Validators.required]);
  vContrasena = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  user = {
    usuario: '',
    contrasena: ''
  };

  rUsuario = null;
  rContrasena = null;
  accedio = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar) {
    // Validamos si existen usuario o no
    // Si no hay usuarios que se registre el primero
    this.auth.existeUsuarios().subscribe(
      (res: any) => {
        if (res.usuario == false) {
          auth.cerrarSesion()
          this.router.navigate(['/registro']);
        }
      },
      e => {
        auth.cerrarSesion()
      }
    );
  }

  ngOnInit(): void {
  }

  acceso() {
    this.rUsuario = null;
    this.auth.acceso(this.user).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      },
      err => {
        if (err.error.quien == 'usuario') {
          this.rUsuario = err.error.mensaje
          this.vUsuario.setValue('', { emitEvent: true });
          this.rContrasena = null;
        } else if (err.error.quien == 'contrasena') {
          this.vContrasena.setValue('', { emitEvent: true });
          this.rContrasena = err.error.mensaje
          this.rUsuario = null;
        }
        //this._snackBar.open(err.error.mensaje, "Error", {duration: 2000});
      }
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