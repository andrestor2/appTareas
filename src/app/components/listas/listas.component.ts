import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;
  @ViewChild(IonList, { static: false }) listaDesplegada: IonList;
  constructor(
    public deseosService: DeseosService,
    public router: Router,
    private alertCtrl: AlertController) { }

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

  async editarNombreLista(lista: Lista) {
    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'nuevoNombre',
          type: 'text',
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.listaDesplegada.closeSlidingItems();
          }
        },
        {
          text: 'Modificar',
          handler: (data) => {
            this.listaDesplegada.closeSlidingItems();
            this.editarNombre(data.nuevoNombre, lista);
          }
        }
      ]
    });

    alert.present();
  }

  editarNombre(nombreLista: string, lista: Lista) {
    if (nombreLista.length > 0) {
      this.deseosService.editarNombre(nombreLista, lista);
    }
  }
}
