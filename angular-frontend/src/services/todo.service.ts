import { Injectable } from '@angular/core';
import { Todo } from '../shared/models/todo';
import { ApolloError } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { GET_TODOS_QUERY, INSERT_TODO_MUTATION } from '../shared/queries';


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
      refetchQueries: [{
        query: GET_TODOS_QUERY,
      }]
    });
  }
}
