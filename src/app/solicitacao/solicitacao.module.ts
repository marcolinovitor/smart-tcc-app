import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitacaoRoutingModule } from './solicitacao-routing.module';
import { SolicitacaoComponent } from './solicitacao.component';
import { MenuModule } from '../shared/menu/menu.module';
import { SolicitacaoService } from './solicitacao.service';
import { MeusCarrosService } from '../meus-carros/meus-carros.service';
import { ChatPage } from './chat/chat.page';


@NgModule({
    declarations: [
        SolicitacaoComponent,
        ChatPage,
    ],
    imports: [
        CommonModule,
        MenuModule,
        SolicitacaoRoutingModule
    ],
    providers: [SolicitacaoService, MeusCarrosService]
})
export class SolicitacaoModule { }
