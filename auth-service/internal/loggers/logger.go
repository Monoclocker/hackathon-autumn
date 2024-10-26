package loggers

import (
	"log/slog"
	"os"
)

var InfoLog = slog.New(slog.NewJSONHandler(os.Stdout, nil))
var ErrorLog = slog.New(slog.NewJSONHandler(os.Stdout, nil))
