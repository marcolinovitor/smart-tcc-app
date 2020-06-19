import { Component, OnInit } from '@angular/core';
import { MeusCarrosService } from './meus-carros.service';
import { MeuVeiculo } from './model/meu-veiculo';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
    selector: 'app-meus-carros',
    templateUrl: './meus-carros.page.html',
    styleUrls: ['./meus-carros.page.scss'],
})
export class MeusCarrosPage implements OnInit {

    render = false;
    veiculos = new Array<MeuVeiculo>();
    veiculo: MeuVeiculo;

    constructor(
        private readonly meusCarrosService: MeusCarrosService,
        private readonly toastController: ToastController,
        public alertController: AlertController,
    ) { }

    ngOnInit(): void {
        this.getMeusCarros();
    }

    getMeusCarros(): void {
        this.render = true;
        this.meusCarrosService.getClienteVeiculos()
            .subscribe(result => {
                console.log(result)
                this.veiculos = result;
            }, (err) => {
                this.render = false;
            }, () => {
                this.render = true;
            })
    }

    cadastrarVeiculo(veiculo): void {
        this.meusCarrosService.cadastrarVeiculo(veiculo)
            .subscribe(result => {
                this.veiculos.push(result);
            }, err => {
                //
            }, () => {
                this.toaster('Veículo cadastrado com sucesso!');
            })
    }

    setVeiculo(veiculo: MeuVeiculo): void {
        // this.titleModal = `Remover ${veiculo.marca}`;
    }

    removeVeiculo(): void {
        this.meusCarrosService.removeVeiculo(this.veiculo.id)
            .subscribe(result => {
                this.veiculos.splice(this.veiculos.indexOf(this.veiculo), 1);
            }, err => {
                //
            }, () => {
                this.toaster('Veículo removido com sucesso!')
            })
    }

    openAlert(veiculo: MeuVeiculo) {
        this.veiculo = veiculo;
        this.alertController.create({
            header: 'Confirma e exclusão?',
            message: `${this.veiculo.modelo}`,
            buttons: [
                {
                    text: 'Não',
                    role: 'cancel',
                    cssClass: 'secondary'
                },
                {
                    text: 'Sim',
                    handler: () => {
                        this.removeVeiculo();
                    }
                }
            ]
        })
            .then((element) => element.present());
    }

    toaster(text: string) {
        this.toastController.create({
            message: text,
            duration: 2000,
        })
            .then((toast) => toast.present())
    }

}
