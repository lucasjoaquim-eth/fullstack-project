import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { EventService } from "src/app/services/event.service";
import { RegisterEventComponent } from "../register-event/register-event.component";
import { iEvent } from "src/app/models/event";
import { ConfirmationDialogComponent } from "src/app/components/confirmation-dialog/confirmation-dialog.component";
import { SnackbarService } from "src/app/services/snackbar.service";

@Component({
  selector: "app-list-event",
  templateUrl: "./list-event.component.html",
  styleUrls: ["./list-event.component.css"],
})
export class ListEventComponent implements OnInit {
  dataSource: MatTableDataSource<iEvent>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  events: iEvent[] = [];
  registerEvent: RegisterEventComponent;

  displayedColumns: string[] = [
    "id",
    "date",
    "place",
    "theme",
    "amountPeople",
    "lots",
    "phone",
    "email",
    "imagemUrl",
    "options",
  ];

  constructor(
    private dialog: MatDialog,
    private eventService: EventService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<iEvent>();
    this.listEvents();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  listEvents(): void {
    this.eventService.getAllEvent().subscribe(
      (events) => {
        this.events = events;
        this.dataSource.data = events;
      },
      (error) => {
        this.snackbarService.message("Erro ao tentar carregar eventos");
      }
    );
  }

  registerDialog(): void {
    let registerDialog = this.dialog.open(RegisterEventComponent, {
      width: "60%",
    });
    registerDialog.afterClosed().subscribe((event) => {
      console.log("Event: ", event);
      this.eventService.postEvent(event).subscribe(
        (result) => {
          if (event) {
            this.snackbarService.message(
              `Evento ${event.theme} adicionado com sucesso`
            );
            this.listEvents();
          } else {
            this.snackbarService.message(
              `Não foi possível adicionar o evento ${event.theme}. Favor verificar os dados`
            );
          }
        },
        (error) => {}
      );
    });
  }

  editDialog(event: iEvent): void {
    let editDialog = this.dialog.open(RegisterEventComponent, {
      width: "60%",
      data: {
        event: event,
      },
    });
    editDialog.afterClosed().subscribe((event) => {
      console.log("Event: ", event);
      this.eventService.putEvent(event).subscribe(
        (result) => {
          if (event && event.id) {
            this.snackbarService.message(
              `Evento ${event.theme} atualizado com sucesso.`
            );
            this.listEvents();
          } else {
            this.snackbarService.message(
              `Não foi possível atualizar o evento ${event.theme}. ID: ${event.id}`
            );
          }
        },
        (error) => {}
      );
    });
  }

  deleteDialog(event: iEvent) {
    let confirmationDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Deletar evento",
        message: `Deseja deletar o evento ${event.theme}?`,
      },
    });
    confirmationDialog.afterClosed().subscribe((data) => {
      this.eventService.deleteEvent(event.id).subscribe(
        (result) => {
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
        (error) => {
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
