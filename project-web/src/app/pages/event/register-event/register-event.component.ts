import { Component, OnInit, Inject } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import {
  MatDialogRef,
  MatDialog,
  MatDialogClose,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { EventService } from "src/app/services/event.service";
import { ListEventComponent } from "../list-event/list-event.component";
import { iEvent } from "../../../models/event";
import { ActivatedRoute, Router } from "@angular/router";
import { SnackbarService } from "src/app/services/snackbar.service";

@Component({
  selector: "app-register-event",
  templateUrl: "./register-event.component.html",
  styleUrls: ["./register-event.component.css"]
})
export class RegisterEventComponent implements OnInit {
  title = "Cadastro de Eventos";
  titulo: string = "";

  idEvent: number;
  imagemUrl: string;
  place: string;
  theme: string;
  email: string;
  phone: string;
  date: Date;
  amountPeople: Number;
  registerForm: FormGroup;

  edit: boolean;

  event: iEvent;

  listEvent: ListEventComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<RegisterEventComponent>,
    private eventService: EventService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.titulo = this.route.snapshot.data["titulo"];
    // this.route.params.subscribe(params => {
    //   this.idEvent = params["id"];
    //   if (this.idEvent) {
    //     this.eventService.getEventById(this.idEvent).subscribe(event => {
    //       this.event = event;
    //       this.registerForm.patchValue(this.event);
    //       this.edit = true;
    //     });
    //   }
    // });
    this.validation();
    this.carregar(this.data.event);
  }

  carregar(_event: iEvent) {
    this.eventService.getEventById(_event.id).subscribe(_event => {
      if (_event) {
        this.event = _event;
        this.registerForm.patchValue(this.event);
        this.edit = true;
      } else {
        this.snackbarService.message("Erro ao atualizar");
      }
    }),
      error => {
        this.snackbarService.message(
          `Erro: ${error}, ao atualizar o evento ${this.event.id}`
        );
      };
  }

  validation() {
    this.registerForm = this.formBuilder.group({
      imagemUrl: ["", [Validators.required]],
      date: ["", [Validators.required]],
      place: ["", [Validators.required]],
      amountPeople: [""],
      phone: ["", [Validators.required]],
      theme: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      email: ["", [Validators.required, Validators.email]]
    });
  }

  add(edit?: boolean): void {
    if (edit) {
      this.event = Object.assign(
        { id: this.event.id },
        this.registerForm.getRawValue()
      );
      this.eventService.putEvent(this.event).subscribe(
        event => {
          if (event && event.id) {
            this.snackbarService.message(
              `Evento ${event.theme} atualizado com sucesso.`
            );
            this.dialogRef.close(event);
          } else {
            this.snackbarService.message(
              `Não foi possível atualizar o evento ${event.theme}. ID: ${event.id}`
            );
          }
        },
        error => {
          this.snackbarService.message(
            `Erro: ${error}, ao atualizar o evento ${this.event.theme}`
          );
        }
      );
    } else {
      this.event = Object.assign(
        { event: this.event },
        this.registerForm.getRawValue()
      );
      this.eventService.postEvent(this.event).subscribe(
        event => {
          if (event && event.id) {
            this.snackbarService.message("Evento adicionado com sucesso");
            this.listEvent.listEvents();
          } else {
            this.snackbarService.message(
              "Não foi possível adicionar Evento. Favor verificar os dados"
            );
          }
        },
        error => {
          this.snackbarService.message(`Erro ao salvar: ${error}`);
        }
      );
    }
  }

  goToEventList(): void {
    this.router.navigate(["/event"]);
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}

// saveUpdate(edit?: boolean) {
//   if (this.registerForm.valid) {
//     this.event = Object.assign({}, this.registerForm.value);
//     this.eventService.postEvent(this.event).subscribe(
//       (newEvent: iEvent) => {
//            this.snackbarService.message(newEvent);
//         this.goToEventList();
//       },
//       error => {
//            this.snackbarService.message(error);
//       }
//     );
//   }
// }
