package main

import (
	"fmt"
	"net/http"
)

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

type (
	TodoResource struct {
		db *gorm.DB
	}
)

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
	var model todoModel
	id := c.Param("id")
	r.db.First(&model, id)

	if model.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"status":  http.StatusNotFound,
			"message": fmt.Sprintf("Todo with ID=%s not found!", id),
		})
		return
	}

	c.IndentedJSON(http.StatusOK, model.toDto())
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
	dto := todoDto{}
	if err := c.BindJSON(&dto); err != nil {
		c.Error(err)
	}

	var model todoModel
	id := c.Param("id")
	r.db.First(&model, id)

	r.db.Model(&model).Update("Title", dto.Title)
	r.db.Model(&model).Update("Content", dto.Content)

	c.JSON(http.StatusCreated, model.toDto())

}

func (r *TodoResource) deleteTodo(c *gin.Context) {
	var model todoModel
	id := c.Param("id")
	r.db.First(&model, id)

	if model.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"status":  http.StatusNotFound,
			"message": fmt.Sprintf("Todo with ID=%s not found!", id),
		})
		return
	}

	r.db.Delete(&model)
	c.IndentedJSON(http.StatusOK, model.toDto())
}

func todoResources(db *gorm.DB, g *gin.RouterGroup) {
	r := TodoResource{db: db}

	g.POST("/", r.createTodo)
	g.GET("/", r.fetchAllTodo)
	g.GET("/:id", r.fetchSingleTodo)
	g.PUT("/:id", r.updateTodo)
	g.DELETE("/:id", r.deleteTodo)
}
