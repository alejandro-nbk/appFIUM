import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  user= { nick: '', password: '', email: ''};
  pass={confirmarpassword:''};

  constructor() {

  }

  add_user(){
    console.log('registrado');
  }


}
