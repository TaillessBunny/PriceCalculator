import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let FormComponent = class FormComponent {
    constructor() {
        this.hasError = true;
        this.name = "";
        this.color = "yellow";
        this.colors = ["red", "orange", "yellow", "green", "blue"];
        this.message = "bienvenido de nuevo!";
        this.date = new Date();
        this.childEvent = new EventEmitter();
    }
    ngOnInit() {
    }
    onClick() {
        this.hasError = !this.hasError;
        this.childEvent.emit('Holaaaaaaa!');
    }
};
tslib_1.__decorate([
    Input('parentData')
], FormComponent.prototype, "myName", void 0);
tslib_1.__decorate([
    Output()
], FormComponent.prototype, "childEvent", void 0);
FormComponent = tslib_1.__decorate([
    Component({
        selector: 'app-form',
        templateUrl: './form.component.html',
        styleUrls: ['./form.component.sass']
    })
], FormComponent);
export { FormComponent };
//# sourceMappingURL=form.component.js.map