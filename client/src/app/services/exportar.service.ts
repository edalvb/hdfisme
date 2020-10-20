import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

const EXCEL_TYPE =
  'aplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';

const EXCEL_EXT = '.xlsx';

@Injectable()
export class ExportarService {

  exportarAExcel(datos: any[], nombre: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datos);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // llama al metodo buffer y el nombre
    this.guardarComoExcel(excelBuffer, nombre);
  }

  exportarAPDF(res: any[], nombre: string): void {
    let doc = new jsPDF();
    let conta = 0;
    let columna = [];
    let datos = [];
    let elem = [];

    res.forEach(elemento => {
      for (const clave in elemento) {
        if (elemento.hasOwnProperty(clave)) {
          const dato = elemento[clave];
          elem.push(dato)
        }
        if (conta == 0)
          columna.push(clave);
      }
      datos.push(elem);
      elem = [];
      conta++;
    });

    doc.autoTable(columna, datos);
    doc.save(this.nombreArchivo(nombre, '.pdf'));
  }

  private guardarComoExcel(buffer: any, nombre: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, this.nombreArchivo(nombre, EXCEL_EXT));
  }

  private nombreArchivo(nombre: string, extension: string): string {
    let fecha = new Date()

    return nombre + ' (' + (
      fecha.getFullYear() + '-' +
      (fecha.getMonth() + 1 ) +'-' +
      fecha.getUTCDate() + ' ' +
      fecha.getHours() + '-' +
      fecha.getMinutes() + '-' +
      fecha.getSeconds()) + ')' +
      extension;
  }

}
