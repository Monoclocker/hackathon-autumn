package controllers

import (
	"encoding/json"
	"hackathon-autumn/auth-service/internal/models"
	database "hackathon-autumn/auth-service/internal/repositories/db"
	"hackathon-autumn/auth-service/internal/services"
	"net/http"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func RegisterHeandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var user models.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	hashedPassword, err := services.HashPassword(user.Password)
	if err != nil {
		http.Error(w, "Error encrypting passsword", http.StatusInternalServerError)
		return
	}
	user.Password = hashedPassword

	if err := database.Db.Create(&user).Error; err != nil {
		http.Error(w, "User alredy exists", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)

}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var LoginData struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&LoginData); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var user models.User

	if err := database.Db.Where("email = ?", LoginData.Email).First(&user).Error; err != nil {
		http.Error(w, "Invali email or password", http.StatusUnauthorized)
		return
	}

	if !services.CheckPasswordHash(LoginData.Password, user.Password) {
		http.Error(w, "Invali email or password", http.StatusUnauthorized)
		return
	}

	accessToken, err := services.GenerateAccessTocken(user.Email)
	if err != nil {
		http.Error(w, "Error generating access token", http.StatusInternalServerError)
		return
	}

	refreshToken, err := services.GenerateRefreshTocken(user.Email)
	if err != nil {
		http.Error(w, "Error generating refresh token", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"accessToken":  accessToken,
		"refreshToken": refreshToken})
}

func RefreshTocen(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		http.Error(w, "Authorization header is required", http.StatusUnauthorized)
		return
	}

	tokenString := strings.TrimPrefix(authHeader, "Bearer ")

	claims := &jwt.StandardClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (interface{}, error) {
		return database.JwtKey, nil
	})

	if err != nil || !token.Valid {
		http.Error(w, "Invalid or expired token", http.StatusUnauthorized)
		return
	}

	if claims.ExpiresAt < time.Now().Unix() {
		http.Error(w, "Token has expired", http.StatusUnauthorized)
		return
	}
	var user models.User
	if err := database.Db.Where("email = ?", claims.Subject).First(&user).Error; err != nil {
		http.Error(w, "User not found", http.StatusUnauthorized)
		return
	}

	accessToken, err := services.GenerateAccessTocken(claims.Subject)
	if err != nil {
		http.Error(w, "Error generating access token", http.StatusInternalServerError)
		return
	}

	refreshToken, err := services.GenerateRefreshTocken(claims.Subject)
	if err != nil {
		http.Error(w, "Error generating refresh token", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"accessToken":  accessToken,
		"refreshToken": refreshToken,
	})
}
