import { Component, OnInit, Inject } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { EventService } from "src/app/services/event.service";
import { iEvent } from "../../../models/event";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-register-event",
  templateUrl: "./register-event.component.html",
  styleUrls: ["./register-event.component.css"],
})
export class RegisterEventComponent implements OnInit {
  event: iEvent;
  edit: boolean;
  file: File;
  registerForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RegisterEventComponent>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.validationRegisterForm();
    if (this.data) {
      this.loadEvent(this.data.event);
      this.edit = true;
    }
  }

  validationRegisterForm() {
    this.registerForm = this.formBuilder.group({
      imagemUrl: ["", [Validators.required]],
      date: [Validators.required],
      place: [
        "Ibirapuera",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      amountPeople: [
        "",
        [Validators.required, Validators.min(2), Validators.max(120000)],
      ],
      phone: ["953881222", [Validators.required]],
      theme: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
    });
  }

  loadEvent(event: iEvent) {
    this.event = Object.assign({}, event);
    this.event.imagemUrl = "";
    this.registerForm.patchValue(this.event);
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
    this.event = Object.assign({ id: this.event.id }, this.registerForm.value);
    this.uploadImagem();
    this.dialogRef.close(this.event);
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files;
    }
  }

  uploadImagem() {
    if (this.edit) {
      const fileName = this.file[0].name;
      this.event.imagemUrl = fileName;
      this.eventService.postFile(this.file, this.event.imagemUrl).subscribe();
    } else {
      const fileName = this.file[0].name;
      this.event.imagemUrl = fileName;
      this.eventService.postFile(this.file, this.event.imagemUrl).subscribe();
    }
  }
}
