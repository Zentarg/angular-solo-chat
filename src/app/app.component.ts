import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-solo-chat';

  chatCount: Array<number> = [1, 2];

  AddChat() : void {
    this.chatCount.push(this.chatCount.length + 1);
  }

}
