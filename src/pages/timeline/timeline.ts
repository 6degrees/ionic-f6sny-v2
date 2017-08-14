import { Component } from '@angular/core';
import { ToastController, ModalController, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Clipboard } from '@ionic-native/clipboard';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NewjokesPage } from '../newjokes/newjokes';
import { AboutPage } from '../about/about';

@Component({
	selector: 'page-timeline',
	templateUrl: 'timeline.html',
})
export class TimelinePage {
	toast;
	constructor(public jokesService: ApiProvider,
		private clipboard: Clipboard,
		private socialSharing: SocialSharing,
		private toastCtrl: ToastController,
		public modalCtrl: ModalController,
		private alertCtrl: AlertController) { }

	ionViewDidLoad() {
		this.getInitial();
		console.log('ionViewDidLoad TimelinePage');
	}

	openNewJokeModal() {
		let helpModal = this.modalCtrl.create(NewjokesPage);
		helpModal.present();
	}

	openAboutModal() {
		let helpModal = this.modalCtrl.create(AboutPage);
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
	getNewer(refresher): Promise<any> {
		let self = this;
		return new Promise((resolve) => {
			self.jokesService.getJokes('getNewer');
			setTimeout(() => {
				refresher.complete();
				resolve();
			}, 2000);
		});

	}

	// To Fill below list
	getOlder(infiniteScroll) {
		console.log('Begin async operation');
		let self = this;
		setTimeout(() => {
			self.jokesService.getJokes('getOlder');
			console.log('Async operation has ended');
			infiniteScroll.complete();
		}, 500);
	}

	reportJoke(joke,report_reason){
		let self = this;
		setTimeout(() => {
			self.jokesService.reportJoke(joke.id,report_reason);
			console.log('Async operation has ended');
		}, 500);
	}
	async showReportActions(joke){
		try{
			let reportAlert = this.alertCtrl.create({
				title: 'وش المشكلة؟',
				buttons: [
					{
						text: 'سب وشتم',
						handler: () => {
							this.reportJoke(joke,1);
						}
					},
					{
						text: 'كلام وصخ جداً',
						handler: () => {
							this.reportJoke(joke,2);
						}
					},

					{
						text: 'إلغاء',
						role: 'cancel',
						handler: data => {
							console.log('Cancel clicked');
						}
					}
				]
			});

			reportAlert.present();
		}
		catch (e) {
			console.log(e);
		}

	}
	async showAction(joke) {
		try {
			let alert = this.alertCtrl.create({
				title: 'آمر وتدلل',
				buttons: [
					{
						text: 'نسخ',
						handler: () => {
							this.copyText(joke);
						}
					},
					{
						text: 'نسخ مع ضحكة',
						handler: () => {
							let num_chars = this.randomIntFromInterval(10, 20);
							let extra_laugh = " ";
							for (let i = 0; i < - num_chars; i++) {
								extra_laugh += "ه";
							}
							this.copyText(joke + extra_laugh);
						}
					},
					{
						text: 'مشاركة',
						handler: () => {
							this.shareItem(joke);
						}
					},
					{
						text: 'تبليغ',
						cssClass: 'text-danger',
						handler: () => {
							this.showReportActions(joke);
						}
					},
					{
						text: 'إلغاء',
						role: 'cancel',
						handler: data => {
							console.log('Cancel clicked');
						}
					}
				]
			});

			alert.present();
		}
		catch (e) {
			console.log(e);
		}
	}

	private copyText(joke): void {
		console.log(joke.content);
		this.clipboard.copy(joke.content);
		this.showToast("تم النسخ");
	}



	private shareItem(item): void {
		// this code is to use the social sharing plugin
		// message, subject, file, url
		this.socialSharing.share(item.content).then(() => {
			this.showToast("تم النسخ");
		})
			.catch(() => {
			});
	}

	// Used for random laugh addition in action sheet
	private randomIntFromInterval(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	private showToast(message: string): void {
		this.toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: 'middle',
			cssClass: 'toastMessage'
		});
		this.toast.present();
	}

}
