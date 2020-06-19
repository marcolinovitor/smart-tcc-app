import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HomeService } from './home.service';
import { IOrcamentoList } from './models/orcamento-list.interface';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    render = false;
    ordens = new Array<IOrcamentoList>();
    submitting: boolean;

    constructor(
        private menu: MenuController,
        private homeService: HomeService
    ) { }

    ngOnInit() {
        this.getAll();
    }

    getAll() {
        this.render = false;
        this.homeService.getOrcamentos()
            .subscribe((osList) => {
                this.ordens = osList;
                this.ordens.map(order => order.updating = false);
            }, () => {
                //
            }, () => {
                this.render = true;
            });
    }

    aprovarOrcamento(i: number, status: number, aprovar: boolean) {
        this.changeStatus(i);
        const ref = this.ordens[i].referencia;
        this.submitting = true;
        this.homeService.aprovarOrcamento(ref, status, aprovar)
            .subscribe((updated) => {
                if (updated) {
                    this.ordens[i].aprovacao = updated.aprovado;
                    this.ordens[i].status = updated.status;
                    this.changeStatus(i);
                }
            });
    }

    changeStatus(i: number) {
        this.ordens[i].updating = !this.ordens[i].updating;
    }

    status(id: number) {
        return this.homeService.statusOs(id);
    }

    totalValue(os: IOrcamentoList): number {
        let total = 0;
        total = os.servicos.reduce((a, b) => a + b.valorServico, 0);
        return total;
    }


}
