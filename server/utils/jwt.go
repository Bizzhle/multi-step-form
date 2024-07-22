package utils

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)


var jwtKey = []byte("yoursecret-key")



func GenerateJWT(username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"exp": time.Now().Add(time.Hour * 72).Unix(),
	})
	return token.SignedString(jwtKey)
}

func JWTMiddleware(c *fiber.Ctx) error {
	h := c.Get("Authorization")


	// chunks := strings.Split(h, " ")

	token, err := jwt.Parse(h, func(token *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})

	if err != nil || !token.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "unathorized",
		})
	}

	c.Locals("user", token)
	return c.Next()
}

// func parse(token string) error {
// 	return jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
// 		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
// 			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
// 		}

// 		return []byte("secret"), nil
// 	})
// }

