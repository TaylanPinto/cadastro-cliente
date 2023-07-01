import { ClientesComponent } from './clientes/clientes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroFormComponent } from './cadastro-form/cadastro-form.component';

const routes: Routes = [{path:'',component: ClientesComponent},
{path:'cadastro',component: CadastroFormComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
