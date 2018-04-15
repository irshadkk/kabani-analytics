import {Component} from "@angular/core";
import {NavController, PopoverController,NavParams} from "ionic-angular";
import {Storage} from '@ionic/storage';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings"; 
import {SearchLocationPage} from "../search-location/search-location";
import { Dataservice } from '../../providers/dataservice/dataservice';

import {TripService} from "../../services/trip-service";
import {TripDetailPage} from "../trip-detail/trip-detail";


@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html'
})
export class TripsPage {
  // list of trips
  public trips: any;
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
//public navCtrl: NavController, public navParams: NavParams,private dataService: Dataservice
  constructor(private storage: Storage,public navCtrl: NavController, public popoverCtrl: PopoverController,
  public navParams: NavParams,private dataService: Dataservice, public tripService: TripService) {
     this.selectedItem = navParams.get('item');
     // set sample data
    this.trips = tripService.getAll();
  }
    viewDetail(id) {
    this.navCtrl.push(TripDetailPage, {id: id});
  }
loadData() {
   alert("loadData.."); 
    this.dataService.getPostData(this.dataService.serviceurl , null).subscribe(data => {
      this.dataFromServer=data;
      this.branchesData=data["Branches"];
     alert('data=====' + data);
    },
    (error => { this.handleError(error,"loadData()");}));

  }
   private handleError(error: any, method: any) {
     
   alert('An error occurred in ViewEmployeesComponent at method ');
    
    
   }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    console.log('item'+JSON.stringify(item))
    this.navCtrl.push(TripsPage, {
      item: item
    });
  }
  ionViewWillEnter() {
    // this.search.pickup = "Rio de Janeiro, Brazil";
    // this.search.dropOff = "Same as pickup";
    this.storage.get('pickup').then((val) => {
      if (val === null) {
        this.search.name = "Rio de Janeiro, Brazil"
      } else {
        this.search.name = val;
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  // go to result page
  doSearch() {
    this.navCtrl.push(TripsPage);
    
    this.loadData();
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
