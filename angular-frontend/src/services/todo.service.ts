import { Injectable } from '@angular/core';
import { Todo } from '../shared/models/todo';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { DELETE_TODO_MUTATION, GET_TODOS_QUERY, GetTodoResponse, INSERT_TODO_MUTATION, UPDATE_TODO_MUTATION } from '../shared/queries';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoList: Todo[] = [];
  loading = false;
  error: ApolloError | undefined;

  constructor(
    private readonly apollo: Apollo,
  ) { };

  getTodos() {
    return this.apollo.watchQuery({
      query: GET_TODOS_QUERY,
    }).valueChanges;
  };

  createTodo(title: string) {
    return this.apollo.mutate({
      mutation: INSERT_TODO_MUTATION,
      variables: { title },
      update: (cache, { data }) => {
        const existingTodos = cache.readQuery<GetTodoResponse>({ query: GET_TODOS_QUERY });
        if (!existingTodos || !data) return;
        cache.writeQuery({
          query: GET_TODOS_QUERY,
          data: { todos: [data.createTodo, ...existingTodos.todos] }
        });
      },
    });
  }

  updateTodo(todo: Todo) {
    return this.apollo.mutate({
      mutation: UPDATE_TODO_MUTATION,
      variables: { ...todo },
      update: (cache) => {
        const existingTodos = cache.readQuery<GetTodoResponse>({ query: GET_TODOS_QUERY });
        if (!existingTodos) return;
        const newTodos = existingTodos.todos.map(t => {
          if (t.id == todo.id) return todo;
          return t;
        });
        cache.writeQuery({
          query: GET_TODOS_QUERY,
          data: { todos: newTodos }
        });
      },
    });
  }

  deleteTodo(id: number) {
    return this.apollo.mutate({
      mutation: DELETE_TODO_MUTATION,
      variables: { id },
      update: (cache) => {
        const existingTodos = cache.readQuery<GetTodoResponse>({ query: GET_TODOS_QUERY });
        if (!existingTodos) return;
        const newTodos = existingTodos.todos.filter(t => (t.id !== id));
        cache.writeQuery({
          query: GET_TODOS_QUERY,
          data: { todos: newTodos }
        });
      },
    });
  }
}
