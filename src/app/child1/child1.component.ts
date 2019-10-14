import { Component, OnInit, Input } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-child1",
  templateUrl: "./child1.component.html",
  styleUrls: ["./child1.component.scss"]
})
export class Child1Component implements OnInit {
  constructor() {}

  @Input()
  users = [];

  ngOnInit() {}
  logClick(ngForm: NgForm) {
    console.log(ngForm.value);
  }
}
