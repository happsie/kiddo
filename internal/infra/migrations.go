package infra

import "github.com/golang-migrate/migrate/v4"

func RunMigrations(connString string) error {
    m, err := migrate.New("file://migrations", connString)
	if err != nil {
		return err
	}
	return m.Up()
}
