import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthenticationService } from "../../../../services/services/authentication.service";
import { FormsModule } from "@angular/forms";
import {ProjectService} from "../../../../services/services/project.service";
import {SearchComponent} from "../../../../services/search/search/search.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    SearchComponent
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  fullName: string = '';


  constructor(

  ) {
    this.fullName = this.getFullName();
  }

  ngOnInit(): void {
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    window.location.reload();
  }

  getFullName(): string {
    return localStorage.getItem('fullName') || 'User';
  }

}
