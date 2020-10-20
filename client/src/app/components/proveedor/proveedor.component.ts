import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProveedorService } from '../../services/proveedor.service';
import { ProveedorFilterService } from '../../services/proveedorfilter.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})

export class ProveedorComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  proveedor: any = {
    idpersona: null,
    fechanacimiento: null,
    email: null,
    direccion: null,
    celular: null,
    telefono: null,
    RUC: null,
    razon_social: null,
    rubro: null
  };

  edit = false;

  constructor(
    private proService: ProveedorService,
    private adFilService: ProveedorFilterService,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const param = this.activatedRoute.snapshot.params;
    if (param.id) {
      this.adFilService.getProveedor(param.id).subscribe(
        (res: any) => {
          console.log(res);
          this.proveedor = res;
          this.edit = true;
        },
        err => console.log(err)
      );
    }
  }

  saveProveedor() {
    this.proService.saveproveedor([
      this.proveedor.fechanacimiento,
      this.proveedor.email,
      this.proveedor.direccion,
      this.proveedor.celular,
      this.proveedor.telefono,
      this.proveedor.RUC,
      this.proveedor.razon_social,
      this.proveedor.rubro
    ]).subscribe(
      (res) => {
        this.route.navigate(['/proveedor']);
      },
      err => console.log(err)
    );
  }

  updateProveedor() {
    delete this.proveedor.fecha_creacion;
    this.proService.updateproveedor([
      this.proveedor.idpersona,
      this.proveedor.fechanacimiento,
      this.proveedor.email,
      this.proveedor.direccion,
      this.proveedor.celular,
      this.proveedor.telefono,
      this.proveedor.RUC,
      this.proveedor.razon_social,
      this.proveedor.rubro
    ]).subscribe(
      res => {
        this.route.navigate(['/proveedor']);
      },
      err => console.log(err)
    );
  }

}
