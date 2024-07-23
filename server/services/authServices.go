package services

import (
	"time"

	"github.com/bizzhle/multi-step-regstration-server/database"
	"github.com/bizzhle/multi-step-regstration-server/models"
	"github.com/bizzhle/multi-step-regstration-server/types"
	"github.com/bizzhle/multi-step-regstration-server/utils"
	"github.com/bizzhle/multi-step-regstration-server/utils/password"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)



func Register(c *fiber.Ctx) error {
	data := new(types.RegisterDTO)

	if err := utils.ParseBodyAndValidate(c, data); err != nil {
		return err
	}

	if err := password.ValidatePassword(data.UserPassword); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	password := password.GeneratePassword(data.UserPassword)

	user := models.User{
		FirstName: data.FirstName,
		LastName: data.LastName,
		UserEmail: data.UserEmail,
		UserPassword: password,
		Country: data.Country,
		State: data.State,
		City: data.City,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	if err := database.DB.Create(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	data := new(types.LoginDTO)

	if err := c.BodyParser(&data); err != nil {
		return err
	}


	var user models.User

	if err := database.DB.Where("user_email = ?", data.UserEmail).Take(&user).Error; err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
            "message": "User not found",
        })
    }


	if err := bcrypt.CompareHashAndPassword([]byte(user.UserPassword), []byte(data.UserPassword)); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Incorrect password",
		})
	}

	
	token, err := utils.GenerateJWT(user.UserEmail)

	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	if err := CreateSession(int(user.ID), token); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to create session",
		})
	}

	return c.JSON(fiber.Map{
		"user": user,
		"token": token,
	})
}



func Protected(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	username := claims["username"].(string)

	return c.JSON(fiber.Map{"message": "Hello " + username })
}

func Hello(c *fiber.Ctx) error {
	return c.SendString("Hello, world!")
}

	