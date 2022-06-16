
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ChatMessage } from './ChatMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatIdCounter: number = 0;
  messageIdCounter: number = 0;

  private _newMessageSource = new ReplaySubject<ChatMessage>();

  newMessage$ = this._newMessageSource.asObservable();

  chatHistory: ChatMessage[] = []

  initChat(): number {
    this.chatIdCounter++;
    return this.chatIdCounter;
  }

  sendMessage(_authorId: number, _message: string): void {
    this.messageIdCounter++;
    const message : ChatMessage = {author: _authorId, id: this.messageIdCounter, message: _message}
    this._newMessageSource.next(message);
    this.chatHistory.push(message);
  }

  constructor() { }
}
