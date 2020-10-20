import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { RolUsuario } from "../../models/RolUsuario";
import { RolUsuarioService } from "../../services/rol-usuario.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-rol-usuario',
  templateUrl: './rol-usuario.component.html',
  styleUrls: ['./rol-usuario.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('editRol', [
      state('editing', style({width: 'max-content', minWidth: 'max-content'})),
      state('edited', style({width: '*'})),
      transition('editing <=> edited', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RolUsuarioComponent implements OnInit {

  // Aqui se almacenarán los datos que se traiga de la base de datos.
  rolesUsuario: any = [];

  // Exportamos el model e igualamos a la variable rolUsuario
  rolUsuario: RolUsuario = {
    id: null,
    rol: null,
    descripcion: null,
    usuario: null,
    administrativo: null,
    proveedor: null,
    bien: null,
    incidente: null,
    tecnico: null,
    mantenimiento: null,
  };

  // Estas serán las columnas que se mostrará en la pantalla
  columnas: string[] = [
    'rol',
    'descripcion',
    'acciones'
  ];

  // Luego de hacer todo intentar con los checks
  dataSource: MatTableDataSource<any>;


  // Variable que dirá se un rol será actualizado
  edit: boolean = true;

  // Propiedades del Rippled
  radius = 50;
  color = 'rgba(31, 68, 112, 0.5)';
  
  constructor(
    private rUsuario: RolUsuarioService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void { this.gets() }

  gets() {
    this.rUsuario.reads().subscribe(
      (res: any) => {
        if(res.mensaje != null) this.openSnackBar(res.mensaje, 'Aceptar');
        this.rolesUsuario = res;
        this.dataSource = new MatTableDataSource(this.rolesUsuario)
      },
      err => this.openSnackBar(err.error.mensaje, 'Error'));
  }

  update(rolUser: RolUsuario) {
    console.log(rolUser);
    this.rUsuario.update(this.rolUsuario.id, this.rolUsuario).subscribe(
      (res:any) => {
        this.gets()
        this.openSnackBar(res.mensaje, 'Aceptar')
      },
      err => this.openSnackBar(err.error.mensaje, 'Error'));
    
    this.edit = false;
  }
  
  eliminar(id: number) {
    this.rUsuario.delete(id).subscribe(
      (res: any) => {
        this.gets()
        console.log(res.mensaje)
        this.openSnackBar(res.mensaje, 'Aceptar')
      },
      err => this.openSnackBar(err.error.mensaje, 'Error'))
  }

  /**
   * Le pasamos un objeto JSON y su clave y nos retornará su valor
   * @param objeto string que será convertido a JSON
   * @param key clave del JSON convertido
   */
  parseElementToJson(objeto: string, key: string) {
    let obj: JSON = JSON.parse(objeto);
    return obj[key];
  }

  /**
   * le pasamos un entero y nos retornará un valor para cada uno de ellos
   * por ejemplo si le pasamos "0" nos retornará "No" en cualquier otro caso
   * nos retornará un string vacío.
   * @param permiso Este valor puede ser un; 0 | 1 | 2
   */
  convertir(permiso: any, ): string {
    if(permiso == 0){
      return 'No';
    }else if( permiso == 1){
      return 'Si';
    }else if(permiso == 2){
      return 'Si, para todos';
    }
    return '';
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBar(mensaje: any, accion: any) {
    this._snackBar.open(mensaje, accion, {
      duration: 2000,
    })
  }

}

@Component({
  selector: 'rol-usuario-dialog',
  templateUrl: './rol-usuario-dialog.component.html',
})
export class RolUsuarioDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RolUsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}