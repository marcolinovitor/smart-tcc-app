import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerguntasResponse, Alternativa } from './models/perguntas.interface';
import { PreAberturaResponse } from './models/abertura-os.interface';
import { tap } from 'rxjs/operators';
import { SessionService } from '../shared/session/session.service';
import { env } from 'src/environments/env';
import { MeuVeiculo } from '../meus-carros/model/meu-veiculo';

@Injectable()
export class SolicitacaoService {

    private nomeCliente = '';

    constructor(
        private readonly http: HttpClient,
        private readonly sessionService: SessionService
    ) {
        this.nomeCliente = this.sessionService.getClienteFromSession().nome;
    }

    inicializarPerguntas(hasVeiculo: boolean): Observable<PerguntasResponse> {
        return this.http.get<PerguntasResponse>(`${env.api}/Perguntas/IniciarQuestionario`)
            .pipe(
                tap(result => {
                    if (hasVeiculo) {
                        result.pergunta = result.pergunta.replace('Olá', `Hmmm, certo`);
                    }
                })
            );
    }

    proximaPergunta(id): Observable<PerguntasResponse> {
        return this.http.get<PerguntasResponse>(`${env.api}/Perguntas/CarregarPergunta/${id}`);
    }

    abrirPreOrdem(preId, idCarro): Observable<PreAberturaResponse> {
        return this.http.get<PreAberturaResponse>(`${env.api}/Perguntas/CarregarPreAbertura/${preId}/${idCarro}`);
    }

    montarVeiculosChat(veiculos: MeuVeiculo[]) {
        return new PerguntasResponse().setVeiculos(veiculos, this.nomeCliente);
    }

    sugerirCadastro() {
        return new PerguntasResponse().setSegurirCadastro();
    }

    
}
