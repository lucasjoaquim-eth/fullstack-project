import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.http.get('http://localhost:5000/api/Event').subscribe(
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
