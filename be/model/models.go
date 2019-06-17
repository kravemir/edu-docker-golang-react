package model

import (
	"github.com/jinzhu/gorm"
)

type (
	TodoModel struct {
		gorm.Model
		Title   string
		Content string

		ListID uint
	}
	ListModel struct {
		gorm.Model
		Name string

		Todos []TodoModel `gorm:"foreignkey:ListID"`
	}
)
