// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type Mutation struct {
}

type NewTodo struct {
	Title string `json:"title"`
}

type Query struct {
}

type Todo struct {
	ID         int    `json:"id"`
	Title      string `json:"title"`
	IsComplete bool   `json:"isComplete"`
}

type UpdateTodo struct {
	ID         int    `json:"id"`
	Title      string `json:"title"`
	IsComplete bool   `json:"isComplete"`
}
