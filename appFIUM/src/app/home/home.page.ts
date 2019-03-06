import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../providers/users/users';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user= { LastName: '', 
          Email: ''};

  constructor(public navCtrl : NavController, public userService : UserService) {

  }

  login_user(){
    console.log('login');
    //EnviarPeticionSalesforce();
    this.userService.validEmail(this.user);
    /*if (true)){
      //Si el correo no estaba registrado:
      this.userService.presentAlert('Valid', 'Email registrado correctamente. Gracias por darnos tu información porque sí :D');
      this.navCtrl.navigateForward('/billetes');
    } else {*/
      //Si el correo ya estaba registrado:
      //this.userService.presentAlert('Ups','El email estaba registrado ya.');
    //}
    
  }

}
