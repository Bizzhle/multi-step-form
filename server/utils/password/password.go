package password

import (
	"errors"
	"regexp"

	"golang.org/x/crypto/bcrypt"
)

func GeneratePassword(password string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), 14)

	if err != nil {
		panic(err)
	}

	return string(hash)
}

func Verify(hash string, raw string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(raw))
}

func ValidatePassword(password string) error {
	if len(password) < 8 {
		return errors.New("password must be at least 8 characters long")
	}

	var hasUppercase = regexp.MustCompile(`[A-Z]`).MatchString
	var hasLowercase = regexp.MustCompile(`[a-z]`).MatchString
	var hasNumber = regexp.MustCompile(`[0-9]`).MatchString
	var hasSpecialChar = regexp.MustCompile(`[!@#~$%^&*()_+|<>{}[\]\/]`).MatchString

	if !hasUppercase(password) {
		return errors.New("password must contain at least one uppercase letter")
	}

	if !hasLowercase(password) {
		return errors.New("password must contain at least one lowercase letter")
	}

	if !hasNumber(password) {
		return errors.New("password must contain at least one number")
	}

	if !hasSpecialChar(password) {
		return errors.New("password must contain at least one special character")
	}

	return nil
}