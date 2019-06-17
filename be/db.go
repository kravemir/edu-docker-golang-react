package main

import (
	"fmt"
)

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

import (
	. "todo-be/model"
)

func openAndInitDb() *gorm.DB {
	db, err := gorm.Open("postgres", "host=db user=postgres dbname=postgres password=tralalala sslmode=disable")
	if err != nil {
		panic(fmt.Sprintf("Failed to connect the database: %v", err))
	}

	db.AutoMigrate(&TodoModel{})
	db.AutoMigrate(&ListModel{})

	return db
}
