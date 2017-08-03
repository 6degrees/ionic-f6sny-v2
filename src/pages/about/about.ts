import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {Deploy} from '@ionic/cloud-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public viewCtrl: ViewController,public deploy: Deploy) {

  }

  close(){
  	this.viewCtrl.dismiss();
  }
}
