package database

import (
	"fmt"
	"log"
	"time"

	"github.com/bizzhle/multi-step-regstration-server/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type Config struct {
	Host string
	Port string
	Password string
	User string
	DBName string
	DBPassword	string
	SSLmode string
}

var DB 	*gorm.DB


func Connect() {

	var err error
	// p := config.Config("DB_PORT")


	// // converts string to int
	// port, err := strconv.ParseUint(p, 10, 32)

	// if err != nil {
    //     fmt.Println("Error parsing str to int")
    // }
	
	// dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", config.Config("DB_HOST"), port, config.Config("DB_USER"), config.Config("DB_PASSWORD"), config.Config("DB_NAME"))

	db, err := gorm.Open(sqlite.Open("multistep.db"), &gorm.Config{
		NowFunc: func() time.Time { return time.Now().Local() },
		Logger:  logger.Default.LogMode(logger.Info),
	})
	
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}

	DB = db

	DB.AutoMigrate(models.User{})

	
	fmt.Println("Connection Opened to Database")
	

}