import { Component, Input } from '@angular/core';
import { Todo } from '../../shared/models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: '[app-todo-item]',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input({ required: true }) todo: Todo;
  @Input({ required: true }) idx: number;
  public loadingBtn: boolean = false;
  public loadingCbx: boolean = false;

  public error = false;
  public showAlert = false;

  constructor(private todoService: TodoService) { }

  toggleCompleted(todo: Todo) {
    const newTodo = { ...todo, isComplete: !todo.isComplete }
    return this.todoService.updateTodo(newTodo).subscribe(r => {
      this.loadingCbx = !!r.loading;
    });
  }
  deleteTodo(todo: Todo) {
    return this.todoService.deleteTodo(todo.id).subscribe(r => {
      this.loadingBtn = !!r.loading;
    });
  }
}
