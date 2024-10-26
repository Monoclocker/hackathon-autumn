package services

import (
	"time"

	database "hackathon-autumn/auth-service/internal/repositories/db"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

type Claims struct {
	Username string
}

func GenerateAccessTocken(email string) (string, error) {
	expiirationTime := time.Now().Add(30 * time.Minute)

	claims := &jwt.StandardClaims{
		ExpiresAt: expiirationTime.Unix(),
		Subject:   email,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(database.JwtKey)
}

func GenerateRefreshTocken(email string) (string, error) {
	expiirationTime := time.Now().Add(7 * 24 * time.Hour)

	claims := &jwt.StandardClaims{
		ExpiresAt: expiirationTime.Unix(),
		Subject:   email,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(database.JwtKey)
}
