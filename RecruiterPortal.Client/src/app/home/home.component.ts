import { ViewChild } from '@angular/core';
import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('wrapperDiv', { static: true }) div: any;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  onResize(event) {
    const meidaWidth = event.target.innerWidth;
    //console.log(meidaWidth);
    if (meidaWidth > 768) {
      const hasClass = this.div.nativeElement.classList.contains('toggled');
      if (hasClass) {
        this.renderer.removeClass(this.div.nativeElement, 'toggled');
      }
    }
  }

  showHideMenu() {
    //console.log(this.div.nativeElement);
    const hasClass = this.div.nativeElement.classList.contains('toggled');
    if (hasClass) {
      this.renderer.removeClass(this.div.nativeElement, 'toggled');
    } else {
      this.renderer.addClass(this.div.nativeElement, 'toggled');
    }
  }

  hideSideMenu() {
    //console.log(this.div.nativeElement);
    const hasClass = this.div.nativeElement.classList.contains('toggled');
    if (hasClass) {
      this.renderer.removeClass(this.div.nativeElement, 'toggled');
    } 
  }
}
