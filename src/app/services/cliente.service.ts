import { ClientesComponent } from './../clientes/clientes.component';
import { ClientFee } from './../models/ClientFee';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { 
  
  }
 
  public saveClientFee(clientFee: ClientFee){
    const clientFeeSalvas = this.getClientFee()
    clientFeeSalvas.push(clientFee)
    localStorage.setItem('clientFee', JSON.stringify(clientFeeSalvas));

  }

  public getClientFee(): Array<ClientFee>  {
    const jsonString = localStorage.getItem('clientFee') || '[]';
    return JSON.parse(jsonString);

  
  }
}
