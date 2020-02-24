import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CommonModule } from "@angular/common";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatFormFieldModule } from "@angular/material/form-field";

import { EventService } from "./services/event.service";

import { AppComponent } from "./app.component";
import { EventComponent } from "./pages/event/event.component";
import { EventDialogComponent } from "./pages/event/event-dialog/eventDialog.component";
import { NavComponent } from "./pages/nav/nav.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { DateFormatPipe } from "./helpers/date-format.pipe";
import { DateTimeFormatPipe } from "./helpers/date-time-format.pipe";
@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    EventDialogComponent,
    NavComponent,
    DateTimeFormatPipe,
    DateFormatPipe
  ],
  exports: [],
  imports: [
    MatFormFieldModule,
    MatTooltipModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  providers: [EventService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
