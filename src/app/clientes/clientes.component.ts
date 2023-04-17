import { ClienteService } from './../services/cliente.service';
import { ClientFee } from './../models/ClientFee';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})


export class ClientesComponent implements OnInit {

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


  empresas!: ClientFee [] 
  

  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private clienteService: ClienteService) {}



  ngOnInit() {
    this.getEmpresasFee()
    console.log(this.empresas)
  }
 
  getEmpresasFee(){
    this.empresas = this.clienteService.getClientFee()
  }

  saveClientFee(){
    this.clienteService.saveClientFee(this.clientFee)
    this.modalService.hide();
    this.getEmpresasFee()
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}


