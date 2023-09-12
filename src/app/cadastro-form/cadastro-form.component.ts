import { ClienteService } from '../services/cliente.service';
import { ClientFee } from '../models/ClientFee';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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
    if (this.clientFee.debito <= 1.5) {
      this.clientFee.debito += 0.8;
    } else {
      this.clientFee.debito += 0.5;
    }
    if (this.clientFee.parcelado3 <= 1.5) {
      this.clientFee.parcelado3 += 0.8;
    } else {
      this.clientFee.parcelado3 += 0.5;
    }
    if (this.clientFee.parcelado6 <= 1.5) {
      this.clientFee.parcelado6 += 0.8;
    } else {
      this.clientFee.parcelado6 += 0.5;
    }
    if (this.clientFee.parcelado12 <= 1.5) {
      this.clientFee.parcelado12 += 0.8;
    } else {
      this.clientFee.parcelado12 += 0.5;
    }
    this.clientFee.debito = parseFloat(this.clientFee.debito.toFixed(2));
    this.clientFee.parcelado3 = parseFloat(
      this.clientFee.parcelado3.toFixed(2)
    );
    this.clientFee.parcelado6 = parseFloat(
      this.clientFee.parcelado6.toFixed(2)
    );
    this.clientFee.parcelado12 = parseFloat(
      this.clientFee.parcelado12.toFixed(2)
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

  constructor(
    private modalService: BsModalService,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder 
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      cpfCnpj: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      razao: [null, Validators.required],
      telefone: [null, Validators.required],
      faturamento: [null, Validators.required],
      debito: [null, Validators.required],
      credito: [null, Validators.required],
      parcelado3: [null, Validators.required],
      parcelado6: [null, Validators.required],
      parcelado12: [null, Validators.required],
      model: [null, Validators.required],
      quantidade: [null, Validators.required],
    });

    this.getEmpresasFee();
    console.log(this.empresas);
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
    return this.clientFee.cpfCnpj == null
      ? true
      : this.clientFee.cpfCnpj.length < 12
      ? true
      : false;
  }

  getcpfCnpj(): string {
    return this.verificar() ? '000.000.000-009' : '00.000.000/0000-00';
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.ajusteTaxa();
  }
}