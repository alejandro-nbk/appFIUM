import { Component, OnInit } from '@angular/core';
import { UserService } from '../providers/users/users';

@Component({
  selector: 'app-billetes',
  templateUrl: './billetes.page.html',
  styleUrls: ['./billetes.page.scss'],
})
export class BilletesPage {

  botonInactivo = false;
  botonAgotadoInactivo = false;
  contador = 0;
  
  opportunity= {
    CloseDate: '',
    Name: '',
    StageName: 'Closed Won'
  }

  opportunityLineItem= {
    Quantity: 1,
    PricebookEntryId: '01u1i000001dxygAAA',
    Product2Id: '01t1i000000GlPZAA0'
  }

  constructor(public userService:UserService) { }

  comprarBillete(){
    this.userService.presentAlert("Éxito", "Billete comprado");
    this.userService.buyTicket();
    this.botonInactivo = true;
  }

  comprarBilleteAgotado(){
    this.contador++;
    switch (this.contador) {
      case 1:
        this.userService.presentAlert("Agotado", "No quedan billetes de este tipo.");
        break;
      case 2:
        this.userService.presentAlert("Agotado", "Que no quedan billetes de este tipo. Deja de darle al botón.");
        break;
      case 3:
        this.userService.presentAlert("Pesado", "Ya te he dicho que no quedan billetes de este tipo. Te acabas de quedar sin poder darle al botón. Por listo.");
        this.botonAgotadoInactivo = true;
        break;
    } 
  }

}
