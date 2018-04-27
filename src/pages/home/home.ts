import { Component } from "@angular/core";
import { NavController, PopoverController, NavParams } from "ionic-angular";
import { Storage } from '@ionic/storage';

import { NotificationsPage } from "../notifications/notifications";
import { LocalWeatherPage } from "../local-weather/local-weather";

import { SettingsPage } from "../settings/settings";
import { TripsPage } from "../trips/trips";
import { SearchLocationPage } from "../search-location/search-location";
import { Dataservice } from '../../providers/dataservice/dataservice';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage { 
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
    this.doSearch();  
    

  }
  loadData(date) {

    this.isshow = true;
    var formattedDate = date.split("T")[0]
    this.doughnutChartLabels = [];
    this.barChartLabels = [];
    this.barChartData["data"] = []
    this.barChartData["label"] = 'Series A'
    this.doughnutChartData = [];
    this.doughnutChartDataWeight = [];

    this.dataService.getPostData(this.dataService.serviceurl + formattedDate, null).subscribe(data => {
      this.isshow = false;
      this.dataFromServer = data;
      this.branchesData = data["Branches"];
      this.branchesData.forEach(element => {
        this.doughnutChartLabels.push(element.BranchName);
        this.barChartLabels.push(element.BranchName);
        this.doughnutChartData.push(element.BranchTotalAmount);
        this.doughnutChartDataWeight.push(element.BranchTotalWeight);

        this.barChartData["data"].push(element.BranchTotalAmount);
      });
      console.log('--->' + JSON.stringify(this.barChartData["data"]))
      if (data["ResponseStatus"]["Status"] === 'Failure') {
        alert(data["ResponseStatus"]["StatusMessage"]);
        //  this.navCtrl.setRoot(HomePage);
      }
    },
      (error => {
        this.handleError(error, "loadData()");
      }));

  }
  private handleError(error: any, method: any) {

    alert('An error occurred ');


  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    console.log('item' + JSON.stringify(item))
    this.navCtrl.push(LocalWeatherPage, {
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
    //this.navCtrl.push(TripsPage);
    this.dataFromServer = { ResponseStatus: { Status: '' } };
    this.loadData(this.search.date);
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


  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }




  // Doughnut
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartDataWeight: number[] = [];

  public doughnutChartType: string = 'doughnut';



}

//
