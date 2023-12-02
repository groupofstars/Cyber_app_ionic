import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'icon-input',
  templateUrl: './icon-input.component.html',
  styleUrls: ['./icon-input.component.scss'],
})
export class IconInputComponent implements OnInit {

  @Input() placeholder: string = "";
  constructor() { }

  ngOnInit() { }

}
