package infra

type Config struct {
	Database Database
}

type Database struct {
	ConnString string 	
}
