import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';

import 'rxjs/add/operator/map';

@Injectable()
export class NotificationsProvider {
	loader;
	toast;
  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
    console.log('Hello NotificationsProvider Provider');
  }


  	public showToast(message: string): void{
  		this.toast = this.toastCtrl.create({
  			message: message,
  			duration: 1500,
  			position: 'middle',
  			cssClass: 'toastMessage'
  		});
  		this.toast.present();
  	}

  	public showLoader(message: string): void {
  		this.loader  = this.loadingCtrl.create({
  		  content: message,
  		})
  	    this.loader.present();
      }

  	public hideLoader(): void {
  		this.loader.dismiss();
      }


}
