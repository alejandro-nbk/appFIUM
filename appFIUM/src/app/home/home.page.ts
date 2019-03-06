import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user= { nombre: '', email: ''};

  constructor(public navCtrl : NavController) {

  }

  login_user(){
    console.log('login');
    this.navCtrl.navigateForward('/billetes');
  }

}
