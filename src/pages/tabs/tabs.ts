import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';

import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SQLite } from '@ionic-native/sqlite';

@Component({
  templateUrl: 'tabs.html'
})



export class TabsPage {

  tab1Root = HomePage;
  tab3Root = AboutPage;
  

  
  private result: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner,  private iab: InAppBrowser, private sqlite: SQLite, public bdHomePage : HomePage) {
    
  }

  
  scanBarcode(){
    
    const options: BarcodeScannerOptions = {
      prompt: 'Veuillez scanner l\'oeuvre',
      torchOn: false
    };
    
    this.barcodeScanner.scan(options)
    .then(res => {
              this.result = res.text;
              console.log("resultat?", this.result);
              // On va sur l'url
                if(this.result){
                   this.iab.create('http://tcc.1click.pf/museum/index.php?mat=3OV6CVX2O4&oeuvre='+this.result);
                   
                  //on update la bdd
                  console.log("avant");
                  this.bdHomePage.db.executeSql('UPDATE `arts` SET viewed="true" WHERE arts.qrcode='+this.result, {})
                  .then(() => {
                    console.log('l\'oeuvre a été vue');
                  })
                  .catch(err => {
                      console.log('Error ', err);
                      console.log(JSON.stringify(err));
                  });
                  }
                 else{
                   console.log("pas de resultat");
                   }
                  
                  })         
          
    
     }
}
