import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICourseInfo } from 'src/app/model/infoData.model';
import { IMyCourse } from 'src/app/model/my.course-model';

@Component({
  selector: 'my-course-card',
  templateUrl: './my-course-card.component.html',
  styleUrls: ['./my-course-card.component.scss'],
})
export class MyCourseCardComponent implements OnInit {
  @Output() onclick: EventEmitter<IMyCourse> = new EventEmitter();
  @Input() item: IMyCourse | undefined;
  constructor(public domSanit: DomSanitizer) { }

  ngOnInit() { }

}
