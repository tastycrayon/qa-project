package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/rs/cors"
	"github.com/tastycrayon/qa-project/graphql-server/graph"
)

const defaultPort = "8080"

func main() {
	db, err := InitDatabase()
	if err != nil {
		panic(err)
	}
	if err := CreateTables(db); err != nil {
		panic(err)
	}
	if len(os.Args) > 1 && os.Args[1] == "seed" {
		if err := SeedTodo(db); err != nil {
			panic(err)
		}
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	r := graph.NewResolver(db)
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: r}))

	mux := http.NewServeMux()

	mux.Handle("/", playground.Handler("GraphQL playground", "/query"))
	mux.Handle("/query", srv)

	handler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:4200"},
		AllowCredentials: true,
		// Debug:            true,
	}).Handler(mux)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
