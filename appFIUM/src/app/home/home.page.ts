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
    this.userService.generateToken();
  }

  login_user(){
    this.userService.validEmail(this.user);
  }

}
