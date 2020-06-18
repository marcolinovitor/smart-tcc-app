import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/shared/session/session.service';
import { Observable } from 'rxjs';
import { MeuVeiculo } from './model/meu-veiculo';
import { env } from 'src/environments/env';

@Injectable()
export class MeusCarrosService {

    constructor(
        private readonly http: HttpClient,
        private readonly sessionService: SessionService,
    ) { }

    getClienteVeiculos(): Observable<MeuVeiculo[]> {
        const email = this.cliente.email;
        return this.http.get<MeuVeiculo[]>(`${env.api}/Carro/BuscarCarrosPorEmail/${email}`);
    }

    cadastrarVeiculo(veiculo): Observable<MeuVeiculo> {
        const body = {
            placa: veiculo.placa.toUpperCase(),
            modelo: veiculo.modelo,
            marca: veiculo.marca,
            clienteId: this.cliente.id,
        };
        return this.http.post<MeuVeiculo>(`${env.api}/Carro`, body);
    }

    removeVeiculo(id: number): Observable<any> {
        return this.http.delete(`${env.api}/Carro/${id}`);
    }

    get cliente() {
        return this.sessionService.getClienteFromSession();
    }
}
