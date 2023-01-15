import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoHistoryDialogComponent } from './todo-history-dialog.component';

describe('TodoHistoryDialogComponent', () => {
  let component: TodoHistoryDialogComponent;
  let fixture: ComponentFixture<TodoHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoHistoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
