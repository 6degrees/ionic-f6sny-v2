import { MyApp } from './app.component';
import { ModeratePage } from '../pages/moderate/moderate';
import { NewjokesPage } from '../pages/newjokes/newjokes';
import { TimelinePage } from '../pages/timeline/timeline';
import { NewJokeHelpPage } from '../pages/new-joke-help/new-joke-help';
import { AboutPage } from '../pages/about/about';

import { ApiProvider } from '../providers/api/api';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule} from '@ionic/cloud-angular';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { Firebase } from '@ionic-native/firebase';
import { Clipboard } from '@ionic-native/clipboard';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ActionSheet } from '@ionic-native/action-sheet';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { Device } from '@ionic-native/device';


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'd8d7c300'
  }
};

@NgModule({
  declarations: [
    MyApp,
    TimelinePage,
    ModeratePage,
    NewjokesPage,
	NewJokeHelpPage,
	AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TimelinePage,
    ModeratePage,
    NewjokesPage,
	NewJokeHelpPage,
	AboutPage
  ],
  providers: [
    StatusBar,
    Firebase,
    Clipboard,
    SocialSharing,
	ActionSheet,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    NotificationsProvider,
	Device
  ]
})
export class AppModule {}
