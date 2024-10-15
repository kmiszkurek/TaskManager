import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MenuComponent} from "../../components/menu/menu.component";
import {HomePageComponent} from "../home-page/home-page.component";
import {ProjectComponent} from "../project/project.component";
import {TaskComponent} from "../task/task.component";
import {CalendarComponent} from "../calendar/calendar.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    HomePageComponent,
    ProjectComponent,
    TaskComponent,
    CalendarComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
