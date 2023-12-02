import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.scss'],
})
export class TeacherCardComponent  implements OnInit {
  @Output() onclick: EventEmitter<any> = new EventEmitter();
  @Input() item: any;
  constructor(public domSanit: DomSanitizer) { }

  ngOnInit() { }


}
