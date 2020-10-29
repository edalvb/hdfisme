import { OnInit, Directive } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error cuando el control no válido está sucio, tocado o enviado. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Directive()
export class ConfigDialog implements OnInit {

  /**
   * 
   * @param service Este parámetro debe ser de tipo de un servicio para que funcione correctamente.
   * @param _snackBar SnackBar por defecto.
   * @param servicioMore Este es un servicio adicional, puede ser utilizado como usted guste
   */
  constructor(
    public service: any,
    public _snackBar: any,
    public servicioMore?: any) { }

  /**
   * Título que se mostrará en el Diálogo.
   */
  nombre: string;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  cfDgFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  models: any = []; // Este es un array que contienen a todos los registros que traiga de la base de datos.
  model: any = {}; // Este es solo un registro específico que trae de la base de datos.

  dataSource: MatTableDataSource<any>;

  selected = new FormControl(0);

  edit = false;
  valido = false;

  /** Nombres que se mostrarán como encabezado en la tabla.
   * Además deben tener el mismo nombre que los campos de la
   * base de datos.
   * Excepto acciones, que es donde se mostrarán las opciones
   * (editar o eliminar)
   */
  columnas: string[] = [
    'nombre',
    'comentario',
    'acciones'];

  ngOnInit() {
    this.gets(); // Se trae a todos los datos para mostrar en la tabla.
  }

  /**
   * Método que guarda los datos ingresados en la base de datos
   * En el dialog-config puede que se pase el parámetro nombre
   * Pero usted puede modificar a su gusto en el configuracion.components.ts
   * @param nombre identificador (id | usuario | nombre | ...)
   */
  public save(nombre: string) {
    delete this.model.id;
    this.service.save(this.model)
      .subscribe(
        res => {
          this.gets();
          this.selected = new FormControl(0);
          this.resetForm();
          this.mostrarMensaje(res.mensaje, 'Aceptar');
        }, err => this.mostrarMensaje(err.error.mensaje, 'Error')
      );
  }

  gets() {
    this.service.gets().subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res);
        this.models = res;
      }, err => {
        this.mostrarMensaje(err.error.mensaje, 'Error');
      }
    );
  }

  update() {
    this.service.update(this.model.id, this.model).subscribe(
      res => {
        this.gets();
        this.resetForm();
        this.edit = false;
        this.mostrarMensaje(res.mensaje, 'Aceptar');
        this.selected = new FormControl(0);
      },
      err => this.mostrarMensaje(err.error.mensaje, 'Error')
    );
  }

  delete(id: number) {
    this.service.delete(id).subscribe(
      res => {
        this.gets();
        this.mostrarMensaje(res.mensaje, 'Aceptar');
      },
      err => this.mostrarMensaje(err.error.mensaje, 'Error')
    );
  }

  /**
   * Verifica si hay alguna clave (dato) en las columnas
   * de la tabla.
   * @param dato clave del Objeto
   */
  existeThis(dato: string): boolean {
    for (let i of this.columnas) {
      if (i === dato) {
        return true;
      }
    }
    return false;
  }

  /**
   * Se le pasa el modelo que se selecciona en la tabla y se le pasa
   * con un for, al modelo que se está guardando aquí.
   * - Pasa, mode -> this.model
   * @param mode Modelo que se muestra en la tabla
   */
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
      this.cfDgFormControl.reset();
    }
  }

  /**
   * Asigna null a todos los valores del model
   */
  resetForm() {
    for (const key in this.model) {
      if (this.model.hasOwnProperty(key)) {
        this.model[key] = null;
      }
    }
  }

  /**
   * Muestra por 3 segundos un SnackBar conteniendo un mensaje.
   * @param mensaje Mensaje a mostrar en el SnackBar
   * @param action Puede ser Cualquier string, por ejemplo "Aceptar" o "Error"
   */
  mostrarMensaje(mensaje: string, action: string) {
    this._snackBar.open(mensaje == null? "Lo siento, algo salió mal." : mensaje, action, {
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
