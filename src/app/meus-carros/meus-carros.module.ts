import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusCarrosPageRoutingModule } from './meus-carros-routing.module';

import { MeusCarrosPage } from './meus-carros.page';
import { MenuModule } from '../shared/menu/menu.module';
import { MeusCarrosService } from './meus-carros.service';
import { CarroFormPage } from './carro-form/carro-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuModule,
    MeusCarrosPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [MeusCarrosPage, CarroFormPage],
  providers: [MeusCarrosService]
})
export class MeusCarrosPageModule {}
