import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { EventService } from "src/app/services/event.service";
import { ThemePalette } from "@angular/material/core";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"]
})
export class EventComponent implements OnInit {
  dataSource: MatTableDataSource<Event>;

  color: ThemePalette = "primary";
  checked = false;
  disabled = false;

  displayedColumns: string[] = [
    "imagemURL",
    "eventId",
    "place",
    "date",
    "theme",
    "amountPeople",
    "lot"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Event>([]);
    this.consultEvent();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  consultEvent(): void {
    this.eventService.list().subscribe(
      data => {
        this.dataSource.data = data;
        console.log(this.dataSource.data);
      },
      error => {
        console.log(error);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  invertChecked() {
    this.checked = !this.checked;
  }
}
/*
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
