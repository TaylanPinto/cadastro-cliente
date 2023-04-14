import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})


export class ClientesComponent {

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


