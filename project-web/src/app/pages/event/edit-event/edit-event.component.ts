import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { iEvent } from "src/app/models/event";
import { EventService } from "src/app/services/event.service";
import { ActivatedRoute } from "@angular/router";
import { SnackbarService } from "src/app/services/snackbar.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "src/app/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-edit-event",
  templateUrl: "./edit-event.component.html",
  styleUrls: ["./edit-event.component.css"],
})
export class EditEventComponent implements OnInit {
  editForm: FormGroup;
  event: iEvent = new iEvent();
  previewUrl: any = "../../../../assets/images/upload.png";
  file: File = null;

  get lots(): FormArray {
    return <FormArray>this.editForm.get("lots");
  }

  get socialNetworks(): FormArray {
    return <FormArray>this.editForm.get("socialNetworks");
  }

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private snackbarService: SnackbarService,
    private router: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listEvent();
    this.validationEditForm();
  }

  validationEditForm() {
    this.editForm = this.formBuilder.group({
      id: [],
      imagemUrl: [""],
      date: ["", Validators.required],
      place: [
        "",
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
      phone: ["", [Validators.required]],
      theme: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
      lots: this.formBuilder.array([]),
      socialNetworks: this.formBuilder.array([]),
    });
  }

  listEvent(): void {
    const id = +this.router.snapshot.paramMap.get("id");
    this.eventService.getEventById(id).subscribe(
      (event: iEvent) => {
        this.event = Object.assign({}, event);
        this.previewUrl = `http://localhost:5000/resources/images/${this.event.imagemUrl}`;
        this.editForm.patchValue(this.event);
        this.event.lots.forEach((lot) => {
          this.lots.push(this.createLot(lot));
        });
        this.event.socialNetworks.forEach((socialNetwork) => {
          this.socialNetworks.push(this.createSocialNetwork(socialNetwork));
        });
      },
      (error) => {
        this.snackbarService.message("Erro ao tentar carregar evento");
      }
    );
  }

  createLot(lot: any): FormGroup {
    return this.formBuilder.group({
      id: [lot.id],
      name: [lot.name, [Validators.required]],
      amount: [
        lot.amount,
        [Validators.required, Validators.min(2), Validators.max(120000)],
      ],
      price: [lot.price, [Validators.required]],
      dateInit: [lot.dateInit],
      dateEnd: [lot.dateEnd],
    });
  }

  createSocialNetwork(socialNetwork: any): FormGroup {
    return this.formBuilder.group({
      id: [socialNetwork.id],
      name: [socialNetwork.name, [Validators.required]],
      url: [socialNetwork.url, [Validators.required]],
    });
  }

  addLot() {
    this.lots.push(this.createLot({ id: 0 }));
  }

  addSocialNetwork() {
    this.socialNetworks.push(this.createSocialNetwork({ id: 0 }));
  }

  removeLot(id: number, name: string) {
    if (!name || name == "") {
      name = "Lote";
    }
    let confirmationDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Deletar Lote",
        message: `Deseja deletar ${name}?`,
      },
    });
    confirmationDialog.afterClosed().subscribe((data) => {
      if (data && data.confirm) {
        this.lots.removeAt(id);
      }
    });
  }

  removeSocialNetwork(id: number, name: string) {
    if (!name || name == "") {
      name = "Rede Social";
    }
    let confirmationDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Deletar Rede Social",
        message: `Deseja deletar ${name}?`,
      },
    });
    confirmationDialog.afterClosed().subscribe((data) => {
      if (data && data.confirm) {
        this.socialNetworks.removeAt(id);
      }
    });
  }

  saveEvent() {
    this.event = Object.assign({ id: this.event.id }, this.editForm.value);
    this.uploadImagem();
    this.eventService.putEvent(this.event).subscribe(
      (result) => {
        if (this.event && this.event.id) {
          this.snackbarService.message(
            `Evento ${this.event.theme} atualizado com sucesso.`
          );
        } else {
          this.snackbarService.message(
            `Não foi possível atualizar o evento ${this.event.theme}. ID: ${this.event.id}.`
          );
        }
      },
      (error) => {
        console.log("error.message: ", error.message);
      }
    );
  }

  fileProgress(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files.length) {
      this.file = fileInput.target.files;
    }
    this.preview();
  }

  preview() {
    var mimeType = this.file[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.file[0]);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  uploadImagem() {
    if (this.file) {
      const fileName = this.file[0].name;
      this.event.imagemUrl = fileName;
      this.eventService.postFile(this.file, this.event.imagemUrl).subscribe();
    }
  }
}
