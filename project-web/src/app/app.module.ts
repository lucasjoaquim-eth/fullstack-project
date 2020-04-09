import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { DateFormatPipe } from "./helpers/date-format.pipe";
import { DateTimeFormatPipe } from "./helpers/date-time-format.pipe";
import { LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt";

import { EventService } from "./services/event.service";
import { AuthInterceptor } from "./auth/auth.interceptor";

import { AppComponent } from "./app.component";
import { NavComponent } from "./pages/nav/nav.component";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";
import { HomeComponent } from "./pages/home/home.component";
import { RegisterEventComponent } from "./pages/event/register-event/register-event.component";
import { ListEventComponent } from "./pages/event/list-event/list-event.component";
import { RegisterSpeakerComponent } from "./pages/speaker/register-speaker/register-speaker.component";
import { ListSpeakerComponent } from "./pages/speaker/list-speaker/list-speaker.component";
import { TitleComponent } from "./pages/title/title.component";
import { UserComponent } from "./pages/user/user.component";
import { LoginUserComponent } from "./pages/user/login-user/login-user.component";
import { RegisterUserComponent } from "./pages/user/register-user/register-user.component";
import { EditEventComponent } from './pages/event/edit-event/edit-event.component';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DateTimeFormatPipe,
    DateFormatPipe,
    RegisterEventComponent,
    ListEventComponent,
    ConfirmationDialogComponent,
    HomeComponent,
    ListSpeakerComponent,
    RegisterSpeakerComponent,
    TitleComponent,
    UserComponent,
    LoginUserComponent,
    RegisterUserComponent,
    EditEventComponent,
  ],
  exports: [],
  imports: [
    MatProgressBarModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatButtonToggleModule,
  ],
  providers: [
    EventService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: "pt-BR" },
  ],
  entryComponents: [RegisterEventComponent, ConfirmationDialogComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
