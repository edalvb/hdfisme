import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { TipoMantenimiento } from "../../../models/Mantenimiento";
import { MantenimientoService } from 'src/app/services/mantenimiento.service';

@Component({
  selector: 'app-mantenimiento-tipo',
  templateUrl: './mantenimiento-tipo.component.html',
  styleUrls: ['./mantenimiento-tipo.component.css']
})
export class MantenimientoTipoComponent implements OnInit {

  cfDgFTipo = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  models: any = []; // Este es un array que contienen a todos los registros que traiga de la base de datos.
  model: TipoMantenimiento = {
    idtipo_mantenimiento: null,
    tipo_mantenimiento: null,
    descripcion: null
  }; // Este es solo un registro específico que trae de la base de datos.

  columnas: string[] = [
    'tipo_mantenimiento',
    'descripcion',
    'acciones'];

  dataSource: MatTableDataSource<any>;

  // Esta variable valida el "Tab (Añadir | Editar)" 
  edit = false;

  // Crea un FormControl que será el que validará en que Tab se muestre inicialmente
  // En este caso se mostrará en el (0), que por lo general es "Listar"
  selected = new FormControl(0);

  constructor(
    public snackBar: MatSnackBar,
    private tipoService: MantenimientoService) { }

  ngOnInit(): void {
    this.leerTodosTipos(); // Se trae a todos los datos para mostrar en la tabla.
  }

  crear() {
    delete this.model.idtipo_mantenimiento;
    this.tipoService.crearTipo(this.model).subscribe(
      (res: any) => {
        this.leerTodosTipos();
        this.selected = new FormControl(0);
        this.resetForm();
        this.mostrarMensaje(res.mensaje, "Aceptar")
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    );
  }

  leerTodosTipos() {
    this.tipoService.leerTodosTipo().subscribe(
      (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        //this.models = res;
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    );
  }

  actualizar() {
    this.tipoService.actualizaTipo(this.model.idtipo_mantenimiento,
      this.model).subscribe(
        (res: any) => {
          this.leerTodosTipos();
          this.resetForm();
          this.edit = false;
          this.mostrarMensaje(res.mensaje, 'Aceptar');
          this.selected = new FormControl(0);
        }, e => this.mostrarMensaje(e.error.mensaje, "Error")
      );
  }

  eliminar(id: number) {
    this.tipoService.eliminarTipo(id).subscribe(
      (res: any) => {
        this.leerTodosTipos();
        this.mostrarMensaje(res.mensaje, 'Aceptar');
      },
      err => this.mostrarMensaje(err.error.mensaje, 'Error')
    );
  }

  /**
   * Se le pasa el modelo que se selecciona en la tabla y se le pasa
   * con un for, al modelo que se está guardando aquí.
   * - Pasa, mode -> this.model
   * @param mode Modelo que se muestra en la tabla
   */
  editar(mode: any): void {
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
      this.cfDgFTipo.reset();
    }
  }

  /**
   * Asigna null a todos los valores del model
   */
  resetForm() {
    for (const key in this.model) {
      if (this.model.hasOwnProperty(key)) {
        this.model[key] = null; // Asignación de null al "model[key]"
      }
    }
  }

  /**
   * Muestra por 3 segundos un SnackBar conteniendo un mensaje.
   * @param mensaje Mensaje a mostrar en el SnackBar
   * @param action Puede ser Cualquier string, por ejemplo "Aceptar" o "Error"
   */
  mostrarMensaje(mensaje: string, action: string) {
    this.snackBar.open(mensaje == null ? "Lo siento, algo salió mal." : mensaje, action, {
      duration: 3000,
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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