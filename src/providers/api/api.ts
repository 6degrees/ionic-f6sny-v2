import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { NotificationsProvider } from '../notifications/notifications';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiProvider {
	jokes: any = [];
	tags: any = [];
	jokes_count: string = '';
	newestDate: Date = null;
	oldestDate: Date = null;
	api_url = 'https://www.f6sny.com/api/getJokes';
	api_count_url = 'https://www.f6sny.com/api/getTotalJokes';
	api_tags_url = 'https://www.f6sny.com/api/getTags';
	api_post_joke_url = 'https://www.f6sny.com/api/postJoke';


	constructor(public http: Http, public nofity: NotificationsProvider) {
		this.getTotalJokesCount();
	}

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
				self.nofity.showLoader("");
			}
			if (params == 'getOlder') {
				getParams.set('before', self.oldestDate.toString());
			}
		}

		this.http.get(self.api_url, { search: getParams }).map(res => res.json()).subscribe(
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
				if (params == 'getNewer') {
						self.nofity.showToast("فيه شي ماضبط, جرب مرة ثانية");
				}
				console.log(err);
			},
			() => {

				if (params == 'getNewer') {
						self.nofity.hideLoader();
				}
			}
		);
	}

	async postJoke(joke){
		let self = this;
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');
		console.log(joke);
		//return;
		self.nofity.showLoader("يرجى الإنتظار..");
	    this.http.post(self.api_post_joke_url, JSON.stringify(joke), {headers: headers})
       .subscribe(
			(res) => console.log(res),
			(err) => console.warn(err),
			() => {
				self.nofity.hideLoader();
			}
   		);
	  }

	moderateJoke() { }

}
