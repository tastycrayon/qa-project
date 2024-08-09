import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { GET_TODOS_QUERY } from '../../shared/queries';

const mockTodos = [
  { id: 1, title: "hello1", isComplete: false, },
  { id: 2, title: "hello2", isComplete: true, },
  { id: 3, title: "hello3", isComplete: false, },
];

describe('AppComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let controller: ApolloTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule, TodoListComponent],
    }).compileComponents();
    controller = TestBed.inject(ApolloTestingController)
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    controller.verify();
  })


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set todoList and loading correctly on successful data fetch', () => {
    component.getTodos().subscribe(r => {
      expect(r.data.todos).toEqual(jasmine.objectContaining(mockTodos))
    });

    const op = controller.expectOne(GET_TODOS_QUERY);
    expect(component.loading).toBeInstanceOf(Boolean);

    op.flush({
      data: { todos: mockTodos },
    });
  });
});