import { Directive, ElementRef, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[ImageFallBack]'
})
export class ImageFallBackDirective {
  cancalToken: any;
  retry: number = 3;
  constructor(private el: ElementRef,
    public domSanit: DomSanitizer
  ) { }

  ionViewDidEnter() {
    this.retry = 3;
    if (this.cancalToken) clearTimeout(this.cancalToken);
  }


  @HostListener("error")
  private onError() {
    if (!this.el) return;
    if (this.retry < 0) {
      if (this.cancalToken) clearTimeout(this.cancalToken);
      return;
    }
    const image = this.el.nativeElement as HTMLImageElement;
    let src = image.src;
    if (src == environment.api) return;
    this.cancalToken = setTimeout(() => {
      if (src.includes("localhost") && this.retry >1) return;
      // image.src = src;
    }, 1000);
    this.retry--;

  }

}
