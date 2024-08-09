import { gql } from "apollo-angular";
import { Todo } from "./models/todo";

export type GetTodoResponse = { todos: Todo[] };
export const GET_TODOS_QUERY = gql<GetTodoResponse, never>`
query{
  todos{
    id
    title
    isComplete
  }
}`;

export type InsertTodoResponse = { createTodo: Todo };
export const INSERT_TODO_MUTATION = gql<InsertTodoResponse, { title: string }>`
mutation ($title: String!) {
  createTodo(input: { title: $title} ){
    id
    title
    isComplete
  }
}`;
