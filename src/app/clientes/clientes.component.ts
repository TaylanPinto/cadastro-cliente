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
  [x: string]: any;
  
  empresas!: ClientFee []; 
  
  modalRef?: BsModalRef;

  constructor (private modalService: BsModalService, 
    private clienteService: ClienteService
    ) {  }

  ngOnInit() {
    this.getEmpresasFee();
    console.log(this.empresas);
  }
 
  getEmpresasFee(){
    this.empresas = this.clienteService.getClientFee();
  }
}