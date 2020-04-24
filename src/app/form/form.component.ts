import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  hasError = true;
  public name = "";
  public color = "yellow";
  public colors = ["red", "orange", "yellow", "green", "blue"];
  public message = "bienvenido de nuevo!";
  public date = new Date();
  @Input('parentData') public myName;
  @Output() public childEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick(){
    this.hasError = !this.hasError;
    this.childEvent.emit('Holaaaaaaa!');
  }
}