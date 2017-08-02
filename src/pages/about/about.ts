import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Deploy} from '@ionic/cloud-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,public deploy: Deploy) {

  }

}
