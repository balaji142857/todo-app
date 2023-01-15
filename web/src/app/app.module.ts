import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { BaseNavComponent } from './components/base-nav/base-nav.component';
import { TodoBoxComponent } from './components/todo-box/todo-box.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoDialogComponent } from './dialogs/todo-dialog/todo-dialog.component';
import { TodoHistoryDialogComponent } from './dialogs/todo-history-dialog/todo-history-dialog.component';
import { TodoItemSortPipe } from './pipes/todo-item-sort.pipe';
import { MaterialModule } from './modules/material.module';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseNavComponent,
    TodoBoxComponent,
    TodoComponent,
    TodoDialogComponent,
    TodoHistoryDialogComponent,
    TodoItemSortPipe,
    SettingsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
