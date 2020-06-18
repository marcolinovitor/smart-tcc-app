import { NgModule } from '@angular/core';

import { MenuPage } from './menu.page';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [MenuPage],
    declarations: [MenuPage],
    providers: [],
})
export class MenuModule { }
