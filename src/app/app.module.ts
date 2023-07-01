import { LOCALE_ID, DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientesComponent } from './clientes/clientes.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';

import localePt from '@angular/common/locales/pt';
import { IConfig, NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CadastroFormComponent } from './cadastro-form/cadastro-form.component';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    CadastroFormComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    CommonModule,
    FormsModule,
    NgxMaskDirective,
    
  ],

  providers: [
    provideNgxMask(maskConfigFunction),
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
