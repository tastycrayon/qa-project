import { Component, OnInit } from '@angular/core';
import { ApolloError } from '@apollo/client/core';
import { Todo } from '../../shared/models/todo';
import { TodoService } from '../../services/todo.service';
import { map, pluck, shareReplay } from 'rxjs';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoItemSkeletonComponent } from '../todo-item-skeleton/todo-item-skeleton.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, TodoItemSkeletonComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  todoList: Todo[] = [];
  loading = false;
  error: ApolloError | undefined;
  skeletonList = Array.from(Array(1 << 4).keys())

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos().subscribe(({ data, loading, error }) => {
      this.todoList = data?.todos || [];
      this.loading = loading;
      this.error = error;
    });
  }
  getTodos() {
    return this.todoService.getTodos().valueChanges.pipe(shareReplay(1));
  }
  refetchTodos() {
    this.loading = true;
    return this.todoService.getTodos().refetch();
  }

}
