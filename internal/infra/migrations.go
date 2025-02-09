package infra

import (
	"github.com/golang-migrate/migrate/v4"
)

func RunMigrations(connString string) error {
    m, err := migrate.New("file://migrations", connString)
	if err != nil && err.Error() != "no change" {
		return err
	}
	err = m.Up()
	if err != nil && err.Error() != "no change" {
		return err
	}
	return nil
}
