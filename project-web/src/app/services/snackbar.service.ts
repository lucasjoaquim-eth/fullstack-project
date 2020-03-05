import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class SnackbarService {
  readonly snackbarOptions: any = { duration: 4000, verticalPosition: "top" };

  constructor(private snackBar: MatSnackBar) {}

  message(message: string): void {
    this.snackBar.open(message, "Fechar", this.snackbarOptions);
  }
}
