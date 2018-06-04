import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DATABASE_FILE_NAME: string = 'tccmuseum.db';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  public db: SQLiteObject;
  public total ;
  public getArtsInfoTable = [];
  public getIfCheckedTable = [];
  public nb_checked;


  constructor(private sqlite: SQLite) {
    this.createDatabaseFile();
    
  }

  
  private createDatabaseFile():void{
    this.sqlite.create({/*  */
        name: DATABASE_FILE_NAME,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
            console.log('Bdd créée !');
            this.db = db;
            this.createTable();
      
      
        })
        .catch(e => console.log(e));
  }

  private createTable(): void{
    // this.db.executeSql("drop table arts", {});
    this.db.executeSql(' CREATE TABLE if not exists "arts" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `image` TEXT, `name` TEXT, `qrcode` INTEGER ,  `viewed` TEXT )', {})
    .then((table) => {
      if(table.rows.length == 20){
        
      } else {
        this.insertTableValues();
      } 
      
      
    console.log("table deja cree donc  ???");
      this.getArtsInfo();
    })
    .catch(e => console.log(e));
  }

   public insertTableValues(): void {
    this.db.executeSql('INSERT INTO "arts" values (1,  "photo", "Jean-Pierre ALVAREZ", 9213750369, "false"),' +
    ' (2, "photo", "Poeragni ARAI", 6510403686, "false"),' +
    ' (3, "photo", "Jerôme CHANSIN", 7216899933, "false"),' +
    ' (4, "photo", "Jonas CHEUNG-SEN", 1629568455, "false"),' +
    ' (5, "photo", "Heimana CUNY", 9266553664, "false"),' +
    ' (6, "photo", "Nicola EBB", 1168085824, "false"),' +
    ' (7, "photo", "Alexandre LEHARTEL", 2791010818, "false"),' +
    ' (8, "photo", "Tetuaoro LENOIR", 4173047359, "false"),' +
    ' (9, "photo","Manaarii LONGINE", 9782420312, "false"),' +
    ' (10, "photo", "Joane LY", 6872232276, "false"),' +
    ' (11, "photo", "Vaitare MONACO", 4653519064, "false"),' +
    ' (12, "photo", "Ariipaea PAEAHI", 3658034121, "false"),' +
    ' (13, "photo", "Aito PAMBRUN", 5175547403, "false"),' +
    ' (14, "photo", "Hiomai PAMBRUN", 9520532017, "false"),' +
    ' (15, "photo", "Rahiti PEREZ", 1228597258, "false"),' +
    ' (16, "photo", "Matihamu PERRY", 5480211371, "false"),' +
    ' (17, "photo", "Christian ROUSSEL", 2462643924, "false"),' +
    ' (18, "photo","Tinirau TEHUPE", 5055364030, "false"),' +
    ' (19, "photo","Tinirau TEMATAHOTOA", 6232447902, "false"),' +
    ' (20, "photo", "Teparii TOOFA", 4235066246, "false");', {})
    .then(() => {
      console.log('insertion faite');
      
    })
    .catch(e => console.log(e));
  } 

  public getArtsInfo(){
    this.db.executeSql('SELECT image, name, qrcode, viewed  FROM "arts"', {})
    .then((data) => {
      this.total = data.rows.length; //recupere le nombre total d'oeuvres dans "total"
      console.log('data length :', data.rows.length );
      for(var i = 0; i < data.rows.length; i++){
        this.getArtsInfoTable.push(data.rows.item(i));

        console.log('nom :', data.rows.item(i).name);
      };
       this.getTotalChecked();//appel pour le nombre d'oeuvres vues

      });
    
  }

  // Recupérer le nombre total de checked
  public getTotalChecked(){
   this.db.executeSql('SELECT count(viewed) as viewed from arts where viewed="true"', {})
    .then((data) =>{
      
      this.nb_checked=data.rows.item(0).viewed; //recupere le nombre d'oeuvres vues dans "nb_checked"
      console.log("nombre de checked : ", this.nb_checked);
    })
    .catch(e => console.log("erreur getTotalCheck",e));
    
  }

  

}
