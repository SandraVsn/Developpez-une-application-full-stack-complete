import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './feature/auth/components/login/login.component';
import { RegisterComponent } from './feature/auth/components/register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'posts', loadChildren: () => import('./feature/posts/posts.routes').then(mod => mod.POSTS_ROUTES) },
];
