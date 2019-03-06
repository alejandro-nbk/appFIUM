import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

    isLoading = false;

    constructor(public http:HttpClient, public loadingController:LoadingController, public alertController:AlertController) {

    }

    validEmail(data){
        console.log('Antes url');
        let url="https://eu19.salesforce.com/services/data/v45.0/sobjects/Contact";
        let httpOptions = { 
            headers:{
                'Authorization': 'Bearer 00D1i0000009BSi!AQ0AQOXaVaj.969PYZB43p1ZV4urz.XCHWUsJX6OJq1A9NUwkkd0fPv_GCH7TONLcG00TovXvAkEDf2FsKeyAG0kgGWVxYVW',
                'Content-Type':  'application/json'
            }
        };
        console.log('Post httpoptions');
        this.http.post(url, data,httpOptions).subscribe(resp=>{
            console.log(resp);
        }, err=>{
            //Aquí entra cuando el email está duplicado
            console.log(err);
        });
        console.log('post post');
    }

    async present() {
        this.isLoading = true;
        return await this.loadingController.create({
            duration: 2000,
            message: 'Espera por favor...'
        }).then(a => {
            a.present().then(() => {
            console.log('presented');
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