import { Component, AfterViewChecked, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { MensajeService } from "../../../services/mensaje.service";
import { TodosDestinatario, MensajeDestinatario, UltimosMensajes } from "../../../models/Mensaje";

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})

export class MensajeComponent implements AfterViewChecked {

  public modo: string = 'side';
  public has_backdrop: boolean;

  /** Dice si se ha presionado lagún boton de alguna conversación
   * de lo contrario no se mostrará el contenido de los mensajes.
   */
  primerMensaje: boolean = false;

  renderizo: boolean = false;

  nuevoMensaje: boolean = false;

  fcMmensaje = new FormControl('');

  // Modelo que almacena el destinatario al que será enviado un mensaje,
  destinatario: TodosDestinatario = {
    idusuario: null,
    nombre: null
  };

  /** Array que contiene los mensajes */
  mensajes: MensajeDestinatario[] = [];

  columnas: string[] = ['mensajes'];

  dataSource: MatTableDataSource<any>;

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public mService: MensajeService,
    public breakpointObserver: BreakpointObserver) {
    this.obtenerUltimosMensajes();
  }

  ngAfterViewChecked() {

    /*this.breakpointObserver
      .observe(['(max-width:600px) and (min-width:300px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.modo = 'over';
        } else {
          this.modo = 'side';
        }
      });*/

    if (this.primerMensaje) {
      let messages = document.getElementById(`contenido-mensajes`);

      if (messages.scrollTop != messages.scrollHeight && this.renderizo == true) {
        messages.scrollTop = messages.scrollHeight;
        this.renderizo = false;
      }
    }
  }

  obtenerDiaHora(fecha: Date | null, fecha_larga: boolean = false): string {
    let fec = this.parseFecha(fecha);
    let meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    let diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
    let fechaLarga = diasSemana[fec.getDay()] + ", " + fec.getDate() + " de " + meses[fec.getMonth()] + " de " + fec.getFullYear() + " a las " + fec.getHours() + ":" + fec.getMinutes()
    let fechaCorta = diasSemana[fec.getDay()] + ", " + fec.getDate() + " de " + meses[fec.getMonth()] + " a las " + fec.getHours() + ":" + fec.getMinutes()
    return fecha_larga ? fechaLarga : fechaCorta;
  }

  parseFecha(value: any): Date | null {
    if ((typeof value === 'string') && (value.includes('/'))) {
      const str = value.split('/');

      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const date = Number(str[0]);

      return new Date(year, month, date);
    } else if ((typeof value === 'string') && value === '') {
      return new Date();
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }


  obtenerUltimosMensajes() {
    this.mService.obtenerMisUltimosMensajes().subscribe(
      (res: UltimosMensajes[]) => {
        this.dataSource = new MatTableDataSource(res);
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    );
  }

  leerMisMensajesCon(iddestinatario: number, nombre?: string) {
    if (nombre != null) {
      this.destinatario.idusuario = iddestinatario;
      this.destinatario.nombre = nombre;
    }

    this.mService.leerMisMensajesCon(iddestinatario).subscribe(
      (res: any) => {
        this.mensajes = res;
        this.renderizo = true;
        this.primerMensaje = true;
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    );
  }

  nuevoMensajeCon() {
    this.mService.nuevoMensajeCon({ "destinatario": this.destinatario.idusuario, "mensaje": this.fcMmensaje.value }).subscribe(
      (res: any) => {
        this.leerMisMensajesCon(this.destinatario.idusuario);
        this.obtenerUltimosMensajes();
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    );
    this.fcMmensaje.setValue(null);
  }

  borrarMensaje(idMensaje: number) {
    this.mService.borrarMensaje(idMensaje).subscribe(
      (res: any) => {
        this.leerMisMensajesCon(this.destinatario.idusuario);
        this.obtenerUltimosMensajes();
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    );
  }

  openDestinatario() {
    this.openDialog(MensajeDestinatarioDialogComponent);
  }

  private openDialog(componentDialog: any, ancho?: string, alto?: string): void {
    const dialogRef = this.dialog.open(componentDialog, {
      width: ancho == null ? '600px' : ancho,
      height: alto == null ? '500px' : alto,
      data: { nuevoMensaje: this.nuevoMensaje, destinatario: this.destinatario }
    });

    dialogRef.afterClosed().subscribe(destSeleccionado => {
      if (destSeleccionado != undefined) {
        this.nuevoMensaje = true; // Cambia a true porque ya se envió un destinatario para que se envie un mensaje al mismo.
        this.destinatario = destSeleccionado;
        this.leerMisMensajesCon(this.destinatario.idusuario);
      }
    });
  }

  mostrarMensaje(mensaje: string, accion: string) {
    this.snackBar.open(mensaje == null ? 'No pude mostrar el mensaje original.' : mensaje, accion, { duration: 3000 })
  }

  buscarMain(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

@Component({
  selector: 'app-mensaje-destinatario-dialog',
  templateUrl: './mensaje-destinatario-dialog.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeDestinatarioDialogComponent {

  columnas: string[] = [
    'destinatario'
  ]

  dataSource: MatTableDataSource<TodosDestinatario>;

  constructor(
    private snackBar: MatSnackBar,
    private mensajeService: MensajeService,
    public dialogRef: MatDialogRef<MensajeDestinatarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public destSeleccionado: { nuevoMensaje: boolean, destinatario: TodosDestinatario }) { }

  ngOnInit(): void {
    this.mensajeService.leerTodosDestinatarios().subscribe(
      (res: TodosDestinatario[]) => {
        this.dataSource = new MatTableDataSource(res);
      }, e => this.mostrarMensaje(e.error.mensaje, "Error")
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  mostrarMensaje(mensaje: string, accion: string) {
    this.snackBar.open(mensaje == null ? 'No pude mostrar el mensaje original.' : mensaje, accion, { duration: 3000 })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}