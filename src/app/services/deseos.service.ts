import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  public listas: Lista[] = [];

  constructor() {
    console.log('Servicio inicializado');
  }
}
