import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ExportarService } from "../../services/exportar.service";
//declare let jsPDF;

import { UsuarioService } from "../../services/usuario.service";
import { AdminsitrativoFilterService } from '../../services/adminsitrativofilter.service';
import { ResponsableService } from "../../services/responsable.service";
import { TecnicoService } from "../../services/tecnico.service";
import { ProveedorFilterService } from "../../services/proveedorfilter.service";
import { BienService } from "../../services/bien.service";
import { IncidenteService } from "../../services/incidente.service";
import { MantenimientoService } from "../../services/mantenimiento.service";

/*
var doc = new jsPDF('p', 'pt');
var elem = document.getElementById("basic-table");
var res = doc.autoTableHtmlToJson(elem);
doc.autoTable(res.columns, res.data);
doc.save("table.pdf");
*/

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {

  opciones: string[] = [
    'Usuario',
    'Administrativo',
    'Responsable',
    'Tecnico',
    'Proveedor',
    'Bien',
    'Incidente',
    'Mantenimiento'
  ];

  seleccion: string = null;
  exportExcel: string = null;

  constructor(
    private exService: ExportarService,
    private adService: AdminsitrativoFilterService,
    private usuario: UsuarioService,
    private respoService: ResponsableService,
    private tecService: TecnicoService,
    private provService: ProveedorFilterService,
    private bienService: BienService,
    private inciService: IncidenteService,
    private mantService: MantenimientoService,
    private snackBar: MatSnackBar) { }

  ngOnInit() { }

  exportar() {

    if (this.exportExcel == null)
      this.snackBar.open("Selecciona un formato", "Aviso", { duration: 3000 })

    if (this.seleccion == null)
      this.snackBar.open("Selecciona los datos a exportar", "Aviso", { duration: 3000 })


    switch (this.seleccion) {

      case 'Usuario':
        this.obtenerUsuario();
        break;
      case 'Administrativo':
        this.obtenerAdmins();
        break;
      case 'Responsable':
        this.obtenerResponsable();
        break;
      case 'Tecnico':
        this.obtenerTecnico();
        break;
      case 'Proveedor':
        this.obtenerProveedor();
        break;
      case 'Bien':
        this.obtenerBien();
        break;
      case 'Incidente':
        this.obtenerIncidente();
        break;
      case 'Mantenimiento':
        this.obtenerMantenimiento();
        break;
    }
  }

  excelOPdf(datos: any[]) {
    if (this.exportExcel == 'pdf') {
      this.exService.exportarAPDF(datos, this.seleccion);
    } else if (this.exportExcel == 'excel') {
      this.exService.exportarAExcel(datos, this.seleccion);
    }
  }

  obtenerAdmins() {
    this.adService.getAdministrativos().subscribe(
      (res: any[]) => this.excelOPdf(res),
      err => this.snackBar.open(err.error.mensaje, "Error", { duration: 3000 })
    );
  }

  obtenerUsuario() {
    this.usuario.gets().subscribe(
      (res: any[]) => this.excelOPdf(res),
      err => this.snackBar.open(err.error.mensaje, "Error", { duration: 3000 })
    )
  }

  obtenerResponsable() {
    this.respoService.gets().subscribe(
      (res: any[]) => this.excelOPdf(res),
      err => this.snackBar.open(err.error.mensaje, "Error", { duration: 3000 })
    )
  }

  obtenerTecnico() {
    this.tecService.leerTodos().subscribe(
      (res: any[]) => this.excelOPdf(res),
      err => this.snackBar.open(err.error.mensaje, "Error", { duration: 3000 })
    )
  }

  obtenerProveedor() {
    this.provService.getProveedores().subscribe(
      (res: any[]) => this.excelOPdf(res),
      err => this.snackBar.open(err.error.mensaje, "Error", { duration: 3000 })
    )
  }

  obtenerBien() {
    this.bienService.gets().subscribe(
      (res: any[]) => this.excelOPdf(res),
      err => this.snackBar.open(err.error.mensaje, "Error", { duration: 3000 })
    )
  }

  obtenerIncidente() {
    this.inciService.leerTodos().subscribe(
      (res: any[]) => this.excelOPdf(res),
      err => this.snackBar.open(err.error.mensaje, "Error", { duration: 3000 })
    )
  }

  obtenerMantenimiento() {
    this.mantService.leerTodos().subscribe(
      (res: any[]) => this.excelOPdf(res),
      err => this.snackBar.open(err.error.mensaje, "Error", { duration: 3000 })
    )
  }
}
