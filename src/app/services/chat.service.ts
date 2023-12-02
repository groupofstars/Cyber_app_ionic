import { Injectable } from '@angular/core';
import { Chatchable } from './catche-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { lastValueFrom, map, of } from 'rxjs';
import { Chat, ChatMessage } from '../model/chat-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends Chatchable {



  constructor(private http: HttpClient) {
    super(http);
  }

  getChatPersonsMessages() {
    setTimeout(async () => {
      var path = `${environment.api}/chats`;
      return await this.get<Chat>("courses", path);
    }, 1000);
  }
  async getChats() {
    var path = `${environment.api}/chat-list`;
    return await lastValueFrom(this.http.get<Chat[]>(path));
  }
  async getChat(id: number) {
    const chat = await this.getChats();
    if (chat)
      return chat.find(el => el.id == id);
    return undefined;
  }

  async getMessages(id: number) {
    var path = `${environment.api}/chat/${id}/message-list`;
    return await lastValueFrom(this.http.get<ChatMessage[]>(path).pipe(
      map(chats => {
        chats.map(mes => {
          mes.created = new Date(mes.created);
          mes.isOur = AuthService.user.id == mes.sender.id;
        });
        return chats;
      })
    ));
  }

  postMessage(message: any) {
    var path = `${environment.api}/`;
    return lastValueFrom(this.http.post<any[]>(path, message));
  }
  async createNewChat(teacherId: number) {
    var path = `${environment.api}/chat/new-group`;
    return lastValueFrom(this.http.post<Chat>(path, { teacherId }));

  }
  async sendMessage(chatId: number, message: Date) {
    var path = `${environment.api}/chat/new-message`;
    lastValueFrom(this.http.post(path, { chatId, message }));
  }

  getNewMessages(chatId: number | null, created: Date) {
    var path = `${environment.api}/chat/${chatId}/last-messages`;
    return lastValueFrom(this.http.post<ChatMessage[]>(path, { created }).pipe(
      map(chats => {
        chats.map(mes => {
          mes.created = new Date(mes.created);
          mes.isOur = AuthService.user.id == mes.sender.id;
        });
        return chats;
      })
    ));
  }

}
