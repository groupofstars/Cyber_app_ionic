import { Component, Input, OnInit } from '@angular/core';
import { register } from 'swiper/element';
register();
@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent implements OnInit {
  @Input() content: string = '';
  @Input() cardTitle: string = '';
  @Input() cardSubtitle: string = '';
  @Input() icon: string = '';
  constructor() { }

  ngOnInit() { }

}
