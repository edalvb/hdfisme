import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, NgControl } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRippleModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';

import { BienService } from './services/bien.service';
import { BienComponent } from './components/bien/bien.component';
import { BienFormComponent } from './components/bien/bien-form/bien-form.component';
import { HomeComponent } from './components/home/home.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { AdministrativoComponent } from './components/administrativo/administrativo.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { AdministrativoListComponent } from './components/administrativo/administrativo-list/administrativo-list.component';
import { ProveedorListComponent } from './components/proveedor/proveedor-list/proveedor-list.component';
import {
  ConfiguracionComponent,
  AreaDialogComponent,
  TipoMovimientoDialogComponent,
  EstadoMovimientoDialogComponent,
  TipoBienDialogComponent,
  MarcaBienDialogComponent,
  EstadoBienDialogComponent,
  ModeloBienDialogComponent,
  PecosaDialogComponent,
  UnidadMedidaBienDialogComponent,
  UsuarioComponent,
  UsuarioVincularComponent,
  TecnicoVincularDialogComponent,
  IncidenteEstadoDialogComponent,
  IncidenteTipoDialogComponent,
  IncidenteGravedadDialogComponent,
  ColorDialogComponent,
  TecnicoListarDialogComponent,
  IncidenteSolucionDialogComponent
} from './components/configuracion/configuracion.component';
import { ResponsableComponent } from './components/responsable/responsable.component';
import { ResponsableFormComponent } from './components/responsable/responsable-form/responsable-form.component';
import { AsignaComponent } from './components/asigna/asigna.component';
import { AsignaFormComponent } from './components/asigna/asigna-form/asigna-form.component';
import { AccesoComponent } from './components/acceso/acceso.component';
import { RegistroComponent } from './components/registro/registro.component';

import { AuthGuard } from "./auth.guard";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { RolUsuarioComponent, RolUsuarioDialogComponent } from './components/rol-usuario/rol-usuario.component';
import { RolUsuarioFormComponent } from './components/rol-usuario/rol-usuario-form/rol-usuario-form.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { IncidenteComponent } from './components/incidente/incidente.component';
import { IncidenteFormComponent } from './components/incidente/incidente-form/incidente-form.component';
import { GrupoBienComponent, GrupoBienDetallesDialog } from "./components/bien/grupo/grupo.component";
import { GrupoBienFormComponent } from "./components/bien/grupo/grupo-form/grupo-form.component";
import { MantenimientoComponent,MantenimientoTareaDialog } from './components/mantenimiento/mantenimiento.component';
import { MantenimientoFormComponent } from './components/mantenimiento/mantenimiento-form/mantenimiento-form.component';
import { MantenimientoTipoComponent } from './components/mantenimiento/mantenimiento-tipo/mantenimiento-tipo.component';
import { MantenimientoEstadoComponent } from './components/mantenimiento/mantenimiento-estado/mantenimiento-estado.component';
import { MantenimientoPrioridadComponent } from './components/mantenimiento/mantenimiento-prioridad/mantenimiento-prioridad.component';
import { MantenimientoTareaComponent } from './components/mantenimiento/mantenimiento-tarea/mantenimiento-tarea.component';
import { MensajeComponent, MensajeDestinatarioDialogComponent } from './components/mensaje/mensaje/mensaje.component';
import { GrupoMensajeComponent } from './components/mensaje/grupo-mensaje/grupo-mensaje.component';
import { InformeComponent } from './components/informe/informe.component';

import { ExportarService } from "./services/exportar.service";


@NgModule({
  declarations: [
    AppComponent,
    BienComponent,
    BienFormComponent,
    HomeComponent,
    SolicitudComponent,
    AdministrativoComponent,
    ProveedorComponent,
    AdministrativoListComponent,
    ProveedorListComponent,
    ConfiguracionComponent,
    AreaDialogComponent,
    TipoMovimientoDialogComponent,
    EstadoMovimientoDialogComponent,
    TipoBienDialogComponent,
    MarcaBienDialogComponent,
    EstadoBienDialogComponent,
    ModeloBienDialogComponent,
    PecosaDialogComponent,
    UnidadMedidaBienDialogComponent,
    ResponsableComponent,
    ResponsableFormComponent,
    AsignaComponent,
    AsignaFormComponent,
    AccesoComponent,
    RegistroComponent,
    RolUsuarioComponent,
    RolUsuarioFormComponent,
    RolUsuarioDialogComponent,
    UsuarioComponent,
    UsuarioVincularComponent,
    PerfilComponent,
    TecnicoVincularDialogComponent,
    IncidenteEstadoDialogComponent,
    IncidenteTipoDialogComponent,
    IncidenteGravedadDialogComponent,
    IncidenteSolucionDialogComponent,
    IncidenteComponent,
    IncidenteFormComponent,
    ColorDialogComponent,
    GrupoBienComponent,
    GrupoBienFormComponent,
    TecnicoListarDialogComponent,
    GrupoBienDetallesDialog,
    MantenimientoComponent,
    MantenimientoFormComponent,
    MantenimientoTipoComponent,
    MantenimientoEstadoComponent,
    MantenimientoPrioridadComponent,
    MantenimientoTareaComponent,
    MantenimientoTareaDialog,
    MensajeComponent,
    GrupoMensajeComponent,
    MensajeDestinatarioDialogComponent,
    InformeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonToggleModule,
    RouterModule,
    LayoutModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCardModule,
    ReactiveFormsModule, // Para la validación de los inputs
    MatMenuModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRippleModule,
    MatRadioModule,
    MatChipsModule,
    MatExpansionModule
  ],
  entryComponents: [
    AreaDialogComponent,
    TipoMovimientoDialogComponent,
    EstadoMovimientoDialogComponent,
    TipoBienDialogComponent,
    MarcaBienDialogComponent,
    EstadoBienDialogComponent,
    ModeloBienDialogComponent,
    PecosaDialogComponent,
    UnidadMedidaBienDialogComponent,
    RolUsuarioDialogComponent,
    UsuarioComponent,
    UsuarioVincularComponent,
    TecnicoVincularDialogComponent,
    IncidenteEstadoDialogComponent,
    IncidenteTipoDialogComponent,
    IncidenteGravedadDialogComponent,
    IncidenteSolucionDialogComponent,
    ColorDialogComponent,
    MatSortModule,
    TecnicoListarDialogComponent,
    GrupoBienDetallesDialog,
    MantenimientoTareaDialog,
    MensajeDestinatarioDialogComponent
  ],
  providers: [
    BienService,
    MatDatepickerModule,
    ErrorStateMatcher,
    ShowOnDirtyErrorStateMatcher,
    AuthGuard,
    ExportarService,
    {
      provide: MAT_DATE_LOCALE, // Para establecer el código local
      useValue: 'es-US'         // Español de EE.UU.
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
