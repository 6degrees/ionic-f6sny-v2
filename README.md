# F6sny App Stuff

## To-Do
* (x)Add Pull to refresh
* (x)Add New Post Functionality
* Add About Page link in homepage
* Add Favorites and hearts function
* Add Multi-forward
* Grab device ID for anonymous user generation of tokens
* in-app registration in this case is just an update to user information
* Add commenting feature
* Add Geo location, for jokes around me.
* Add top tabs for favorite jokes, unseen jokes, jokes timeline, jokes around me.
* Add Support for push Notification (create firebase tokens).
	* You can send users random jokes once everyday.
	* Send users that their jokes were approved.
* Implement seen functionality
* Implement **JWT** (create client tokens)
	* Create a function to get user_id from token
	* Create a function to get token from user_id
	* Create a function to get device token from token
	* Create a function to get token from device token
* Update the API to be a RESTful API as per standards (bookmark exists) also, use this for controller [codeigniter-restserver](https://github.com/chriskacerguis/codeigniter-restserver)
* Add the moderation page
* Implement Caching

## Logic
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
