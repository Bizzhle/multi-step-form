package types

import "time"

type RegisterDTO struct {
	
	ID        uint    `json:"id"`
	FirstName	string `json:"firstName" validate:"required,min=3"`
	LastName	string `json:"lastName"`
	UserEmail	string `json:"userEmail" validate:"required"`
	UserPassword	string `json:"userPassword" validate:"required"`
	Country	string `json:"country"`
	State	string `json:"state"`
	City	string `json:"city"`
	CreatedAt	time.Time `json:"createdAt"`
	UpdatedAt	time.Time `json:"updatedAt"`
}

type UserResponse struct {
	ID       uint   `json:"id"`
	FirstName     string `json:"firstName"`
	UserEmail    string `json:"userEmail"`
	UserPassword string `json:"-"`
}

type LoginDTO struct {
	UserEmail string `json:"userEmail" validate:"required"`
	UserPassword string `json:"userPassword" validate:"required"`
}

type AccessResponse struct {
	Token string `json:"token"`
}