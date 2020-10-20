import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user = {
    usuario: null,
    contrasena: null
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar) {
    // Si existe al
    this.auth.existeUsuarios().subscribe(
      (res: any) => {
        if (res.usuario == true) {
          auth.cerrarSesion()
          this.router.navigate(['/acceso']);
        } else {
          this._snackBar.open("Empezemos con tu registro.", "Aceptar", {duration: 2000});
        }
      }, e => {
        console.log(e.error)
        this._snackBar.open(e.error.mensaje, "Error", {
          duration: 2000,
        });
      }
    );
  }

  ngOnInit(): void {
  }

  registro() {
    this.auth.registro(this.user).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      },
      err => {
        this._snackBar.open(err.error.mensaje, "Error", {
          duration: 2000,
        });
      }
    )
  }

}
