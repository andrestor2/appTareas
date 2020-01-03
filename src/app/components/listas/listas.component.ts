import { Component, OnInit, Input } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;

  constructor(
    public deseosService: DeseosService,
    public router: Router) { }

  ngOnInit() {
    this.deseosService.cargarStorage();
  }

  listaSeleccionada(lista: Lista) {
    if (this.terminada) {
      this.router.navigate([`/tabs/tab2/agregar/${lista.id}`]);
    } else {
      this.router.navigate([`/tabs/tab1/agregar/${lista.id}`]);
    }
  }

  eliminarLista(lista: Lista) {
    this.deseosService.eliminarLista(lista);
  }

}
