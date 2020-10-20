import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalBienes: any;
  totalAdministrativos: any;
  totalProveedores: any;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.getEquipos();
    this.getAdministrativos();
    this.getProveedores();
  }

  getEquipos() {
    this.homeService.getBienes().subscribe(
      res => {
        this.totalBienes = res;
      },
      err => console.log(err)
    );
  }

  getAdministrativos() {
    this.homeService.getAdministrativos().subscribe(
      res => {
        this.totalAdministrativos = res;
      },
      err => console.log(err)
    );
  }

  getProveedores() {
    this.homeService.getProveedores().subscribe(
      res => {
        this.totalProveedores = res;
      },
      err => console.log(err)
    );
  }

}
