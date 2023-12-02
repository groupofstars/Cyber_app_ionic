import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input() noName: boolean = false;
  @Input() noSlogan: boolean = false;
  constructor() { }

  ngOnInit() { }

}
