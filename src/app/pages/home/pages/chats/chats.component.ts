import { Component, ViewChild } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';
import { Chat } from 'src/app/model/chat-model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent {
  // @ViewChild('swiper')
  // swiperRef: ElementRef | undefined;
  @ViewChild('content') content!: IonContent;

  messages!: Chat[];
  activeIndex: number = 0;
  constructor(private router: NavController, private chatServ: ChatService) { }

  async ionViewDidEnter() {
    this.content.scrollToTop();
  }

  ionViewWillEnter() {
    this.getMesages();
  }
  async handleRefresh(event: any) {
    this.chatServ.reset();
    await this.getMesages();
    event.target.complete();

  }
  // slideChange() {
  //   this.activeIndex = +this.swiperRef?.nativeElement.swiper.activeIndex;
  // }

  // changeSwipe() {
  //   this.swiperRef?.nativeElement.swiper.slideTo(this.activeIndex)
  // }

  async getMesages() {
    this.messages = await this.chatServ.getChats();
  }

}
