import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Todo } from '../../shared/models/todo';
import { TodoService } from '../../services/todo.service';
import { GraphQLFormattedError } from 'graphql';
import { shareReplay } from 'rxjs';

@Component({
  selector: 'app-todo-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.scss'
})
export class TodoCreateComponent {
  createTodoForm = new FormGroup({
    title: new FormControl<string>("")
  });
  todo: Todo | undefined = undefined;
  todoList: Todo[] = [];
  loading = false;
  error: GraphQLFormattedError[] | undefined

  constructor(private todoService: TodoService) { }

  onSubmit() {
    this.createTodo(this.createTodoForm.value.title || "").subscribe(({ loading, data }) => {
      this.todo = data?.createTodo;
      this.loading = !!loading;
      this.createTodoForm.setValue({ title: "" });
    });
  }
  createTodo(title: string) {
    return this.todoService.createTodo(title).pipe(shareReplay(1));
  }
}
