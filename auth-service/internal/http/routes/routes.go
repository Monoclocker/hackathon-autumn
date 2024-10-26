package routes

import (
	"hackathon-autumn/auth-service/internal/controllers"
	"hackathon-autumn/auth-service/internal/middleware"
	"net/http"
)

func Routes() *http.ServeMux {
	mux := http.NewServeMux()

	mux.Handle("/register", middleware.CorsMiddleWare(http.HandlerFunc(controllers.RegisterHeandler)))
	mux.Handle("/login", middleware.CorsMiddleWare(http.HandlerFunc(controllers.LoginHandler)))

	return mux
}
