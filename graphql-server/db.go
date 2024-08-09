package main

import (
	"context"
	"database/sql"
	"time"

	_ "modernc.org/sqlite"
)

const table_schema = `
	CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255),
    is_complete BOOLEAN,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);`

func InitDatabase() (*sql.DB, error) {
	db, err := sql.Open("sqlite", "app.db")
	if err != nil {
		return nil, err
	}

	return db, db.Ping()
}

func CreateTables(db *sql.DB) error {
	ctx := context.Background()
	if _, err := db.ExecContext(ctx, table_schema); err != nil {
		return err
	}
	return nil
}

func SeedTodo(db *sql.DB) error {
	todos := []Todo{
		{1, "Learn Go", false, time.Now(), time.Now()},
		{2, "Write blog post", false, time.Now().Add(-48 * time.Hour), time.Now().Add(-24 * time.Hour)},
		{3, "Read book", true, time.Now().Add(-72 * time.Hour), time.Now().Add(-48 * time.Hour)},
		{4, "Go jogging", true, time.Now().Add(-96 * time.Hour), time.Now().Add(-72 * time.Hour)},
		{5, "Cook dinner", false, time.Now().Add(-120 * time.Hour), time.Now().Add(-96 * time.Hour)},
		{6, "Watch movie", true, time.Now().Add(-144 * time.Hour), time.Now().Add(-120 * time.Hour)},
		{7, "Visit museum", false, time.Now().Add(-168 * time.Hour), time.Now().Add(-144 * time.Hour)},
		{8, "Clean house", true, time.Now().Add(-192 * time.Hour), time.Now().Add(-168 * time.Hour)},
		{9, "Write code", false, time.Now().Add(-216 * time.Hour), time.Now().Add(-192 * time.Hour)},
		{10, "Exercise", true, time.Now().Add(-240 * time.Hour), time.Now().Add(-216 * time.Hour)},
		{11, "Do laundry", false, time.Now().Add(-264 * time.Hour), time.Now().Add(-240 * time.Hour)},
		{12, "Plan trip", true, time.Now().Add(-288 * time.Hour), time.Now().Add(-264 * time.Hour)},
		{13, "Study math", false, time.Now().Add(-312 * time.Hour), time.Now().Add(-288 * time.Hour)},
		{14, "Paint room", true, time.Now().Add(-336 * time.Hour), time.Now().Add(-312 * time.Hour)},
		{15, "Fix bike", false, time.Now().Add(-360 * time.Hour), time.Now().Add(-336 * time.Hour)},
		{16, "Meditate", true, time.Now().Add(-384 * time.Hour), time.Now().Add(-360 * time.Hour)},
		{17, "Grocery shopping", false, time.Now().Add(-408 * time.Hour), time.Now().Add(-384 * time.Hour)},
		{18, "Call family", true, time.Now().Add(-432 * time.Hour), time.Now().Add(-408 * time.Hour)},
		{19, "Gardening", false, time.Now().Add(-456 * time.Hour), time.Now().Add(-432 * time.Hour)},
		{20, "Attend webinar", true, time.Now().Add(-480 * time.Hour), time.Now().Add(-456 * time.Hour)},
		{21, "Write report", false, time.Now().Add(-504 * time.Hour), time.Now().Add(-480 * time.Hour)},
		{22, "Play game", true, time.Now().Add(-528 * time.Hour), time.Now().Add(-504 * time.Hour)},
		{23, "Go hiking", false, time.Now().Add(-552 * time.Hour), time.Now().Add(-528 * time.Hour)},
		{24, "Study history", true, time.Now().Add(-576 * time.Hour), time.Now().Add(-552 * time.Hour)},
		{25, "Make coffee", false, time.Now().Add(-600 * time.Hour), time.Now().Add(-576 * time.Hour)},
		{26, "Repair car", true, time.Now().Add(-624 * time.Hour), time.Now().Add(-600 * time.Hour)},
		{27, "Organize desk", false, time.Now().Add(-648 * time.Hour), time.Now().Add(-624 * time.Hour)},
		{28, "Meet friends", true, time.Now().Add(-672 * time.Hour), time.Now().Add(-648 * time.Hour)},
		{29, "Learn Spanish", false, time.Now().Add(-696 * time.Hour), time.Now().Add(-672 * time.Hour)},
		{30, "Walk dog", true, time.Now().Add(-720 * time.Hour), time.Now().Add(-696 * time.Hour)},
		{31, "Bake cookies", false, time.Now().Add(-744 * time.Hour), time.Now().Add(-720 * time.Hour)},
		{32, "Do yoga", true, time.Now().Add(-768 * time.Hour), time.Now().Add(-744 * time.Hour)},
		{33, "Write letter", false, time.Now().Add(-792 * time.Hour), time.Now().Add(-768 * time.Hour)},
		{34, "Volunteer", true, time.Now().Add(-816 * time.Hour), time.Now().Add(-792 * time.Hour)},
		{35, "Attend meeting", false, time.Now().Add(-840 * time.Hour), time.Now().Add(-816 * time.Hour)},
		{36, "Read news", true, time.Now().Add(-864 * time.Hour), time.Now().Add(-840 * time.Hour)},
	}
	ctx := context.Background()
	const query = `INSERT INTO todos (id, title, is_complete, created_at, updated_at) VALUES(?,?,?,?,?)`
	for _, todo := range todos {
		_, err := db.ExecContext(ctx, query, todo.ID, todo.Title, todo.IsComplete, todo.CreatedAt, todo.UpdatedAt)
		if err != nil {
			return err
		}
	}
	return nil
}
