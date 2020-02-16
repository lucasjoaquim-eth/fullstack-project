import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { Event } from "src/app/models/event";
import { EventService } from "src/app/services/event.service";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"]
})
export class EventComponent implements OnInit {
  listEvent: Event[];
  dataSource: MatTableDataSource<Event>;

  columns: string[] = [
    "eventId",
    "place",
    "date",
    "theme",
    "amountPeople",
    "lot",
    "imagemURL"
  ];
  displayedColumns: string[] = [
    "eventId",
    "place",
    "date",
    "theme",
    "amountPeople",
    "lot",
    "imagemURL"
  ];

  constructor(private dialog: MatDialog, private eventService: EventService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Event>([]);
    this.consultarEvent();
    console.log(this.dataSource);
  }
  consultarEvent(): void {
    this.eventService.list().subscribe(
      data => {
        this.listEvent = data;
        this.dataSource.data = data;
        console.log(this.dataSource.data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */

/*
import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"]
})
export class EventComponent implements OnInit {
  events: any;
  title = "Welcome to Events";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.http.get("http://localhost:5000/api/Event").subscribe(
      response => {
        this.events = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
*/
