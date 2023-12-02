import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})
export class ServiceCardComponent  implements OnInit {
  @Output() onclick: EventEmitter<any> = new EventEmitter();
  @Input() item: any;
  constructor(public domSanit: DomSanitizer) { }

  ngOnInit() {}

}
