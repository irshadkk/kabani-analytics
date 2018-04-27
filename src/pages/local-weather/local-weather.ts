import { Component } from "@angular/core";
import { NavController, PopoverController, NavParams } from "ionic-angular";
import { Storage } from '@ionic/storage';

import { NotificationsPage } from "../notifications/notifications";
import { SettingsPage } from "../settings/settings";
import { TripsPage } from "../trips/trips";
import { SearchLocationPage } from "../search-location/search-location";
import { Dataservice } from '../../providers/dataservice/dataservice';
// import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'page-local-weather',
  templateUrl: 'local-weather.html'
})
export class LocalWeatherPage {
  
  // search condition
  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }
  selectedItem: any;
  icons: string[];
  dataFromServer: any;
  branchesData: any;
  items: any;
  isshow = false;
  //public navCtrl: NavController, public navParams: NavParams,private dataService: Dataservice
  constructor(private storage: Storage, public navCtrl: NavController, public popoverCtrl: PopoverController,
    public navParams: NavParams, private dataService: Dataservice) {
    this.selectedItem = navParams.get('item');
    

  } 
 

  // choose place
  choosePlace(from) {
    this.navCtrl.push(SearchLocationPage, from);
  }

  // to go account page
  goToAccount() {
    this.navCtrl.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }
 
 



}

//
