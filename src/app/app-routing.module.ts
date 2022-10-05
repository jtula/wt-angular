import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectComponent } from './add-project/add-project.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'projects', title: 'Projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'contact', title: 'Contact Us', component: ContactComponent  },
  { path: 'dashboard', title: 'Dashboard',component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'add-project', title: 'Add new project', component: AddProjectComponent },
  { path: 'edit-project/:id', title: 'Edit project',component: EditProjectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
