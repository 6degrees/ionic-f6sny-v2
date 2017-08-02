import { Component } from '@angular/core';
import { TimelinePage } from '../timeline/timeline';
import { ModeratePage } from '../moderate/moderate';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TimelinePage;
  tab2Root = ModeratePage;

  constructor() {

  }
}
