import { ClientFee } from './../models/ClientFee';
import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})


export class ClientesComponent {

  public clientFee: ClientFee = new ClientFee()

  public updateTotal() { 
    if (this.clientFee?.modelo?.valor && this.clientFee?.quantidade) {
      this.clientFee.total = this.clientFee.modelo.valor * this.clientFee.quantidade
    }
  } 


 maquinas = [
  { id: "1",
    nome: "lio v2", 
    valor: 189.90},

  { id:"2",
    nome: "tli v2",
    valor: 269.90},

  { id:"3",
    nome: "pio v2",
    valor: 169.90},
 ];


  empresas = [
    {cpfCnpj: '00000000000', 
    razaoSocial: 'empresaRaioDeSol',
    telefone: '48 0000000000',
    email: 'email@email.com'},

    {cpfCnpj: '00000000000', 
    razaoSocial: 'empresaRaioDeSol',
    telefone: '48 0000000000',
    email: 'email@email.com'},

    {cpfCnpj: '00000000000', 
    razaoSocial: 'empresaRaioDeSol',
    telefone: '48 0000000000',
    email: 'email@email.com'}
  ];
  

  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) {}
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}


