import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/shared/session/session.service';
import { Observable } from 'rxjs';
import { MeuVeiculo } from './model/meu-veiculo';
import { env } from 'src/environments/env';
import { IVehicles } from './model/i-veiculos.interface';
import { map } from 'rxjs/operators';
import { FipeModelos } from './model/fipe-modelos.interface';

@Injectable()
export class MeusCarrosService {

    private tipo: string;
    public thereIsNew = false;

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

    getVehicles(tipo: string): Observable<IVehicles[]> {
        this.tipo = tipo;
        const url = `${env.fipe.api}${this.tipo}/marcas`;
        return this.http.get<IVehicles[]>(url)
            .pipe(
                map((res) => {
                    return res.map(item => {
                        return {
                            codigo: item.codigo,
                            nome: item.nome,
                        };
                    });
                })
            );
    }

    getVehiclesName(marca: number): Observable<IVehicles[]> {
        const url = `${env.fipe.api}${this.tipo}/marcas/${marca}/modelos`;
        return this.http.get<FipeModelos>(url)
            .pipe(
                map((cars) => {
                    const list = [];
                    cars.modelos.forEach(car => list.push({ codigo: car.codigo, nome: car.nome }));
                    return list;
                })
            );
    }
    

    removeVeiculo(id: number): Observable<any> {
        return this.http.delete(`${env.api}/Carro/${id}`);
    }

    get cliente() {
        return this.sessionService.getClienteFromSession();
    }
}
