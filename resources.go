package main

import (
	"net/http"
)

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

type TodoResource struct {
	db *gorm.DB
}

func (m *todoModel) toDto() todoDto {
	return todoDto{
		ID:      m.ID,
		Title:   m.Title,
		Content: m.Content,
	}
}

func (r *TodoResource) fetchAllTodo(c *gin.Context) {
	todos := []todoModel{}
	r.db.Find(&todos)

	todosDto := make([]todoDto, len(todos))
	for i, m := range todos {
		todosDto[i] = m.toDto()
	}

	c.IndentedJSON(200, todosDto)
}

func (r *TodoResource) fetchSingleTodo(c *gin.Context) {
}

func (r *TodoResource) createTodo(c *gin.Context) {
	dto := todoDto{}
	if err := c.BindJSON(&dto); err != nil {
		c.Error(err)
	}

	model := todoModel{
		Content: dto.Content,
		Title:   dto.Title,
	}

	r.db.Save(&model)

	c.JSON(http.StatusCreated, model.toDto())
}

func (r *TodoResource) updateTodo(c *gin.Context) {
}

func (r *TodoResource) deleteTodo(c *gin.Context) {
}

func todoResources(db *gorm.DB, g *gin.RouterGroup) {
	r := TodoResource{db: db}

	g.POST("/", r.createTodo)
	g.GET("/", r.fetchAllTodo)
	g.GET("/:id", r.fetchSingleTodo)
	g.PUT("/:id", r.updateTodo)
	g.DELETE("/:id", r.deleteTodo)
}
