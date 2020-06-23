import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IVehicles } from '../model/i-veiculos.interface';
import { MeusCarrosService } from '../meus-carros.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
    selector: 'app-carro-form',
    templateUrl: './carro-form.page.html',
    styleUrls: ['./carro-form.page.scss'],
})
export class CarroFormPage implements OnInit {

    saving = false;
    veiculosForm: FormGroup;
    marcasVeiculos: IVehicles[] = [];
    nomesVeiculos: IVehicles[] = [];
    private regexPlaca = new RegExp('^[a-zA-Z]{3}[0-9]{4}$');

    constructor(
        private readonly fb: FormBuilder,
        private readonly meusVeiculoService: MeusCarrosService,
        private readonly toastController: ToastController,
    ) {
        this.createForm();
    }

    ngOnInit() {
    }

    createForm() {
        this.veiculosForm = this.fb.group({
            tipo: [{ value: '', disabled: false }, [Validators.required]],
            marca: [{ value: '', disabled: true }, [Validators.required]],
            modelo: [{ value: '', disabled: true }, [Validators.required]],
            placa: ['', [Validators.required, Validators.pattern(this.regexPlaca), Validators.minLength(7), Validators.maxLength(7)]],
        });
    }

    salvarVeiculo(form: FormGroup): void {
        this.saving = true;
        const veiculo = {
            marca: this.marcasVeiculos.find(f => f.codigo == form.value.marca).nome,
            modelo: this.nomesVeiculos.find(f => f.codigo == form.value.modelo).nome,
            placa: form.value.placa,
            clienteId: '',
        };
        this.meusVeiculoService.cadastrarVeiculo(veiculo)
            .subscribe(newVeiculo => {
                console.log(newVeiculo);
            }, (err) => {
                console.log(err);
                this.saving = false;
            }, () => {
                this.saving = false;
                this.createForm();
                this.meusVeiculoService.thereIsNew = true;
                this.toaster('Veículo salvo com sucesso!');
            });
    }

    getVeiculos(tipo: string): void {
        if (tipo !== '') {
            this.marcasVeiculos = [];
            this.nomesVeiculos = [];
            this.meusVeiculoService.getVehicles(tipo)
                .subscribe((result) => {
                    this.marcasVeiculos = result;
                }, (err) => {
                    console.log(err);
                }, () => {
                    this.veiculosForm.controls['marca'].enable();
                })
        }
    }

    getVeiculosPorMarca(marca: number) {
        if (marca) {
            this.meusVeiculoService.getVehiclesName(marca)
                .subscribe((result) => {
                    this.nomesVeiculos = result;
                }, (err) => {
                    console.log(err);
                }, () => {
                    this.veiculosForm.controls['modelo'].enable();
                })
        }
    }

    toaster(text: string) {
        this.toastController.create({
            message: text,
            duration: 2000,
        })
            .then((toast) => toast.present())
    }

}
