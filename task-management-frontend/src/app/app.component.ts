import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthenticationService} from "./services/services";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-management-frontend';
  authService = inject(AuthenticationService);

}
