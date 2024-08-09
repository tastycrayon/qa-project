package main

import "time"

type Todo struct {
	ID         int    `json:"id"`
	Title      string `json:"title"`
	IsComplete bool   `json:"isComplete"`

	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type TodoInput struct {
	Title string `json:"title"`
}
