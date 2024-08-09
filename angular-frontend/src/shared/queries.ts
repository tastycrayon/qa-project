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


export type UpdateTodoResponse = { updateTodo: Todo };
export const UPDATE_TODO_MUTATION = gql<UpdateTodoResponse, { id: number, title: string, isComplete: boolean }>`
mutation ($id:ID!, $title: String!, $isComplete: Boolean!) {
  updateTodo(input: { id: $id, title: $title, isComplete: $isComplete }){
    id
    title
    isComplete
  }
}`;

export type DeleteTodoResponse = { deleteTodo: boolean };
export const DELETE_TODO_MUTATION = gql<DeleteTodoResponse, { id: number, }>`
mutation ($id:ID!) {
  deleteTodo(input: $id )
}`;
