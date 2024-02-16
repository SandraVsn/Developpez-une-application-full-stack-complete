import { Routes } from "@angular/router";
import { ListComponent } from "./components/list/list.component";
import { DetailComponent } from "./components/detail/detail.component";
import { FormComponent } from "./components/form/form.component";

export const POSTS_ROUTES: Routes = [
    {path: '', children: [
        { path: '', pathMatch: 'full', title: "Posts", component: ListComponent },
        { path: 'create', title: "Post creation", component: FormComponent },
        { path: ':id', title: "Post detail", component: DetailComponent },
        { path: '**', redirectTo: '404' }
    ]}
    
  ];