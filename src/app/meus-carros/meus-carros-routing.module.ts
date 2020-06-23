import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusCarrosPage } from './meus-carros.page';
import { CarroFormPage } from './carro-form/carro-form.page';

const routes: Routes = [
  {
    path: '',
    component: MeusCarrosPage
  },
  {
    path: 'carro-form',
    component: CarroFormPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusCarrosPageRoutingModule {}
