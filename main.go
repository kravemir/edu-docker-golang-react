package main

import "github.com/gin-gonic/gin"

func main() {
	db := openAndInitDb()
	defer db.Close()

	r := gin.Default()

	todo := r.Group("/api/v1/todos")
	todoResources(db, todo)

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080
}
