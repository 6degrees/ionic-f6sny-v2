import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-new-joke-help',
  templateUrl: 'new-joke-help.html',
})
export class NewJokeHelpPage {

	constructor(public viewCtrl: ViewController) {
	}

	ionViewDidLoad(){
		console.log('ionViewDidLoad NewJokeHelpPage');
	}

	close(){
 		this.viewCtrl.dismiss();
	}

}
