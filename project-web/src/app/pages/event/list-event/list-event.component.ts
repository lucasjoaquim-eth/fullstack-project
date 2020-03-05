import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { EventService } from "src/app/services/event.service";
import { RegisterEventComponent } from "../register-event/register-event.component";
import { iEvent } from "src/app/models/event";
import { Router } from "@angular/router";
import { ConfirmationDialogComponent } from "src/app/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-list-event",
  templateUrl: "./list-event.component.html",
  styleUrls: ["./list-event.component.css"]
})
export class ListEventComponent implements OnInit {
  dataSource: MatTableDataSource<iEvent>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

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
    "options"
  ];

  events: iEvent[] = [];
  registerEvent: RegisterEventComponent;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<iEvent>([]);
    this.listEvents();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  listEvents(): void {
    this.eventService.getAllEvent().subscribe(
      events => {
        this.events = events;
        this.dataSource.data = events;
        console.log(events);
      },
      error => {
        console.log("Erro ao consultar produto: ", error);
      }
    );
  }

  edit(event: iEvent) {
    this.router.navigate([`/event/register/${event.id}/edit`]);
  }

  delete(event: iEvent) {
    let confirmationDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Deletar evento",
        message: `Deseja deletar o evento ${event.theme}?`
      }
    });
    confirmationDialog.afterClosed().subscribe(data => {
      this.eventService.deleteEvent(event.id).subscribe(
        result => {
          if (data && data.confirm && event) {
            console.log(
              `Evento ${event.theme} deletado com sucesso. Dados: ${event.id}`
            );
            this.listEvents();
          } else {
            console.log(
              `Erro ao deletar ${event.theme}, favor verificar os dados. Dados: ${event.id}`
            );
            console.log(result);
            console.log(data);
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  openDialog(): void {
    this.dialog.open(RegisterEventComponent, {
      width: "500px"
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
