import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatBadgeModule } from '@angular/material/badge';
import { BaseNavComponent } from './base-nav/base-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card'
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { TodoBoxComponent } from './todo-box/todo-box.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TodoComponent } from './todo/todo.component';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';
import { TodoHistoryDialogComponent } from './todo-history-dialog/todo-history-dialog.component';
import { TodoItemSortPipe } from './todo-item-sort.pipe';

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
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatExpansionModule,
    MatDatepickerModule,
    TextFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatRippleModule,
    MatDialogModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSelectModule,
    MatChipsModule,
    MatSortModule,
    MatCardModule,
    DragDropModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
