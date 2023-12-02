import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICourseInfo } from 'src/app/model/infoData.model';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Output() onclick: EventEmitter<ICourseInfo> = new EventEmitter();
  @Input() item: ICourseInfo | undefined;
  constructor(public domSanit: DomSanitizer) { }

  ngOnInit() { }

}
