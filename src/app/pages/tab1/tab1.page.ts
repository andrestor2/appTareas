import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listas: Lista[] = [];

  constructor(
    private deseosService: DeseosService,
    public router: Router,
    private alertCtrl: AlertController) {

    this.listas = deseosService.listas;
  }

  async agregarLista() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'Titulo',
          type: 'text',
          placeholder: 'Nombe de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            this.validarNombreLista(data.Titulo);
          }
        }
      ]
    });

    alert.present();
  }

  validarNombreLista(titulo) {
    if (titulo === 0) {
      return;
    } else {
      const listaId = this.deseosService.crearLista(titulo);
      this.router.navigate([`/tabs/tab1/agregar/${listaId}`]);
    }
  }

  listaSeleccionada(lista: Lista) {
    this.router.navigate([`/tabs/tab1/agregar/${lista.id}`]);
  }
}
