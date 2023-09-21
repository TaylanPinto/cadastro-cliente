import { ClienteService } from '../services/cliente.service';
import { ClientFee } from '../models/ClientFee';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  styleUrls: ['./cadastro-form.component.css'],
})
export class CadastroFormComponent implements OnInit {
  
  
  public clientFee: ClientFee = new ClientFee();
  configurarFormulario: any;

  public updateTotal() {
    if (this.clientFee?.modelo?.valor && this.clientFee?.quantidade) {
      this.clientFee.total =
        this.clientFee.modelo.valor * this.clientFee.quantidade;
    }
  }

  public ajusteTaxa() {
    if (this.formulario.value.debito <= 1.5) {
      this.formulario.value.debito += 0.8;
    } else {
      this.formulario.value.debito += 0.5;
    }
    if (this.formulario.value.parcelado3 <= 1.5) {
      this.formulario.value.parcelado3 += 0.8;
    } else {
      this.formulario.value.parcelado3 += 0.5;
    }
    if (this.formulario.value.credito <= 1.5) {
      this.formulario.value.credito += 0.8;
    } else {
      this.formulario.value.credito += 0.5;
    }
    if (this.formulario.value.parcelado6 <= 1.5) {
      this.formulario.value.parcelado6 += 0.8;
    } else {
      this.formulario.value.parcelado6 += 0.5;
    }
    if (this.formulario.value.parcelado12 <= 1.5) {
      this.formulario.value.parcelado12 += 0.8;
    } else {
      this.formulario.value.parcelado12 += 0.5;
    }
    this.formulario.value.debito = parseFloat(this.formulario.value.debito.toFixed(2));
    this.formulario.value.parcelado3 = parseFloat(
      this.formulario.value.parcelado3.toFixed(2)
    );
    this.formulario.value.parcelado6 = parseFloat(
      this.formulario.value.parcelado6.toFixed(2)
    );
    this.formulario.value.parcelado12 = parseFloat(
      this.formulario.value.parcelado12.toFixed(2)
    );
  }

  maquinas = [
    { id: '1', nome: 'lio v2', valor: 189.9 },
    { id: '2', nome: 'tli v2', valor: 269.9 },
    { id: '3', nome: 'pio v2', valor: 169.9 },
  ];

  formulario!: FormGroup;

  empresas!: ClientFee[];

  modalRef?: BsModalRef;

  progresso: number = 0

  constructor(
    private modalService: BsModalService, 
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      cpfCnpj: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      razaoSocial: [null, Validators.required],
      telefone: [null, Validators.required],
      faturamento: [null, Validators.required],
      debito: [null, Validators.required],
      credito: [null, Validators.required],
      parcelado3: [null, Validators.required],
      parcelado6: [null, Validators.required],
      parcelado12: [null, Validators.required],
      modelo: [null, Validators.required],
      quantidade: [null, Validators.required],
    });

    this.getEmpresasFee();
    console.log(this.empresas);
  }

  atualizarProgresso (){
    const camposTotais = Object.keys(this.formulario.controls).length;
    const camposPreenchidos = Object.values(this.formulario.controls).filter(control => control.value).length;
    this.progresso = (camposPreenchidos / camposTotais) * 100;
  }

  getEmpresasFee() {
    this.empresas = this.clienteService.getClientFee();
  }

  saveClientFee(formulario: FormGroup) {
    this.clienteService.saveClientFee(this.formulario.value);
    this.modalService.hide();
    this.getEmpresasFee();
    this.formulario.reset();
  }

  verificar(): boolean {
    return this.clientFee.cpfCnpj == null ? true : this.clientFee.cpfCnpj.length < 12 ? true : false;
  }

  getcpfCnpj(): string {
    return this.verificar() ? '000.000.000-009' : '00.000.000/0000-00';
  }



  openModal(template: TemplateRef<any>) {
    this.ajusteTaxa();
    this.modalRef = this.modalService.show(template);
  }
}