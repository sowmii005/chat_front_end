import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  darkMode: boolean = false;
  fontSize: string = 'medium';
  fontStyle: string = 'default';
  brightness: number = 100;
  backgroundColor: string = 'white';

  constructor() {  }
  ngOnInit() {
    this.loadSettings();
  }
  changeBackgroundColor() {
    document.documentElement.style.setProperty('--ion-background-color', this.backgroundColor);
    localStorage.setItem('backgroundColor', this.backgroundColor);
  }

  changeFontSize() {
    document.body.style.fontSize = this.fontSize === 'small' ? '14px' : this.fontSize === 'medium' ? '16px' : '18px';
    localStorage.setItem('fontSize', this.fontSize);
  }

  changeFontStyle() {
    document.body.style.fontStyle = this.fontStyle;
    localStorage.setItem('fontStyle', this.fontStyle);
  }
  changeBrightness() {
    document.documentElement.style.setProperty('--ion-background-color', `rgba(255, 255, 255, ${this.brightness / 100})`);
    localStorage.setItem('brightness', this.brightness.toString());
  }
  loadSettings() {
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      this.fontSize = savedFontSize;
      this.changeFontSize();
    }

    const savedFontStyle = localStorage.getItem('fontStyle');
    if (savedFontStyle) {
      this.fontStyle = savedFontStyle;
      this.changeFontStyle();
    }
    const savedBrightness = localStorage.getItem('brightness');
    if (savedBrightness) {
      this.brightness = parseFloat(savedBrightness);
      this.changeBrightness();
    }
    const savedBackgroundColor = localStorage.getItem('backgroundColor');
    if (savedBackgroundColor) {
      this.backgroundColor = savedBackgroundColor;
      this.changeBackgroundColor();
    }
  }
}