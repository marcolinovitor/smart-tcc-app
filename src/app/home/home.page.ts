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

    aprovarOrcamento(ordem: IOrcamentoList, status: number, aprovar: boolean) {
        const index = this.ordens.indexOf(ordem);
        this.changeStatus(index);
        const ref = ordem.referencia;
        this.submitting = true;
        this.homeService.aprovarOrcamento(ref, status, aprovar)
            .subscribe(updated => {
                if (updated) {
                    this.ordens[index].aprovacao = updated.aprovado;
                    this.ordens[index].status = updated.status;
                    this.changeStatus(index);
                }
            }, (err) => {
                this.changeStatus(index);
                this.submitting = false;
            }, () => {
                this.submitting = false;
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
