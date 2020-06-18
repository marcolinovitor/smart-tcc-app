import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusCarrosPageRoutingModule } from './meus-carros-routing.module';

import { MeusCarrosPage } from './meus-carros.page';
import { MenuModule } from '../shared/menu/menu.module';
import { MeusCarrosService } from './meus-carros.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuModule,
    MeusCarrosPageRoutingModule
  ],
  declarations: [MeusCarrosPage],
  providers: [MeusCarrosService]
})
export class MeusCarrosPageModule {}
