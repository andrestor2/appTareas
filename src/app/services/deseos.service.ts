import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  public listas: Lista[] = [];

  constructor() {
    this.cargarStorage();
  }

  crearLista(titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();

    return nuevaLista.id;
  }

  obtenerLista(id: string | number) {
    id = Number(id);
    return this.listas.find(lista => lista.id === id);

  }
  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage() {
    const data = localStorage.getItem('data');

    if (data) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    }
  }

  eliminarLista(lista: Lista) {
    this.listas =
      this.listas.filter(listaData => listaData.id !== lista.id);
    this.guardarStorage();
  }

  editarNombre(nombreLista: string, lista: Lista) {
    lista.titulo = nombreLista;
    this.guardarStorage();
  }
}
