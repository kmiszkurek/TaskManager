import {AppComponent} from "./app.component";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {CodeInputModule} from "angular-code-input";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ActivateAccountComponent} from "./pages/activate-account/activate-account.component";
import {FullCalendarModule} from "@fullcalendar/angular";


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CodeInputModule,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    FullCalendarModule
  ],
  providers: [
    HttpClient
  ]
})
export class AppModule { }
