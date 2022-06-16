import { ChatMessage } from './../ChatMessage';
import { ChatService } from './../chat.service';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  message: string = "";
  id: number = 0;
  pauseScroll: boolean = false;

  @ViewChild('historyContainer') historyContainer? : ElementRef<HTMLElement>;

  chatHistory: ChatMessage[] = []

  newMessageSubscription!: Subscription;

  receiveMessage(_message : ChatMessage): void {
    this.chatHistory.push(_message);
  }

  sendMessage(): void {
    this.chatService.sendMessage(this.id, this.message)
    this.message = "";
  }

  constructor(private chatService: ChatService, private zone: NgZone) { }

  ngOnInit(): void {
    this.id = this.chatService.initChat();
    this.newMessageSubscription = this.chatService.newMessage$.subscribe(message => this.receiveMessage(message))
  }

  ngOnDestroy() {
    this.newMessageSubscription.unsubscribe();
  }

}
