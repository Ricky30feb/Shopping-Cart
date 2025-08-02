package main

import (
	"shopping-cart-backend/controllers"
	"shopping-cart-backend/database"
	"shopping-cart-backend/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	database.ConnectDatabase()
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "https://ricky30feb.github.io"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	r.POST("/users", controllers.CreateUser)
	r.GET("/users", controllers.GetUsers)
	r.POST("/users/login", controllers.LoginUser)
	r.POST("/items", controllers.CreateItem)
	r.GET("/items", controllers.GetItems)

	protected := r.Group("/")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.POST("/carts", controllers.AddItemToCart)
		protected.GET("/carts", controllers.GetCarts)
		protected.POST("/orders", controllers.CreateOrder)
		protected.GET("/orders", controllers.GetOrders)
	}

	r.Run(":8080")
}
