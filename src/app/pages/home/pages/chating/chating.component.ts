import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
import { Chat, ChatMessage } from 'src/app/model/chat-model';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'chating',
  templateUrl: './chating.component.html',
  styleUrls: ['./chating.component.scss'],
})
export class ChatingComponent {
  @ViewChild('content') content!: IonContent;

  messages!: ChatMessage[];
  chat: Chat | undefined;
  messageFormControll: FormControl = new FormControl('', [Validators.required,Validators.minLength(1)]);
  id: number | null = -1;
  timer!: any;
  constructor(private navCtrl: NavController, private ac: ActivatedRoute, private chatService: ChatService) { }

  ionViewDidEnter() {
    this.getMessages();
  }

  ionViewDidLeave() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  back() {
    this.navCtrl.navigateBack('/home/chats')
  }

  async getMessages() {
    const idParam = this.ac.snapshot.paramMap.get("id");
    this.id = idParam ? +idParam : -1;
    if (!this.id) return;
    this.chat = await this.chatService.getChat(+this.id);
    this.messages = await this.chatService.getMessages(+this.id)
    this.initTimer();
    setTimeout(() => {
      this.content.scrollToBottom(0);
    }, 50);

  }
  async sentMassage() {
    if (this.messageFormControll.valid && this.id) {
      try {
        if (this.messageFormControll.value?.trim().length > 0) {
          await this.chatService.sendMessage(+this.id, this.messageFormControll.value);
          this.initTimer();
          this.messageFormControll.reset();
        }
      } catch (error) {

      }
    }
  }

  initTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(async () => {
      if (!this.messages) this.messages = [];
      try {
        const lastIndex = this.messages?.length;
        if (lastIndex > 0) {
          const created = this.messages[lastIndex - 1].created;
          const newMessages = await this.chatService.getNewMessages(this.id, created)
          this.messages = [...this.messages, ...newMessages];
          if (newMessages.length > 0) {
            this.content.scrollToBottom(500)
          }
        } else {
          if (!this.id) return;
          this.messages = await this.chatService.getMessages(+this.id)
        }

      } catch (error) {

      }

    }, 1000);
  }


}
