import {Component} from '@angular/core';
import {EventI} from "./types/types";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'initium';
  popUp: boolean = false;
  popUpData?: any

  handlePopUp(data: EventI) {
    this.popUpData = data;
    this.popUp = !this.popUp;
  }
}
