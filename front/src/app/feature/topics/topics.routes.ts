import { Routes } from "@angular/router";
import { ListComponent } from "./components/list/list.component";

export const TOPICS_ROUTES: Routes = [
    {path: '', children: [
        { path: '', pathMatch: 'full', title: "Topics", component: ListComponent },
        { path: '**', redirectTo: '404' }
    ]}
    
  ];