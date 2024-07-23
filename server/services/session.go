package services

import (
	"time"

	"github.com/bizzhle/multi-step-regstration-server/database"
	"github.com/bizzhle/multi-step-regstration-server/models"
)



func CreateSession(userId int, token string) error {
	session := models.Session{
		UserID: userId,
		Token: token,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),

	}

	if err := database.DB.Create(&session).Error; err != nil {
		return err
	}

	return nil
}