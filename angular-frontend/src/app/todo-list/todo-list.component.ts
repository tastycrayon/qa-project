import { Component, OnInit } from '@angular/core';
import { ApolloError } from '@apollo/client/core';
import { Todo } from '../../shared/models/todo';
import { TodoService } from '../../services/todo.service';
import { map, pluck, shareReplay } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  todoList: Todo[] = [];
  loading = false;
  error: ApolloError | undefined;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos().subscribe(({ data, loading, error }) => {
      this.todoList = data?.todos || [];
      this.loading = loading;
      this.error = error;
    });
  }
  getTodos() {
    return this.todoService.getTodos().pipe(shareReplay(1));
  }
  toggleCompleted(id: number) { }
  deleteTodo(todo: any) { }
}
