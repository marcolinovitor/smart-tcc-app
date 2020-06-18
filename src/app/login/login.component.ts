import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    formLogin: FormGroup;

    constructor(
        private readonly fb: FormBuilder,
        private readonly loginService: LoginService,
        private readonly toastController: ToastController,
    ) {
        this.formLogin = this.fb.group({
            email: ['', Validators.required],
            senha: ['', Validators.required],
        })
    }

    ngOnInit() { }

    login() {
        this.loginService.login(this.formLogin.value)
            .subscribe(() => {
                //
            }, (err) => {
                if (err.status === 404) {
                    this.toastController.create({
                        message: 'Usuário não encontrado',
                        duration: 2000,
                    })
                        .then((toast) => toast.present())
                }
            })
    }


}
