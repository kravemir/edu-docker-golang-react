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
	ListResource struct {
		DB *gorm.DB
	}
)

func (r *ListResource) FetchAllList(c *gin.Context) {
	lists := []ListModel{}
	r.DB.Find(&lists)

	listsDto := make([]ListDto, len(lists))
	for i, m := range lists {
		listsDto[i] = listToDto(m)
	}

	c.IndentedJSON(200, listsDto)
}

func (r *ListResource) FetchSingleList(c *gin.Context) {
	var model ListModel
	id := c.Param("id")
	r.DB.First(&model, id)

	if model.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"status":  http.StatusNotFound,
			"message": fmt.Sprintf("Todo with ID=%s not found!", id),
		})
		return
	}

	c.IndentedJSON(http.StatusOK, listToDto(model))
}

func (r *ListResource) FetchListTodos(c *gin.Context) {
	var model ListModel
	id := c.Param("id")
	r.DB.Preload("Todos").First(&model, id)

	if model.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"status":  http.StatusNotFound,
			"message": fmt.Sprintf("List with ID=%s not found!", id),
		})
		return
	}

	todosDto := make([]TodoDto, len(model.Todos))
	for i, m := range model.Todos {
		todosDto[i] = todoToDto(m)
	}

	c.IndentedJSON(200, todosDto)
}

func (r *ListResource) CreateList(c *gin.Context) {
	dto := ListDto{}
	if err := c.BindJSON(&dto); err != nil {
		c.Error(err)
	}

	model := ListModel{
		Name: dto.Name,
	}

	r.DB.Save(&model)

	c.JSON(http.StatusCreated, listToDto(model))
}

func (r *ListResource) UpdateList(c *gin.Context) {
	dto := ListDto{}
	if err := c.BindJSON(&dto); err != nil {
		c.Error(err)
	}

	var model ListModel
	id := c.Param("id")
	r.DB.First(&model, id)

	r.DB.Model(&model).Update("Name", dto.Name)

	c.JSON(http.StatusCreated, listToDto(model))

}

func (r *ListResource) DeleteList(c *gin.Context) {
	var model ListModel
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
	c.IndentedJSON(http.StatusOK, listToDto(model))
}
