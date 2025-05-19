import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { NotesComponent } from './notes/notes.component';
// import { LoginPageComponent } from './components/login-page/login-page.component';
// import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'videos/:videoId/notes', component: NotesComponent }
];
