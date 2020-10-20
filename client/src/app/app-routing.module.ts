import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';

/** Aquí van  todos los componentes para listar */
import { BienComponent } from './components/bien/bien.component';
import { BienFormComponent } from './components/bien/bien-form/bien-form.component';
import { AdministrativoListComponent } from './components/administrativo/administrativo-list/administrativo-list.component';
import { ProveedorListComponent } from './components/proveedor/proveedor-list/proveedor-list.component';
import { ResponsableComponent } from "./components/responsable/responsable.component";
import { AsignaComponent } from "./components/asigna/asigna.component";

/** Aquí van todos los componentes formularios para crear o editar algun elemento */
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { AdministrativoComponent } from './components/administrativo/administrativo.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { ResponsableFormComponent } from "./components/responsable/responsable-form/responsable-form.component";
import { AsignaFormComponent } from "./components/asigna/asigna-form/asigna-form.component";
import { AccesoComponent } from './components/acceso/acceso.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RolUsuarioComponent } from './components/rol-usuario/rol-usuario.component';
import { RolUsuarioFormComponent } from './components/rol-usuario/rol-usuario-form/rol-usuario-form.component';

// Guards
import { AuthGuard } from "./auth.guard";
import { PerfilComponent } from './components/perfil/perfil.component';
import { IncidenteComponent } from './components/incidente/incidente.component';
import { IncidenteFormComponent } from './components/incidente/incidente-form/incidente-form.component';
import { GrupoBienComponent } from './components/bien/grupo/grupo.component';
import { GrupoBienFormComponent } from './components/bien/grupo/grupo-form/grupo-form.component';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { MantenimientoFormComponent } from './components/mantenimiento/mantenimiento-form/mantenimiento-form.component';
import { MensajeComponent } from './components/mensaje/mensaje/mensaje.component';
import { GrupoMensajeComponent } from './components/mensaje/grupo-mensaje/grupo-mensaje.component';
import { InformeComponent } from './components/informe/informe.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  // Solicitud
  {
    path: 'solicitud',
    component: SolicitudComponent,
    canActivate: [AuthGuard]
  },
  // Configuracion
  {
    path: 'conf',
    component: ConfiguracionComponent,
    canActivate: [AuthGuard]
  },
  // Bien
  {
    path: 'bien',
    component: BienComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bien/add',
    component: BienFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bien/edit/:id',
    component: BienFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conf/bien/grupo',
    component: GrupoBienComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conf/bien/grupo/add',
    component: GrupoBienFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conf/bien/grupo/edit/:id',
    component: GrupoBienFormComponent,
    canActivate: [AuthGuard]
  },
  // Administrativo
  {
    path: 'administrativo',
    component: AdministrativoListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'administrativo/add',
    component: AdministrativoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'administrativo/edit/:id',
    component: AdministrativoComponent,
    canActivate: [AuthGuard]
  },
  // Proveedor
  {
    path: 'proveedor',
    component: ProveedorListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'proveedor/add',
    component: ProveedorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'proveedor/edit/:id',
    component: ProveedorComponent,
    canActivate: [AuthGuard]
  },
  // Responsable
  {
    path: 'conf/responsable',
    component: ResponsableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conf/responsable/add',
    component: ResponsableFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conf/responsable/edit/:id',
    component: ResponsableFormComponent,
    canActivate: [AuthGuard]
  },
  // Asignación
  {
    path: 'conf/responsable/asigna',
    component: AsignaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conf/responsable/asigna/add',
    component: AsignaFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conf/responsable/asigna/edit/:id',
    component: AsignaFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'acceso',
    component: AccesoComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'conf/rolusuario',
    component: RolUsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conf/rolusuario/add',
    component: RolUsuarioFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conf/rolusuario/add',
    component: RolUsuarioFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conf/rolusuario/edit/:id',
    component: RolUsuarioFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conf/incidente',
    component: IncidenteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conf/incidente-form',
    component: IncidenteFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conf/incidente-form/add',
    component: IncidenteFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conf/incidente-form/edit/:id',
    component: IncidenteFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conf/mantenimiento',
    component: MantenimientoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conf/mantenimiento-form',
    component: MantenimientoFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conf/mantenimiento-form/add',
    component: MantenimientoFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conf/mantenimiento-form/edit/:id',
    component: MantenimientoFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mensaje',
    component: MensajeComponent
  },
  {
    path: 'mensaje/grupo',
    component: GrupoMensajeComponent
  },
  {
    path: 'informe',
    component: InformeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
