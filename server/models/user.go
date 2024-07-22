package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID        uint   `gorm:"primarykey"` 
	FirstName	string `gorm:"not null"` 
	LastName	string 
	UserEmail	string `gorm:"unique;not null"`
	UserPassword	string `gorm:"not null"`
	Country	string 
	State	string 
	City	string 
	CreatedAt	time.Time 
	UpdatedAt	time.Time 
}

// func FindUser(dest interface{}, conds ...interface{}) *gorm.DB {
// 	return database.DB.Model(&User{}).Take(dest, conds...)
// }

// func FindUserByEmail(dest interface{}, email string) *gorm.DB {
// 	return FindUser(dest, "email = ?", email)
// }



