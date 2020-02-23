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
  _events: Event[];
  color: ThemePalette = "primary";
  checked = false;
  disabled = false;

  displayedColumns: string[] = [
    "id",
    "date",
    "place",
    "theme",
    "amountPeople",
    "imagemUrl",
    "phone",
    "email"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Event>([]);
    this.getEvents();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getEvents(): void {
    this.eventService.getAllEvent().subscribe(
      _events => {
        this.dataSource.data = _events;
        console.log(_events);
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
