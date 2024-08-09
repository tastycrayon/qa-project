package graph

import (
	"context"
	"database/sql"
	"time"

	"github.com/tastycrayon/qa-project/graphql-server/graph/model"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	DB *sql.DB
}

func NewResolver(db *sql.DB) *Resolver {
	return &Resolver{DB: db}
}

// extra

func CreateTodo(ctx context.Context, db *sql.DB, title string) (*model.Todo, error) {
	const query = `INSERT INTO todos (title, is_complete) VALUES(?,?)`
	result, err := db.ExecContext(ctx, query, title, false)
	if err != nil {
		return nil, err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}
	return &model.Todo{ID: int(id), Title: title, IsComplete: false}, nil
}

func GetTodoByID(ctx context.Context, db *sql.DB, id int) (*model.Todo, error) {
	const query = `SELECT id, title, is_complete FROM todos WHERE ID=?`

	row := db.QueryRowContext(ctx, query, id)
	var todo model.Todo
	err := row.Scan(&todo.ID, &todo.Title, &todo.IsComplete)
	if err != nil {
		return nil, err
	}
	return &todo, nil
}

func GetTodos(ctx context.Context, db *sql.DB) ([]*model.Todo, error) {
	const query = `SELECT id, title, is_complete FROM todos ORDER BY created_at DESC`

	var todos []*model.Todo
	rows, err := db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	// rest of the function
	for rows.Next() {
		var todo model.Todo
		err := rows.Scan(&todo.ID, &todo.Title, &todo.IsComplete)
		if err != nil {
			return nil, err
		}
		todos = append(todos, &todo)
	}
	return todos, err
}

func UpdateTodo(ctx context.Context, db *sql.DB, id int, title string, isComplete bool) (*model.Todo, error) {
	const query = `UPDATE todos SET title = ?, is_complete = ?, updated_at = ? WHERE id = ? RETURNING id, title, is_complete`

	var todo model.Todo
	row := db.QueryRowContext(ctx, query, title, isComplete, time.Now(), id)
	err := row.Scan(&todo.ID, &todo.Title, &todo.IsComplete)
	if err != nil {
		return nil, err
	}
	return &todo, nil
}

func DeleteTodo(ctx context.Context, db *sql.DB, id int) (bool, error) {
	const query = `DELETE FROM todos WHERE id=?`

	res, err := db.ExecContext(ctx, query, id)
	if err != nil {
		return false, err
	}
	affected, err := res.RowsAffected()
	if err != nil {
		return false, err
	}
	return (affected > 0), err
}
