import { Routes } from '@angular/router';
import { WelcomeComponent } from '../components/welcome/welcome.component';
import { aboutMeComponent } from '../components/about-me/aboutMe.component';
import { HomeComponent } from '../components/home/home.component';
import { ArchivComponent } from '../components/archiv/archiv.component';
import { AnmeldungComponent } from '../components/Anmeldung/anmeldung.component';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'aboutMe',
    component: aboutMeComponent
  },
  {
    path: 'anmeldung',
    component: AnmeldungComponent
  },
  {
    path: 'archiv',
    component: ArchivComponent,
    canActivate: [RoleGuard],
    data: { permission: 'view_archiv' }
  }
];
