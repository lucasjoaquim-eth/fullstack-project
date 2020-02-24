import { Component, OnInit, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA
} from "@angular/material/dialog";


@Component({
  selector: "app-eventDialog",
  templateUrl: "./eventDialog.component.html",
  styleUrls: ["./eventDialog.component.css"]
})
export class EventDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Event) {}
}
