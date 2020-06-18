import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HomeService } from './home.service';
import { MenuModule } from '../shared/menu/menu.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage],
  providers: [
    HomeService,
  ]
})
export class HomePageModule {}
