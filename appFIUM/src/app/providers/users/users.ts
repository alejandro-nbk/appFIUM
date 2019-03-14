import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';

import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

    isLoading = false;

    constructor(public http:HttpClient, public loadingController:LoadingController, public alertController:AlertController, public navCtrl: NavController) {

    }

    generateToken(){
        let url = "https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9T46ZAw5GTfVsJ9ZH6gfVjUv7aIAFZGkq9_2gFl3O_WYl1Auwfmmn7os34T8s0fmdiPT8ClLK.4_43Esj&client_secret=0303688176E3A5A9C0DC765C963D448F9AF67D01A3C689A1F63418B7B9D98483&username=integracion@fium.com.dev&password=fium2019Wyu0VSKokFakTX5f5mFTQQaZ"
        let headers={'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'};
        this.http.post(url, {}, {headers: headers, observe: 'response'}).subscribe(data=>{
            console.log('correcto');
            console.log(JSON.stringify(data));
        }, err =>{
            console.log('error');
            console.log(err._body)
        });
    }

    validEmail(data){
        let url="https://eu19.salesforce.com/services/data/v45.0/sobjects/Contact";
        let httpOptions = { 
            headers:{
                'Authorization': 'Bearer 00D1i0000009BSi!AQ0AQLjAdOlANopbsLq_o1.qryhDDQtsrNE8SVKQTVoo0l8DacBRsWl2_dPMHGlCf3Xg4mjxLOICEb9z6RurOIoyGoY5GJ6U',
                'Content-Type':  'application/json'
            }
        };
        this.http.post(url, data,httpOptions).subscribe(resp=>{
            console.log('Contacto creado');
            console.log(JSON.stringify(resp));
            this.presentLogin();
        }, err=>{
            //Aquí entra cuando el email está duplicado
            console.log(err);
            this.presentAlert('Error','Este correo ya está en uso');
        });
    }

    async presentLogin() {
        this.isLoading = true;
        return await this.loadingController.create({
            duration: 1000,
            message: 'Cargando...'
        }).then(a => {
            a.present().then(() => {
            console.log('presented');
            this.navCtrl.navigateForward('/billetes');
            if (!this.isLoading) {
                a.dismiss().then(() => console.log('abort presenting'));
            }
            });
        });
    }
    
    async dismiss() {
        this.isLoading = false;
        return await this.loadingController.dismiss().then(() => console.log('dismissed'));
    }

    async presentAlert(alertHeader,alertMessage){
        const alert= await this.alertController.create({
           header: alertHeader,
           message: alertMessage,
           buttons: ['OK']
        })

        await alert.present();
    }



}