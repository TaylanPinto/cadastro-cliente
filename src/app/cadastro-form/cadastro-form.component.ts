import { ClienteService } from '../services/cliente.service';
import { ClientFee } from '../models/ClientFee';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  styleUrls: ['./cadastro-form.component.css']
})

export class CadastroFormComponent implements OnInit  {
  [x: string]: any;
  
  public clientFee: ClientFee = new ClientFee();
  
  public updateTotal() { 
    if (this.clientFee?.modelo?.valor && this.clientFee?.quantidade) {
      this.clientFee.total = this.clientFee.modelo.valor * this.clientFee.quantidade
    }
  };
    
  public ajusteTaxa(){  
    this.clientFee.debito = parseFloat(String(this.clientFee.debito));
    this.clientFee.parcelado3 = parseFloat(String(this.clientFee.parcelado3));
    this.clientFee.parcelado6 = parseFloat(String(this.clientFee.parcelado6));
    this.clientFee.parcelado12 = parseFloat(String(this.clientFee.parcelado12));
    if(this.clientFee.debito <= 2 ){
      this.clientFee.debito = this.clientFee.debito + 0.5
    } 
    if(this.clientFee.parcelado3 <= 2 ){
      this.clientFee.parcelado3 = this.clientFee.parcelado3 + 0.5
    } 
    if(this.clientFee.parcelado6 <= 2 ){
      this.clientFee.parcelado6 = this.clientFee.parcelado6 + 0.5
    } 
    if(this.clientFee.parcelado12 <= 2 ){
      this.clientFee.parcelado12 = this.clientFee.parcelado12 + 0.5
    } 
    // console.log(this.ajusteTaxa)
  };

 maquinas = [
  { id: "1",
    nome: "lio v2", 
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
    ) {  }

  ngOnInit() {
    this.getEmpresasFee();
    console.log(this.empresas);
  }
 
  getEmpresasFee(){
    this.empresas = this.clienteService.getClientFee();
  }

  saveClientFee(form: Form){
    this.ajusteTaxa();
    this.clienteService.saveClientFee(this.clientFee)
    this.modalService.hide();
    this.getEmpresasFee();
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
