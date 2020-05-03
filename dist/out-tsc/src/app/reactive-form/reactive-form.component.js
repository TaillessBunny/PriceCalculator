import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
let ReactiveFormComponent = class ReactiveFormComponent {
    constructor() {
        this.panelCount = 1;
        this.charCountPanel = [0];
        this.qualities = ["Full Color", "Flat Color", "Lineart"];
        this.visibilities = ["Full body", "headshot"];
        this.bgComplexities = ["trivial", "simple", "complex"];
        this.estimateForm = new FormGroup({
            numOfPanels: new FormControl(''),
            quality: new FormControl(''),
        });
    }
    ngOnInit() {
    }
    panelCountChanged() {
        this.charCountPanel = Array.apply(null, new Array(this.panelCount)).map(() => 0);
    }
    setCharArray(index, value) {
        while (this.charCountPanel[index] > value) {
            this.charCountPanel[index]--;
        }
        while (this.charCountPanel[index] < value) {
            this.charCountPanel[index]++;
        }
        console.log(this.charCountPanel);
    }
    getCharCountForPanel(panelNumber) {
        console.log(this.charCountPanel[panelNumber]);
        return this.charCountPanel[panelNumber];
    }
};
ReactiveFormComponent = tslib_1.__decorate([
    Component({
        selector: 'app-reactive-form',
        templateUrl: './reactive-form.component.html',
        styleUrls: ['./reactive-form.component.sass']
    })
], ReactiveFormComponent);
export { ReactiveFormComponent };
//# sourceMappingURL=reactive-form.component.js.map