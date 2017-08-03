import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { ToastController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiProvider {
	jokes: any = [];
	tags: any = [];
	jokes_count: string = '';
	newestDate: Date = null;
	oldestDate: Date = null;
	api_url = 'https://www.f6sny.com/api/getJokes';
	api_temp_url = this.api_url;
	api_count_url = 'https://www.f6sny.com/api/getTotalJokes';
	api_tags_url = 'https://www.f6sny.com/api/getTags';
	api_post_joke_url = 'https://www.f6sny.com/api/postJoke';
	loader = this.loadingCtrl.create({
	  content: "يرجى الإنتظار..",
	});
	constructor(public http: Http,
		private toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
	) {}

	getTags() {
		let self = this;
		this.http.get(this.api_tags_url).map(res => res.json()).subscribe(data => {
			self.tags = data;
		});

    }

	getTotalJokesCount() {
		//debugger;
		let self = this;
		this.http.get(this.api_count_url).map(res => res.json()).subscribe(data => {
			console.log("My Jokes Count: " + data);
			self.jokes_count = data;
		});
	}

	// If you find a way to register device ID for anonymous users, that would be awsome
	// for push notifications on joke approval
	getJokes(params) {
		let self = this;
		let getParams: URLSearchParams = new URLSearchParams();
		if (params) {
			if (params == 'getNewer') {
				getParams.set('after', self.newestDate.toString());
			}
			if (params == 'getOlder') {
				getParams.set('before', self.oldestDate.toString());
			}
		}

		self.http.get(self.api_temp_url, { search: getParams }).map(res => res.json()).subscribe(
			(data) => {
				data.forEach(function(child) {
					child.borderColor = child.tags[0].fore_color;
				});

				if (params == 'getNewer') {
					self.jokes = data.concat(self.jokes);
				}
				else {
					self.jokes = self.jokes.concat(data);
				}

				//set first date
				self.newestDate = self.jokes[0].date_modified;
				//set last date
				self.oldestDate = self.jokes[self.jokes.length - 1].date_modified;
			},
			(err) => {
				let toast = this.toastCtrl.create({
					message: "فيه شي ماضبط, جرب مرة ثانية",
					duration: 3000,
					position: 'middle',
					cssClass: 'toastMessage'
				});
				toast.present();
				console.log(err);
			},
			() => {
				console.log("completed");
			}
		);
		self.getTotalJokesCount();
	}

	presentLoading() {

  	}

	private showLoader(): void {
	    this.loader.present();
		console.log('Show loader');
    }
	private hideLoader(): void {
		this.loader.dismiss();
        console.log('Hide loader');
    }
	async postJoke(joke){
		let self = this;
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');
		console.log(joke);
		//return;
		this.showLoader();
	    this.http.post(self.api_post_joke_url, JSON.stringify(joke), {headers: headers})
       .subscribe(
			(res) => console.log(res),
			(err) => console.warn(err),
			() => {
				this.hideLoader()
			}
   		);
	  }
//	postJoke() { }

	moderateJoke() { }

}
