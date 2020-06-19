import { Injectable } from '@angular/core';
import { SessionService } from '../shared/session/session.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { env } from 'src/environments/env';
import { IOrcamentoList } from './models/orcamento-list.interface';

@Injectable()
export class HomeService {

    constructor(
        private readonly session: SessionService,
        private readonly http: HttpClient,
    ) { }

    getOrcamentos(): Observable<IOrcamentoList[]> {
        const doc = this.session.getFromSession().clientDocument;
        return this.http.get<IOrcamentoList[]>(`${env.api}/ordemservico/buscarpordocumento/${doc}`)
            .pipe(
                catchError(err => throwError(null))
            );
    }

    aprovarOrcamento(ref: string, st: number, aprovar: boolean): Observable<{ aprovado: boolean, status: number }> {
		const update = { aprovacao: aprovar, status: st };
		return this.http.patch<IOrcamentoList>(`${env.api}/ordemservico/atualizarstatus/${ref}`, update)
			.pipe(
				map(os => {
					return {
						aprovado: os.aprovacao,
						status: os.status
					}
				}),
				catchError(err => throwError(undefined))
			);
	}

    statusOs(id: number) {
        switch (id) {
			case 1: return {
				status: 'Pendente',
				classBadge: 'warning',
				classBorder: 'border-warning',
			}
			case 2: return {
				status: 'Aprovado',
				classBadge: 'success',
                classBorder: 'border-success',
                btnClass: 'btn-success'
			}
			case 3: return {
				status: 'Reprovado',
				classBadge: 'danger',
				classBorder: 'border-danger',
			}
			case 4: return {
				status: 'Em andamento',
				classBadge: 'secondary',
                classBorder: 'border-info',
                btnClass: 'btn-info'
            }
            case 5: return {
                status: 'Finalizado',
				classBadge: 'dark',
				classBorder: 'border-dark',
            }
			default: return {
				status: 'Indisponível',
				classBadge: 'light',
				classBorder: 'border-light',
			}
		}
    }
}
