package routes

import (
	controllers "github.com/bizzhle/multi-step-regstration-server/services"
	"github.com/gofiber/fiber/v2"
)



func AuthRoutes(app fiber.Router) {

	r := app.Group("/auth")

	r.Post("/register", controllers.Register)
	r.Post("/login", controllers.Login)

	// app.Get("/", controllers.Hello)	
	// app.Get("/protected", controllers.Register, utils.JWTMiddleware)
}