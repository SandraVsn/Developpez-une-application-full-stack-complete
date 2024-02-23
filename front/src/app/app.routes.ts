import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './feature/auth/components/login/login.component';
import { RegisterComponent } from './feature/auth/components/register/register.component';
import { MeComponent } from './pages/me/me.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './guards/authGuard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'me', component: MeComponent, canActivate: [AuthGuard] },
  { path: 'posts', loadChildren: () => import('./feature/posts/posts.routes').then(mod => mod.POSTS_ROUTES), canActivate: [AuthGuard] },
  { path: 'topics', loadChildren: () => import('./feature/topics/topics.routes').then(mod => mod.TOPICS_ROUTES), canActivate: [AuthGuard] },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];
