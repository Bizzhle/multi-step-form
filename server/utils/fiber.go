package utils

import (
	"github.com/gofiber/fiber/v2"
)

func parseBody(ctx *fiber.Ctx, body interface{}) *fiber.Error {
	if err := ctx.BodyParser(body); err != nil {
		return fiber.ErrBadRequest
	}

	return nil
}

func ParseBodyAndValidate(ctx *fiber.Ctx, body interface{}) *fiber.Error {
	if err := parseBody(ctx, body); err != nil {
		return err
	}

	return Validate(body)
}