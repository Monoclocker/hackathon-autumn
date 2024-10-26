package database

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"hackathon-autumn/auth-service/internal/loggers"
	"hackathon-autumn/auth-service/internal/models"
)

var (
	Db     *gorm.DB
	JwtKey = []byte("secret_key")
)

func InitDB() {
	//dsn := os.Getenv("DSN")
	var err error
	dsn := "host=localhost user=zetsubu password=d23 dbname=userinfo port=5432 sslmode=disable"
	Db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		loggers.ErrorLog.Error("failed to connect database", "err", err)
	}
	if err := Db.AutoMigrate(&models.User{}); err != nil {
		loggers.ErrorLog.Error("failed to run migrations", "err", err)
	}
}
