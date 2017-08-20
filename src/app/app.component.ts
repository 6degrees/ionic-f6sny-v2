import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { TimelinePage } from '../pages/timeline/timeline';
import { Device } from '@ionic-native/device';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TimelinePage;

  constructor(platform: Platform, statusBar: StatusBar, private device: Device) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
	  console.log('Device UUID is: ' + this.device.uuid);
	  console.log(this.device);
      statusBar.styleDefault();
    });
  }
}
