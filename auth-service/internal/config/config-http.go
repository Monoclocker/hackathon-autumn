package config

import "os"

type ConfigHttp struct {
	Port string
	Ip   string
}

func LoadConfigHttp() *ConfigHttp {
	port := os.Getenv("PORTHTTP")
	ip := os.Getenv("IP")
	if port == "" {
		port = "8080"
	}
	if ip == "" {
		ip = "localhost"
	}
	return &ConfigHttp{
		Port: port,
		Ip:   ip,
	}
}
