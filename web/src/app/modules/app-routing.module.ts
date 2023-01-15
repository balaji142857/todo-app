import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivedComponent } from '../components/archived/archived.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { TodoBoxComponent } from '../components/todo-box/todo-box.component';

const routes: Routes = [
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  { path: "dashboard", component: TodoBoxComponent },
  { path: "settings", component: SettingsComponent },
  { path: "archived", component: ArchivedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
