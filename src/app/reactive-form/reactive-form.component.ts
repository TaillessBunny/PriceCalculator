import { Component, OnInit, NgModule } from '@angular/core';
import { Estimate } from '../estimate';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.sass']
})
export class ReactiveFormComponent implements OnInit {
  panelCount = 1;
  charCountPanel = [0];
  qualities = ["Full Color", "Flat Color", "Lineart"];
  visibilities = ["Full body", "headshot"];
  bgComplexities = ["trivial", "simple", "complex"];

  estimateModel = new Estimate(1, "Full Color", null);

  estimateForm = new FormGroup({
    numOfPanels: new FormControl(''),
    quality: new FormControl(''), 
  });

  constructor() { }

  ngOnInit() {
  }

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
