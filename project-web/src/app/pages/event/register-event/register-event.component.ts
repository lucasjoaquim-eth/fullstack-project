import { Component, OnInit, Inject } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import {
  MatDialogRef,
  MatDialog,
  MatDialogClose
} from "@angular/material/dialog";
import { EventService } from "src/app/services/event.service";
import { ListEventComponent } from "../list-event/list-event.component";
import { iEvent } from "../../../models/event";
import { ActivatedRoute, Router } from "@angular/router";
import { error } from "@angular/compiler/src/util";

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
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.titulo = this.route.snapshot.data["titulo"];
    this.route.params.subscribe(params => {
      this.idEvent = params["id"];
      if (this.idEvent) {
        this.eventService.getEventById(this.idEvent).subscribe(event => {
          this.event = event;
          this.registerForm.patchValue(this.event);
          this.edit = true;
        });
      }
    });
    this.validation();
  }

  validation() {
    this.registerForm = this.formBuilder.group({
      imagemUrl: ["", [Validators.required]],
      date: ["", [Validators.required]],
      place: ["", [Validators.required]],
      amountPeople: ["", [Validators.required, Validators.maxLength(1200)]],
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
            console.log(
              `Evento ${event.theme} atualizado com sucesso. ID: ${event.id}`
            );
            this.goToEventList();
          } else {
            console.log(
              `Não foi possível atualizar o evento ${event.theme}. ID: ${event.id}`
            );
          }
        },
        error => {
          console.log(this.event, error);
        }
      );
    } else {
      this.event = this.registerForm.getRawValue();

      this.eventService.postEvent(this.event).subscribe(
        event => {
          if (event && event.id) {
            console.log("Evento adicionado com sucesso");
            this.goToEventList();
          } else {
            console.log(
              "Não foi possível adicionar Evento. Favor verificar os dados"
            );
          }
        },
        error => {
          console.log(error);
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
//         console.log(newEvent);
//         this.goToEventList();
//       },
//       error => {
//         console.log(error);
//       }
//     );
//   }
// }
