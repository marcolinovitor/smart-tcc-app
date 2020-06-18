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
    sideMenu = [];
    clienteNome = '';
    ordens = new Array<IOrcamentoList>();
    submitting: boolean;

    constructor(
        private menu: MenuController,
        private homeService: HomeService
    ) {
        this.sideMenu = this.homeService.createMenu();
        this.clienteNome = this.homeService.getCliente().nome.split(' ')[0];
    }

    ngOnInit() {
        this.getAll();
    }

    logout() {
        this.homeService.logout();
    }

    getAll() {
        this.homeService.getOrcamentos()
            .subscribe((osList) => {
                this.ordens = osList;
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
