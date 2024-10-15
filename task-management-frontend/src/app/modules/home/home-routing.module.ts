// home-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { authGuard } from '../../services/guard/auth.guard';
import { TaskComponent } from './pages/task/task.component';
import { ProjectComponent } from './pages/project/project.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import {EditTaskComponent} from "./components/edit-task/edit-task.component";
import {AssignTaskComponent} from "./components/assign-task/assign-task.component";
import {CreateProjectComponent} from "./components/create-project/create-project.component";
import {SearchComponent} from "../../services/search/search/search.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: HomePageComponent, canActivate: [authGuard] },
      { path: 'tasks', component: TaskComponent, canActivate: [authGuard] },
      { path: 'projects', component: ProjectComponent, canActivate: [authGuard] },
      { path: 'calendar', component: CalendarComponent, canActivate: [authGuard] },
      { path: 'edit-project/:id', component: EditProjectComponent, canActivate: [authGuard] },
      { path: "edit-task/:id", component: EditTaskComponent, canActivate: [authGuard] },
      { path: "assign-task/:id", component: AssignTaskComponent, canActivate: [authGuard] },
      { path: "create-project", component: CreateProjectComponent, canActivate: [authGuard] },
      { path: "search", component: SearchComponent, canActivate: [authGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
