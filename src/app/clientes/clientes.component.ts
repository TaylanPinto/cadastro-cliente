import { ClienteService } from './../services/cliente.service';
import { ClientFee } from './../models/ClientFee';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {

  public clientFee: ClientFee = new ClientFee();

  public updateTotal() { 
    if (this.clientFee?.modelo?.valor && this.clientFee?.quantidade) {
      this.clientFee.total = this.clientFee.modelo.valor * this.clientFee.quantidade
    }
  };

  

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

  empresas!: ClientFee []; 
  
  modalRef?: BsModalRef;

  constructor (private modalService: BsModalService, 
    private clienteService: ClienteService
    ) {}



  ngOnInit() {
    this.getEmpresasFee()
    console.log(this.empresas)
  }
 
  getEmpresasFee(){
    this.empresas = this.clienteService.getClientFee()
  }

 saveClientFee(form: Form){
   this.clienteService.saveClientFee(this.clientFee)
   this.modalService.hide();
   this.getEmpresasFee()
  }

  
  verificar(): boolean{
    return this.clientFee.cpfCnpj == null ? true : this.clientFee.cpfCnpj.length < 12 ? true : false;
  }
  getcpfCnpj(): string{
    return this.verificar() ? '000.000.000-009' : '00.000.000/0000-00';
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}