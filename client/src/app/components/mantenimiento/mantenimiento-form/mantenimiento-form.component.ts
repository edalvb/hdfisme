import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { Mantenimiento, TipoMantenimiento, PrioridadMantenimiento, EstadoMantenimiento, TareaMantenimiento } from "../../../models/Mantenimiento";
import { GrupoBien } from "../../../models/Bien";
import { GrupoTecnicoSimple } from "../../../models/Tecnico";

import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { BienService } from "../../../services/bien.service";
import { TecnicoService } from 'src/app/services/tecnico.service';


@Component({
  selector: 'app-mantenimiento-form',
  templateUrl: './mantenimiento-form.component.html',
  styleUrls: ['./mantenimiento-form.component.css']
})
export class MantenimientoFormComponent implements OnInit {

  fcTipo = new FormControl('', [Validators.required]);
  fcPrioridad = new FormControl('', [Validators.required]);
  fcEstado = new FormControl('', [Validators.required]);
  fcGrupotarea = new FormControl('', [Validators.required]);
  fcTecnico = new FormControl('', [Validators.required]);
  fcDescripcion = new FormControl('', [Validators.required]);
  fcFechaMantenimiento = new FormControl('', [Validators.required]);

  mantenimiento: Mantenimiento = {
    idmatenimiento: null,
    idtipo: null,
    idprioridad: null,
    idestado: null,
    idgrupo_bien: null,
    idtecnico: null,
    descripcion: null,
    fecha_mantenimiento: null,
    fecha_fin: null,
    fecha_creacion: null,
    fecha_actualizacion: null,
  };

  // Estos arrays contendrán los datos se utilizarán en el select
  tipos: TipoMantenimiento[] = [];
  prioridades: PrioridadMantenimiento[] = [];
  estados: EstadoMantenimiento[] = [];
  grupoBienes: GrupoBien[] = [];

  // Sirve para mostrar el error debajo del form-field
  matcher = new MyErrorStateMatcher();

  // Valida si se está actualizando o creando
  edit = false;

  tareas: TareaMantenimiento[] = [];

  columnas: string[] = [
    'select',
    'tarea_mantenimiento',
    'descripcion',
    'horas'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource<TareaMantenimiento>(this.tareas);
  selection = new SelectionModel<TareaMantenimiento>(true, []);

  // Para el panel de expansión
  panelOpenState = false;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private mService: MantenimientoService,
    private bienService: BienService,
    private tecService: TecnicoService,
    public dialog: MatDialog) {
    this.mService.leerTodosTarea().subscribe(
      (res: TareaMantenimiento[]) => {
        this.dataSource = new MatTableDataSource<TareaMantenimiento>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.tareas = res;
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    );
  }

  ngOnInit() {
    this.leerTodosGrupoBienes();
    this.leerTodosTipos();
    this.leerTodosPrioridades();
    this.leerTodosEstado();
    this.leerTecnicos()

    const param = this.activatedRoute.snapshot.params;
    if (param.id) {
      this.mService.leer(param.id).subscribe(
        (res: Mantenimiento) => {
          this.mantenimiento = res;
          this.edit = true;
        },
        e => this.mostrarMensaje(e.error.mensaje, "Error")
      );
    }

  }

  crear() {
    delete this.mantenimiento.idmatenimiento;
    delete this.mantenimiento.fecha_creacion;
    delete this.mantenimiento.fecha_actualizacion;
    
    let task = new Array();
    this.selection.selected.forEach((tarea: TareaMantenimiento) => {
      task.push(tarea.idtarea_mantenimiento);
    });
    console.log({
      mantenimiento: this.mantenimiento,
      grupoTarea: task
    });

    this.mService.crear({
        mantenimiento: this.mantenimiento,
        grupoTarea: task
      }).subscribe(
        () => {
          this.route.navigate(['/conf/mantenimiento']);
        }, e => this.mostrarMensaje(e.error.mensaje, "Error")
      );
  }

  actualizar() {
    
  }

  leerTodosEstado() {
    this.mService.leerTodosEstado().subscribe(
      (res: EstadoMantenimiento[]) => {
        this.estados = res;
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    );
  }

  leerTodosTipos() {
    this.mService.leerTodosTipo().subscribe(
      (res: TipoMantenimiento[]) => {
        this.tipos = res;
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    );
  }

  leerTodosPrioridades() {
    this.mService.leerTodosPrioridad().subscribe(
      (res: PrioridadMantenimiento[]) => {
        this.prioridades = res;
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    );
  }

  leerTodosGrupoBienes() {
    this.bienService.leerTodosGrupos().subscribe(
      (res: GrupoBien[]) => {
        this.grupoBienes = res;
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    );
  }

  // Esto servirá para el técnico
  tecnicos: GrupoTecnicoSimple[];

  leerTecnicos() {
    this.tecService.leerAdminProve().subscribe(
      (res: any) => {
        this.tecnicos = [
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

  /** Si el número de elementos seleccionados coincide con el número total de filas. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selecciona todas las filas si no están todas seleccionadas; de lo contrario, limplia la selección. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** La etiqueta de la casilla de verificación en la fila pasada */
  checkboxLabel(row?: TareaMantenimiento): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.tarea_mantenimiento + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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