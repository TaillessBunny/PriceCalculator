import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  panelCount = 1;
  charCountPanel = [0];
  qualities = ["Full Color", "Flat Color", "Lineart"];
  visibilities = ["Full body", "headshot"];
  bgComplexities = ["trivial", "simple", "complex"];

  panelCountChanged(){
    this.charCountPanel = Array.apply(null, new Array(this.panelCount)).map(()=> 0);
  }

  public setCharArray(index : number, value : number){
    while(this.charCountPanel[index] > value){
      this.charCountPanel[index]--;
    }

    while(this.charCountPanel[index] < value){
      this.charCountPanel[index]++;
    }
    console.log(this.charCountPanel);
  }

  public getCharCountForPanel(panelNumber){
    console.log(this.charCountPanel[panelNumber]);
    return this.charCountPanel[panelNumber];
  }
}