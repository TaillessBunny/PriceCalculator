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
  bgComplexities = ["trivial", "simple", "complex"];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.setExtraPanels(1);
  }

  estimateForm = this.fb.group({
    panelCount: ['1'],
    quality: ['Full Color'],
    panel: this.fb.group({
      bgComplexity: ['Simple'],
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

  get extraPanels(){
    return this.estimateForm.get('extraPanels') as FormArray;
  }
  
  getCharacters(n: number){
    return this.extraPanels.controls[n].get('characters') as FormArray;
  }

  setExtraPanels(n : number){
    while(this.extraPanels.length < n){
      this.extraPanels.push(this.addPanelFormGroup());
    }

    while(this.extraPanels.length > n){
      this.extraPanels.removeAt(this.extraPanels.length - 1);
    }
  }

  setCharacterCount(panel: number, chars: number){
    while(this.getCharacters(panel).length < chars){
      this.getCharacters(panel).push(this.addCharacterFormGroup());
    }
    
    while(this.getCharacters(panel).length > chars){
      this.getCharacters(panel).removeAt(this.getCharacters(panel).length - 1);
    }
  }

  addPanelFormGroup(): FormGroup {
    return this.fb.group({
      bgComplexity: ['Simple'],
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