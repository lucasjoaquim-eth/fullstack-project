import {  Component,  OnInit,  Inject,} from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
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
  event: iEvent;
  listEvent: ListEventComponent;
  edit: boolean;
  files = [];
  file: File;

  idEvent: number;
  imagemUrl: string;
  place: string;
  theme: string;
  email: string;
  phone: string;
  date: Date;
  amountPeople: Number;
  registerForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit() {
    this.titulo = this.route.snapshot.data["titulo"];
    this.validation();
    if(this.data){
       this.loadEvent(this.data.event);
    }
  }
  validation() {
    this.registerForm = this.formBuilder.group({
      imagemUrl: ['',[Validators.required]],
      date: [Validators.required],
      place: ["Ibirapuera", [Validators.required]],
      amountPeople: [30, [Validators.required]],
      phone: ["953881222", [Validators.required]],
      theme: [
        "Dotnet Angular",
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      email: ["", [Validators.required, Validators.email]]
    });
  }

  loadEvent(event: iEvent) {
    this.edit = true;
    this.event = Object.assign({},event);
    this.registerForm.patchValue(this.event);
  }

  onFileChange(event){
    const reader  = new FileReader();
    if(event.target.files && event.target.files.length){
        this.file = event.target.files;
        console.log(this.file);
    }
  }

  uploadImagem(){
    const fileName = this.file[0].name;
    this.event.imagemURL = fileName;
    this.eventService.postFile(this.file, fileName).subscribe();
  }

  add(): void {
      this.event = Object.assign(
        { event: this.event },
        this.registerForm.getRawValue()
      );
      this.uploadImagem();
      this.eventService.postEvent(this.event).subscribe(
        event => {
          if (event && event.id) {
            this.snackbarService.message("Evento adicionado com sucesso");
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

  put(){
    this.event = Object.assign(
      { id: this.event.id },
      this.registerForm.getRawValue()
    );
    this.uploadImagem();
    this.eventService.putEvent(this.event).subscribe(
      event => {
        if (event && event.id) {
          this.snackbarService.message(
            `Evento ${event.theme} atualizado com sucesso.`
          );
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
  }

  goToEventList(): void {
    this.router.navigate(["/event"]);
  }
}
