import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})


export class StartPage {


  constructor(public navCtrl: NavController) {

  }

  pageSuivante() {
    this.navCtrl.push(TabsPage);
  }

}


