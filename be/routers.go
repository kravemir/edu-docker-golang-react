package main

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

import (
	. "todo-be/resources"
)

func todoResources(db *gorm.DB, g *gin.RouterGroup) {
	r := TodoResource{DB: db}

	g.POST("/", r.CreateTodo)
	g.GET("/", r.FetchAllTodo)
	g.GET("/:id", r.FetchSingleTodo)
	g.PUT("/:id", r.UpdateTodo)
	g.DELETE("/:id", r.DeleteTodo)
}

func listResources(db *gorm.DB, g *gin.RouterGroup) {
	r := ListResource{DB: db}

	g.POST("/", r.CreateList)
	g.GET("/", r.FetchAllList)
	g.GET("/:id", r.FetchSingleList)
	g.GET("/:id/todos", r.FetchListTodos)
	g.PUT("/:id", r.UpdateList)
	g.DELETE("/:id", r.DeleteList)
}
