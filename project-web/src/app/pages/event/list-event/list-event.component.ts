import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { EventService } from "src/app/services/event.service";
import { RegisterEventComponent } from "../register-event/register-event.component";
import { iEvent } from "src/app/models/event";
import { Router } from "@angular/router";
import { ConfirmationDialogComponent } from "src/app/components/confirmation-dialog/confirmation-dialog.component";
import { SnackbarService } from "src/app/services/snackbar.service";

@Component({
  selector: "app-list-event",
  templateUrl: "./list-event.component.html",
  styleUrls: ["./list-event.component.css"]
})
export class ListEventComponent implements OnInit {
  dataSource: MatTableDataSource<iEvent>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  versaoEventDialogRef: MatDialogRef<RegisterEventComponent>;

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
    private eventService: EventService,
    private snackbarService: SnackbarService
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
      },
      error => {
        this.snackbarService.message("Erro ao tentar carregar eventos");
      }
    );
  }

  registerDialog(): void {
    this.dialog.open(RegisterEventComponent, {});
  }

  editDialog(event: iEvent): void {
    let registerDialog = this.dialog.open(RegisterEventComponent, {
      data: {
        event: event
      }
    });
    registerDialog.afterClosed().subscribe(versaoEventRef => {
      if (versaoEventRef) {
        event = versaoEventRef;
        this.listEvents();
      } else {
        console.log(event);
      }
    });
  }

  deleteDialog(event: iEvent) {
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
            this.snackbarService.message(
              `O evento ${event.theme} foi deletado com sucesso.`
            );
            this.listEvents();
          } else {
            this.snackbarService.message(
              `Erro ao deletar ${event.theme}, favor verificar os dados. Dados: ${event.id}`
            );
          }
        },
        error => {
          this.snackbarService.message(
            `Erro ${error} ao deletar ${event.theme}`
          );
        }
      );
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
