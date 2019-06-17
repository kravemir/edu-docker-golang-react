package resources

import (
	"fmt"
	"net/http"
)

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

import (
	. "todo-be/dto"
	. "todo-be/model"
)

type (
	TodoResource struct {
		DB *gorm.DB
	}
)

func (r *TodoResource) FetchAllTodo(c *gin.Context) {
	todos := []TodoModel{}
	r.DB.Find(&todos)

	todosDto := make([]TodoDto, len(todos))
	for i, m := range todos {
		todosDto[i] = todoToDto(m)
	}

	c.IndentedJSON(200, todosDto)
}

func (r *TodoResource) FetchSingleTodo(c *gin.Context) {
	var model TodoModel
	id := c.Param("id")
	r.DB.First(&model, id)

	if model.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"status":  http.StatusNotFound,
			"message": fmt.Sprintf("Todo with ID=%s not found!", id),
		})
		return
	}

	c.IndentedJSON(http.StatusOK, todoToDto(model))
}

func (r *TodoResource) CreateTodo(c *gin.Context) {
	dto := TodoDto{}
	if err := c.BindJSON(&dto); err != nil {
		c.Error(err)
	}

	model := TodoModel{
		Content: dto.Content,
		Title:   dto.Title,
	}

	if dto.ListID != nil {
		model.ListID = *dto.ListID
	} else {
		model.ListID = 0
	}

	r.DB.Save(&model)

	c.JSON(http.StatusCreated, todoToDto(model))
}

func (r *TodoResource) UpdateTodo(c *gin.Context) {
	dto := TodoDto{}
	if err := c.BindJSON(&dto); err != nil {
		c.Error(err)
	}

	var model TodoModel
	id := c.Param("id")
	r.DB.First(&model, id)

	r.DB.Model(&model).Update("Title", dto.Title)
	r.DB.Model(&model).Update("Content", dto.Content)

	c.JSON(http.StatusCreated, todoToDto(model))

}

func (r *TodoResource) DeleteTodo(c *gin.Context) {
	var model TodoModel
	id := c.Param("id")
	r.DB.First(&model, id)

	if model.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"status":  http.StatusNotFound,
			"message": fmt.Sprintf("Todo with ID=%s not found!", id),
		})
		return
	}

	r.DB.Delete(&model)
	c.IndentedJSON(http.StatusOK, todoToDto(model))
}
