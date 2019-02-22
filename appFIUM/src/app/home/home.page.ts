import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user= { nombre: '', password: ''};

  constructor(public navCtrl : NavController) {

  }

  showRegistroPage(){
    console.log('registro');
    this.navCtrl.navigateForward('/registro');
  }

  login_user(){
    console.log('login');
  }

}
