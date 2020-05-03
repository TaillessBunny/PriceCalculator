import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let EstimateFormComponent = class EstimateFormComponent {
    constructor(fb) {
        this.fb = fb;
        this.qualities = ["Full Color", "Flat Color", "Lineart"];
        this.visibilities = ["Full body", "headshot"];
        this.bgComplexities = ["trivial", "simple", "complex"];
        this.LINEART_BASE = 15;
        this.LINEART_EXTRA = 10;
        this.FLATCOLOR_BASE = 22;
        this.FLATCOLOR_EXTRA = 15;
        this.FULLCOLOR_BASE = 30;
        this.FULLCOLOR_EXTRA = 20;
        this.HEADSHOT_FACTOR = 0.6;
        this.BACKGROUND_TRIVIAL = 0;
        this.BACKGROUND_SIMPLE = 5;
        this.BACKGROUND_COMPLEX = 10;
        this.EXTRA_WINDOW = 5;
        this.EXTRA_PANEL_FACTOR = (2 / 3);
        this.ACTION_LINE = 50;
        this.ACTION_FLAT = 60;
        this.ACTION_FULL = 70;
        this.price = 0;
        this.estimateForm = this.fb.group({
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
    }
    ngOnInit() {
        this.setExtraPanels(1);
        this.estimateForm.valueChanges.subscribe(value => { this.calculatePrize(); });
    }
    calculatePrize() {
        this.price = 0;
        var fbChars = 0;
        var hbChars = 0;
        //Counting characters
        for (var i = 0; i < this.extraPanels.length; i++) {
            for (var j = 0; j < this.getCharacters(i).length; j++) {
                if (this.getCharacters(i).controls[j].get('visibility').value == 'Full Body') {
                    fbChars++;
                }
                else {
                    hbChars++;
                }
            }
        }
        console.log(hbChars);
        //Counting animated actions
        for (var i = 0; this.extraPanels.length; i++) {
        }
        //Price of characters
        switch (this.estimateForm.get('quality').value) {
            case 'Lineart': {
                if (fbChars > 0) {
                    this.price += this.LINEART_BASE + (fbChars - 1) * this.LINEART_EXTRA;
                }
                if (hbChars > 0) {
                    this.price += hbChars * this.LINEART_EXTRA * this.HEADSHOT_FACTOR;
                }
                break;
            }
            case 'Flat Color': {
                if (fbChars > 0) {
                    this.price += this.FLATCOLOR_BASE + (fbChars - 1) * this.FLATCOLOR_EXTRA;
                }
                if (hbChars > 0) {
                    this.price += hbChars * this.FLATCOLOR_EXTRA * this.HEADSHOT_FACTOR;
                }
                break;
            }
            case 'Full Color': {
                if (fbChars > 0) {
                    this.price += this.FULLCOLOR_BASE + (fbChars - 1) * this.FULLCOLOR_EXTRA;
                }
                if (hbChars > 0) {
                    this.price += hbChars * this.FULLCOLOR_EXTRA * this.HEADSHOT_FACTOR;
                }
                break;
            }
        }
        //Count extra windows
        var totalWindows = 0;
        for (var i = 0; i < this.extraPanels.length; i++) {
            console.log(this.extraPanels[i].get('windowCount').value);
            totalWindows += this.extraPanels.controls[i].get('windowCount').value;
        }
        //Price of extra windows
        this.price += totalWindows * this.EXTRA_WINDOW;
        //this.prize = fbChars + hbChars/10;
    }
    get extraPanels() {
        return this.estimateForm.get('extraPanels');
    }
    getCharacters(n) {
        return this.extraPanels.controls[n].get('characters');
    }
    setExtraPanels(n) {
        while (this.extraPanels.length < n) {
            this.extraPanels.push(this.addPanelFormGroup());
        }
        while (this.extraPanels.length > n) {
            this.extraPanels.removeAt(this.extraPanels.length - 1);
        }
    }
    setCharacterCount(panel, chars) {
        while (this.getCharacters(panel).length < chars) {
            this.getCharacters(panel).push(this.addCharacterFormGroup());
        }
        while (this.getCharacters(panel).length > chars) {
            this.getCharacters(panel).removeAt(this.getCharacters(panel).length - 1);
        }
    }
    addPanelFormGroup() {
        return this.fb.group({
            bgComplexity: ['Simple'],
            charCount: ['0'],
            characters: this.fb.array([]),
            windowCount: ['0'],
            animatedCount: ['0']
        });
    }
    addCharacterFormGroup() {
        return this.fb.group({
            visibility: ['Full Body']
        });
    }
};
EstimateFormComponent = tslib_1.__decorate([
    Component({
        selector: 'app-estimate-form',
        templateUrl: './estimate-form.component.html',
        styleUrls: ['./estimate-form.component.sass']
    })
], EstimateFormComponent);
export { EstimateFormComponent };
//# sourceMappingURL=estimate-form.component.js.map