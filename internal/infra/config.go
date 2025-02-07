package infra

type Config struct {
	Database Database
}

type Database struct {
	URL string 	
}
