import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusCarrosPage } from './meus-carros.page';

const routes: Routes = [
  {
    path: '',
    component: MeusCarrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusCarrosPageRoutingModule {}
