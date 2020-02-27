import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { EventService } from "src/app/services/event.service";
import { ThemePalette } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { EventDialogComponent } from "./event-dialog/eventDialog.component";
import { FormControl, Validators, FormGroup } from "@angular/forms";

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
  registerForm: FormGroup;

  imagemUrl: string;
  place: string;
  theme: string;
  email: string;
  phone: string;
  date: Date;
  amountPeople: Number;

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  displayedColumns: string[] = [
    "imagemUrl",
    "id",
    "date",
    "place",
    "theme",
    "amountPeople",
    "lots",
    "phone",
    "email",
    "star"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private eventService: EventService, public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Event>([]);
    this.getEvents();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.validation();
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
  openDialog(): void {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: "250px",
      data: { event: this._events }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      data: {
        event: this._events;
      }
    });
  }
  validation() {
    this.registerForm = new FormGroup({
      imagemUrl: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
      place: new FormControl("", Validators.required),
      theme: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      amountPeople: new FormControl("", [
        Validators.required,
        Validators.maxLength(1200)
      ]),
      phone: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required)
    });
  }

  saveChange() {}
  close() {}
}
