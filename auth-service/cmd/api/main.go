package main

import (
	"hackathon-autumn/auth-service/internal/config"
	"hackathon-autumn/auth-service/internal/http/routes"
	"hackathon-autumn/auth-service/internal/loggers"
	database "hackathon-autumn/auth-service/internal/repositories/db"
	"net/http"
)

func main() {
	database.InitDB()

	config := config.LoadConfigHttp()
	addr := config.Ip + ":" + config.Port

	srv := &http.Server{
		Addr:    addr,
		Handler: routes.Routes(),
	}

	loggers.InfoLog.Info("Starting HTTP server", "addr", addr)
	if err := srv.ListenAndServe(); err != nil {
		loggers.ErrorLog.Error(err.Error())
	}
}
