import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseNavComponent } from './base-nav/base-nav.component';
import { TodoBoxComponent } from './todo-box/todo-box.component';
import { TodoComponent } from './todo/todo.component';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';
import { TodoHistoryDialogComponent } from './todo-history-dialog/todo-history-dialog.component';
import { TodoItemSortPipe } from './todo-item-sort.pipe';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    BaseNavComponent,
    TodoBoxComponent,
    TodoComponent,
    TodoDialogComponent,
    TodoHistoryDialogComponent,
    TodoItemSortPipe
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
