import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';

import { map } from 'rxjs/operators';

import { URLSearchParams } from '@angular/http';

@Injectable()
export class UserService {

    isLoading = false;
    user= { LastName: '', Email: '',};

    constructor(public http:HttpClient, public loadingController:LoadingController, public alertController:AlertController, public navCtrl: NavController) {

    }

    buyTicket(){
        let url = "https://webto.salesforce.com/servlet/servlet.WebToLead?oid=00D1i0000009BSi&last_name=";

        this.http.get(url+this.user.LastName+'&email='+this.user.Email).subscribe(data=>{
            console.log('correcto');
        }, err =>{
            console.log('error');
        });
    }

    generateToken(){
        let url = "https://login.salesforce.com/services/oauth2/token";
        let body = new FormData(); 
        body.append("grant_type", "password"); 
        body.append("client_id","3MVG9T46ZAw5GTfVsJ9ZH6gfVjUv7aIAFZGkq9_2gFl3O_WYl1Auwfmmn7os34T8s0fmdiPT8ClLK.4_43Esj");
        body.append("client_secret","0303688176E3A5A9C0DC765C963D448F9AF67D01A3C689A1F63418B7B9D98483");
        body.append("username","integracion@fium.com.dev");
        body.append("password","fium2019Wyu0VSKokFakTX5f5mFTQQaZ");
        let headers={'Content-Type': 'application/x-www-form-urlencoded'};
        let bodyAux={
            "grant_type": "password",
            "client_id":"3MVG9T46ZAw5GTfVsJ9ZH6gfVjUv7aIAFZGkq9_2gFl3O_WYl1Auwfmmn7os34T8s0fmdiPT8ClLK.4_43Esj",
            "client_secret":"0303688176E3A5A9C0DC765C963D448F9AF67D01A3C689A1F63418B7B9D98483",
            "username":"integracion@fium.com.dev",
            "password":"fium2019Wyu0VSKokFakTX5f5mFTQQaZ"
        }
     
        return this.http.post(url, body , {headers: headers, observe: 'response'}).subscribe(data=>{
            console.log('correcto');
            console.log(data);
            console.log(JSON.stringify(data));
        }, err =>{
            console.log('error');
            console.log(err._body);
        });
        
    }

    validEmail(data){
        let url="https://eu19.salesforce.com/services/data/v45.0/sobjects/Contact";
        let httpOptions = { 
            headers:{
                'Authorization': 'Bearer 00D1i0000009BSi!AQ0AQGyl7AssJQUkZj.b4xPkC2aFRZYq.iU.G96b4r2g5HhtSNPykHS8uTXgtyimJ_YzCHgZ_4CLv4z6WwUJoVsqPm8NeRC6',
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