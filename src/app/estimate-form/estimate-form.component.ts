import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-estimate-form',
  templateUrl: './estimate-form.component.html',
  styleUrls: ['./estimate-form.component.sass']
})
export class EstimateFormComponent implements OnInit {
  qualities = ["Full Color", "Flat Color", "Lineart"];
  visibilities = ["Full body", "headshot"];
  bgComplexities = ["Trivial", "Simple", "Complex"];

  constructor(private fb: FormBuilder) { }

  LINEART_BASE = 15;
  LINEART_EXTRA = 10;
  FLATCOLOR_BASE = 22;
  FLATCOLOR_EXTRA = 15;
  FULLCOLOR_BASE = 30;
  FULLCOLOR_EXTRA = 20;

  HEADSHOT_FACTOR = 0.6;

  BACKGROUND_TRIVIAL = 0;
  BACKGROUND_SIMPLE = 5;
  BACKGROUND_COMPLEX = 10;

  EXTRA_WINDOW = 5;

  ACTION_LINE = 50;
  ACTION_FLAT = 60;
  ACTION_FULL = 70;

  price = 0;

  estimateForm = this.fb.group({
    panelCount: ['1'],
    quality: ['Full Color'],
    panel: this.fb.group({
      bgComplexity: [''],
      charCount: ['0'],
      character: this.fb.group({
        visibility: ['Full Body']
      }),
      characters: this.fb.array([]),
      windowCount: ['0'],
      animatedCount: ['0']
    }),
    extraPanels: this.fb.array([])
  });

  ngOnInit() {
    this.setExtraPanels(1);
    this.estimateForm.valueChanges.subscribe(value => {this.calculatePrize()});
  }

  calculatePrize(){
    this.price = 0;

    if(isNaN(this.estimateForm.get('panelCount').value) || 
    Number(this.estimateForm.get('panelCount').value) < 1){
      return;
    }

    for(var i = 0; i < this.extraPanels.length; i++){
      if(isNaN(this.extraPanels.controls[i].get('charCount').value) ||
      this.extraPanels.controls[i].get('charCount').value < 0) {
        return;
      }
    }
    
    var fbChars = 0;
    var hbChars = 0;

    //Counting backgrounds
    for(var i = 0; i < this.extraPanels.length; i++){
      var complexity = this.extraPanels.controls[i].get('bgComplexity').value;
      switch(complexity){
        case 'Trivial':{
          this.price += this.BACKGROUND_TRIVIAL;
          break;
        }
        case 'Simple':{
          this.price += this.BACKGROUND_SIMPLE;
          break;
        }
        case 'Complex':{
          this.price += this.BACKGROUND_COMPLEX;
          break;
        }
      }
    }

    //Counting characters
    for(var i = 0; i < this.extraPanels.length; i++){
      for(var j = 0; j < this.getCharacters(i).length; j++){
        if(this.getCharacters(i).controls[j].get('visibility').value == 'Full Body'){
          fbChars++;
        }else{
          hbChars++;
        }
      }
    }

    //Counting animated actions
    var totalAnimated = 0;
    for(var i = 0; i < this.extraPanels.length; i++){
      var anCount = Number(this.extraPanels.controls[i].get('animatedCount').value);
      if(anCount >= 0)
      totalAnimated += anCount;
    }

    //Price of characters and animated actions
    switch(this.estimateForm.get('quality').value){
      case 'Lineart': {
        if(fbChars > 0){
          this.price += this.LINEART_BASE + (fbChars - 1) * this.LINEART_EXTRA;
        }
        if(hbChars > 0){
          this.price += hbChars * this.LINEART_BASE * this.HEADSHOT_FACTOR;
        }
        this.price += totalAnimated * this.ACTION_LINE;
        break;
      }
      case 'Flat Color': {
        if(fbChars > 0){
          this.price += this.FLATCOLOR_BASE + (fbChars - 1) * this.FLATCOLOR_EXTRA;
        }
        if(hbChars > 0){
          this.price += hbChars * this.FLATCOLOR_BASE * this.HEADSHOT_FACTOR;
        }
        this.price += totalAnimated * this.ACTION_FLAT;
        break;
      }
      case 'Full Color': {
        if(fbChars > 0){
          this.price += this.FULLCOLOR_BASE + (fbChars - 1) * this.FULLCOLOR_EXTRA;
        }
        if(hbChars > 0){
          this.price += hbChars * this.FULLCOLOR_BASE * this.HEADSHOT_FACTOR;
        }
        this.price += totalAnimated * this.ACTION_FULL;
        break;
      }
    }

    //Count extra windows
    var totalWindows = 0;
    for(var i = 0; i < this.extraPanels.length; i++){
      var winCount = Number(this.extraPanels.controls[i].get('windowCount').value);
      if(winCount >= 0)
      totalWindows += winCount;
    }
    //Price of extra windows
    this.price += totalWindows * this.EXTRA_WINDOW;
  }

  get extraPanels(){
    return this.estimateForm.get('extraPanels') as FormArray;
  }
  
  getCharacters(n: number){
    return this.extraPanels.controls[n].get('characters') as FormArray;
  }

  setExtraPanels(n : number){
    if(n <0){
      n = 0;
    }

    while(this.extraPanels.length < n){
      this.extraPanels.push(this.addPanelFormGroup());
    }

    while(this.extraPanels.length > n){
      this.extraPanels.removeAt(this.extraPanels.length - 1);
    }
  }

  setCharacterCount(panel: number, chars: number){
    if(chars < 0){
      chars = 0;
    }

    while(this.getCharacters(panel).length < chars){
      this.getCharacters(panel).push(this.addCharacterFormGroup());
    }
    
    while(this.getCharacters(panel).length > chars){
      this.getCharacters(panel).removeAt(this.getCharacters(panel).length - 1);
    }
  }

  addPanelFormGroup(): FormGroup {
    return this.fb.group({
      bgComplexity: ['Trivial'],
      charCount: ['0'],
      characters: this.fb.array([]),
      windowCount: ['0'],
      animatedCount: ['0']
    });
  }

  addCharacterFormGroup(): FormGroup {
    return this.fb.group({
      visibility: ['Full Body']
    });
  }
}