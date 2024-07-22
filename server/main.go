package main

import (
	"github.com/bizzhle/multi-step-regstration-server/database"
	"github.com/bizzhle/multi-step-regstration-server/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)



func main() {
	
	app := fiber.New()


    app.Use(recover.New())

	 database.Connect()

	 app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
		AllowCredentials: true,
		AllowHeaders: "Content-Type, Authorization",
	 }))

	 app.Use(logger.New())
	 routes.AuthRoutes(app)

	 app.Listen(":8080")
	
}


