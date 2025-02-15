package infra

import (
	"context"
	"log/slog"
	"os"
	"github.com/jackc/pgx/v5/pgxpool"
)

func NewDatabase(db Database) (*pgxpool.Pool, error) {
	poolConfig, err := pgxpool.ParseConfig(db.ConnString)
	if err != nil {
		return nil, err
	}

	pool, err := pgxpool.NewWithConfig(context.Background(), poolConfig)
	if err != nil {
		return nil, err
	}
	err = pool.Ping(context.Background())
	if err != nil {
		slog.Error("could not ping database connection", "error", err)
		os.Exit(1)
	}
	slog.Info("successfully connected to database")
	return pool, nil
}
