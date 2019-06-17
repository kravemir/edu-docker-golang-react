module todo-be

go 1.12

require (
	github.com/gin-gonic/gin v1.4.0
	github.com/jinzhu/gorm v1.9.8
)

replace (
	todo-be => ./
	todo-be/dto => ./dto
	todo-be/model => ./model
	todo-be/resources => ./resources
)
