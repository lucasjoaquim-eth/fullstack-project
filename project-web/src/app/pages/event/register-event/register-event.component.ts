import { Component, OnInit, Inject } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
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
  fileNameToUpdate: string;

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
    public dialogRef: MatDialogRef<RegisterEventComponent>,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.titulo = this.route.snapshot.data["titulo"];
    this.validation();
    if (this.data) {
      this.loadEvent(this.data.event);
      this.edit = true;
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
    this.event = Object.assign({}, event);
    this.fileNameToUpdate = event.imagemUrl;
    this.registerForm.patchValue(this.event);
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files;
      console.log(this.file);
    }
  }

  uploadImagem() {
    if (this.edit) {
      this.eventService.postFile(this.file, this.fileNameToUpdate)
    } else {
      const fileName = this.file[0].name;
      this.event.imagemUrl = fileName;
      this.eventService.postFile(this.file, fileName);
    }
  }

  add(): void {
    this.event = Object.assign(
      { event: this.event },
      this.registerForm.getRawValue()
    );
    this.uploadImagem();
    this.dialogRef.close(this.event);
  }

  put() {
    this.event = Object.assign(
      { id: this.event.id },
      this.registerForm.value
    );
    this.uploadImagem();
    this.dialogRef.close(this.event);
  }
}
