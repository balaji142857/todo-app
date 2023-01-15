import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from '../components/settings/settings.component';
import { TodoBoxComponent } from '../components/todo-box/todo-box.component';

const routes: Routes = [
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  { path: "dashboard", component: TodoBoxComponent },
  { path: "settings", component: SettingsComponent },
  { path: "archived", component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
