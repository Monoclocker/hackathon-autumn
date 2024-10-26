package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID       int32  `gorm:"primaryKey"`
	UserName string `gorm:"column:user_name"`
	Password string `gorm:"column:password"`
	Email    string `gorm:"column:email;unique"`
}
