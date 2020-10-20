import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  cambiaTema: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    accede(): boolean {
      return this.authService.acceder()
    }

    cerrarSesion() {
      this.authService.cerrarSesion();
    }

    cambiarTema() {
      this.cambiaTema = !this.cambiaTema;
    }


}
