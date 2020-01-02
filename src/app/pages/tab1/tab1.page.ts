import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listas: Lista[] = [];

  constructor(
    public deseosService: DeseosService,
    public router: Router) {

    this.listas = deseosService.listas;
  }

  agregarLista() {
    this.router.navigate(['/tabs/tab1/agregar']);
  }
}
