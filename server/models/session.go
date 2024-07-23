package models

import "time"

type Session struct {
	ID int `gorm:"primaryKey"`
	UserID int `gorm:"not null"`
	Token string `gorm:"not null"`
	CreatedAt time.Time
	UpdatedAt time.Time

}