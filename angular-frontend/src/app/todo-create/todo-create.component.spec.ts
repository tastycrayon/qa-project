import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCreateComponent } from './todo-create.component';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { INSERT_TODO_MUTATION } from '../../shared/queries';

const mockTodo = { id: 1, title: "hello1", isComplete: false, };

describe('TodoCreateComponent', () => {
  let component: TodoCreateComponent;
  let fixture: ComponentFixture<TodoCreateComponent>;
  let controller: ApolloTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule, TodoCreateComponent],
    }).compileComponents();

    controller = TestBed.inject(ApolloTestingController)
    fixture = TestBed.createComponent(TodoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    controller.verify();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new todo', () => {
    component.createTodo(mockTodo.title).subscribe(r => {
      console.log(r.data, mockTodo);
      expect(r.data?.createTodo).toEqual(jasmine.objectContaining(mockTodo))
      // expect(component.todo?.id).toBe(1);
    })

    const op = controller.expectOne(INSERT_TODO_MUTATION);
    // op.operation.variables = { title: mockTodo.title };

    // expect(typeof component.loading).toBe('boolean');

    op.flush({
      data: { createTodo: mockTodo },
    });
  });
});
