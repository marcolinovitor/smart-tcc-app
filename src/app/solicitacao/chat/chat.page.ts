import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { PerguntasResponse, Alternativa } from '../models/perguntas.interface';

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.page.html',
    styleUrls: ['chat.page.scss']
})

export class ChatPage implements OnInit {

    selected = false;
    @Input() pergunta: PerguntasResponse;
    @Output() escolha = new EventEmitter<Alternativa>();
    @Output() novoAtend = new EventEmitter<boolean>();
    @Output() novoCarro = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() { }

    setAlternativa(id) {
        this.selected = true;
        const alternativa = this.pergunta.alternativas.find(f => f.id == id);        
        this.escolha.emit(alternativa);
    }

    cadastrar() {
        this.novoCarro.emit(true);
    }

    novoAtendimento() {
        this.novoAtend.emit(true);
    }

    finalizar() {
        this.novoAtend.emit(false);
    }
}