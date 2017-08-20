# F6sny App Stuff
هذا المستودع لأكواد تطبيق فطسني. البرمجة تمت عبر إستخدام فريمورك [آيونك](https://www.ionicframework.com). العمل يعتبر تطبيق لما نتعلمه في عالم البرمجة.  

### To-Do
* (x) Add Pull to refresh
* (x) Add New Post Functionality
* (x) Add About Page link in homepage
* (x) Fix checkboxes of new joke (it was a malfunction of genymotion)
* Add Reporting function
* Add Favorites and hearts function
* Add Multi-forward (multiple select of jokes to forward or share)
* Grab device ID for anonymous user generation of tokens
* In-app registration: in this case it is just an update to user information
* Add commenting feature
* Add Geo location, for jokes around me.
* Add Firebase Crash Reporting
* Add top tabs (segments) for favorite jokes, unseen jokes, jokes timeline, jokes around me.
* Add Support for push Notification (create firebase tokens).
	* You can send users random jokes once everyday.
	* Send users that their jokes were approved.
* Implement seen functionality
* Implement **JWT** (create client tokens) [PHP Authorization with JWT](https://www.sitepoint.com/php-authorization-jwt-json-web-tokens/)
	* Create a function to get user_id from token
	* Create a function to get token from user_id
	* Create a function to get device token from token
	* Create a function to get token from device token
* Update the API to be a RESTful API as per standards (bookmark exists) also, use this for controller [codeigniter-restserver](https://github.com/chriskacerguis/codeigniter-restserver)
* Add the moderation page
* Implement Caching
* Revise the loading spinner utilizing this [How To Fetch json Dat......](http://www.icoderslab.com/how-to-fetch-json-data-from-web-service-in-ionic-2-app-using-angular-2/)
* Consider adding timeout for http requests [ionic forum](https://forum.ionicframework.com/t/ionic-http-request-timeout/38912/21)


### Logic
* On Installation first load
	* Is registered? (User token saved in storage?)
		* No
			* Register Anonymously,
				* Device ID
				* Create Server Token
				* Save in DB and in Local Storage
				* Create Firebase ID and save in server
		* Yes
			* Verify still valid? (information completed?) Update if necessary
				* Yes
					* Proceed
				* No
					* Refresh working?
						* Proceed
					* No
						* Register Anonymously




# Contributions
للمشاركة, يرجى سحب هذا المستودع ودفع التعديلات وسيتم مراجعتها وجزيل الشكر لكل من يساهم معنا ويساعدنا في ها العمل

# References & Good Reads
* Full Stack Development
	* a guide to becoming a full stack developer in 2017 [medium.com/coderbyte/](https://medium.com/coderbyte/a-guide-to-becoming-a-full-stack-developer-in-2017-5c3c08a1600c)
	* Recent technologies [Aligator.io](https://alligator.io/ionic/)
* Ionic Stuff and Tutorials
	* Styling your application [Joshmorony](https://www.joshmorony.com/a-guide-to-styling-an-ionic-2-application/)
	* Good HTTP practice: [Building a review App](https://www.joshmorony.com/building-a-review-app-with-ionic-2-mongodb-node/)
* UI
	* [Pintrest](https://www.pinterest.com/wepsdesign/ui-mobile-booking-travel/?lp=true)
	* [Pintrest](https://www.pinterest.com/pin/271201208786791612/)
	* [Ionic 3 Mobile Weather App Build](https://www.youtube.com/watch?v=qs2n_poLarc)
