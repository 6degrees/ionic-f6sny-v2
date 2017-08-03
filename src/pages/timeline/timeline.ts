import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Clipboard } from '@ionic-native/clipboard';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ToastController, ModalController } from 'ionic-angular';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { NewjokesPage } from '../newjokes/newjokes';

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {

constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public jokesService: ApiProvider,
    private clipboard: Clipboard,
    private socialSharing: SocialSharing,
    private toastCtrl: ToastController,
	private actionSheet: ActionSheet,
	public modalCtrl: ModalController,){}

	ionViewDidLoad() {
		this.getInitial();
		console.log('ionViewDidLoad TimelinePage');
	}

	openNewJokeModal(){
		let helpModal = this.modalCtrl.create(NewjokesPage);
         helpModal.present();
	}

	// First load of the application
	getInitial(): Promise<any> {
		let self = this;
		return new Promise((resolve) => {
			setTimeout(() => {
				self.jokesService.getJokes('');
				resolve();
			}, 100);
		})
	}

	//To fill above list
	getNewer(refresher) {
		let self = this;
		self.jokesService.getJokes('getNewer');
		setTimeout(() => {
			refresher.complete();
		}, 2000);
	}

	// To Fill below list
	getOlder(): Promise<any> {
		let self = this;
		return new Promise((resolve) => {
			setTimeout(() => {
				self.jokesService.getJokes('getOlder');
				resolve();
			}, 100);
		})
	}

	async showAction(joke){
		try {
			let buttonLabels = ['مشاركة', 'نسخ','نسخ مع ضحكة'];
			const options: ActionSheetOptions = {
			title: 'آمر وتدلل؟',
			subtitle: 'إختر وش تبي تسوي طال عمرك',
			buttonLabels: buttonLabels,
			addCancelButtonWithLabel: 'إلغاء',
			androidTheme: this.actionSheet.ANDROID_THEMES.THEME_HOLO_DARK,
			};

			let selectedIndex = await this.actionSheet.show(options);

			switch(selectedIndex){
				case 1:
					this.shareItem(joke);
					break;
				case 2:
					this.copyText(joke);
					break;
				case 3:
					let num_chars = this.randomIntFromInterval(10,20);
					let extra_laugh = " ";
					for(let i = 0; i<- num_chars; i++)
					{
						extra_laugh += "ه";
					}
					this.copyText(joke + extra_laugh);
			}
		}
		catch (e) {
			console.log(e);
		}
	}

	copyText(joke){
		console.log(joke.content);
		this.clipboard.copy(joke.content);
		let toast = this.toastCtrl.create({
			message: 'تم النسخ',
			duration: 3000,
			position: 'middle',
			cssClass: 'toastMessage'
		});
		toast.present();
	}

	shareItem(item) {
		// this code is to use the social sharing plugin
		// message, subject, file, url
		let toast = this.toastCtrl.create({
			message: 'ان شاء الله تعجبهم',
			duration: 3000,
			position: 'middle',
			cssClass: 'toastMessage'
		});
		toast.present();

		this.socialSharing.share(item.content).then(() => {
			let toast = this.toastCtrl.create({
			message: 'ان شاء الله تعجبهم',
			duration: 3000,
			position: 'middle'
			});
			toast.present();
		})
		.catch(() => {
		});
	}

	// Used for random laugh addition in action sheet
	randomIntFromInterval(min,max){
    	return Math.floor(Math.random()*(max-min+1)+min);
	}

}
