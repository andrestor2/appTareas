import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';

  constructor(
    private deseosService: DeseosService,
    private route: ActivatedRoute
  ) {
    const listaId = this.route.snapshot.paramMap.get('listaId');
    this.lista = this.deseosService.obtenerLista(listaId);
  }

  ngOnInit() {
  }

  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = '';
    this.deseosService.guardarStorage();
  }

  cambioCheck(item) {
    if (this.cantidadItemsPendientes() === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      if (this.lista.terminada) {
        this.lista.terminadaEn = null;
        this.lista.terminada = false;
      }
    }
    this.deseosService.guardarStorage();
  }

  cantidadItemsPendientes() {
    const pendiente = this.lista.items.filter(itemData => !itemData.completado);
    return pendiente.length;
  }
}
