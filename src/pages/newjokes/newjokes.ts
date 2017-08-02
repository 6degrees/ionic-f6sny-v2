import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController, ViewController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import {NewJokeHelpPage} from '../new-joke-help/new-joke-help';

@Component({
  selector: 'page-newjokes',
  templateUrl: 'newjokes.html',
})
export class NewjokesPage {
	Tags: any = [];
	Joke: any = "";

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public jokesService: ApiProvider,
		private toastCtrl: ToastController,
		public modalCtrl: ModalController,
		public viewCtrl: ViewController,
	) {	}

	close() {
       this.viewCtrl.dismiss();
     }
	ionViewDidLoad() {
		this.jokesService.getTags();
	}
	openInformationModal(){
		let helpModal = this.modalCtrl.create(NewJokeHelpPage);
         helpModal.present();
	}

	ToggleTags(id){
		if (this.Tags.includes(id))
		{
			this.Tags.pop(id);
		}
		else{
			this.Tags.push(id);
		}
		console.log("Tags array now includes: " + this.Tags);
	}

	submitJoke(){
		let postContent:any;

		// Check the joke
		if(this.Joke.length < 20){
			let toast = this.toastCtrl.create({
				message:  "فيه نكتة بالعالم أقل من 20 حرف؟",
				duration: 2000,
				position: 'middle',
				cssClass: 'toastMessage'
			});
			toast.present();
			return false;
		}
		// Passed

		// Check if at least one tag is assigned
		if(this.Tags.length < 1){
			let toast = this.toastCtrl.create({
				message:  "لازم تختار عالأقل تصنيف واحد",
				duration: 2000,
				position: 'middle',
				cssClass: 'toastMessage'
			});
			toast.present();
			return false;
		}
		// Passed

		postContent = {'joke': "يقول لك، " + this.Joke, 'tags': this.Tags};
		// if all pass, submit the joke.
		this.jokesService.postJoke(postContent);

		this.close();


	}
}
