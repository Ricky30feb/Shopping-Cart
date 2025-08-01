package main

import (
	"shopping-cart-backend/controllers"
	"shopping-cart-backend/database"
	"shopping-cart-backend/middleware"
	"shopping-cart-backend/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func main() {
	// Initialize database
	database.ConnectDatabase()

	// Create a test user with hashed password
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("password"), bcrypt.DefaultCost)
	database.DB.Create(&models.User{Username: "testuser", Password: string(hashedPassword)})

	// Create some sample items
	database.DB.Create(&models.Item{Name: "Laptop", Status: "available"})
	database.DB.Create(&models.Item{Name: "Phone", Status: "available"})
	database.DB.Create(&models.Item{Name: "Tablet", Status: "available"})
	database.DB.Create(&models.Item{Name: "Watch", Status: "available"})
	database.DB.Create(&models.Item{Name: "Headphones", Status: "available"})

	r := gin.Default()

	// CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// Public routes
	r.POST("/users", controllers.CreateUser)
	r.GET("/users", controllers.GetUsers)
	r.POST("/users/login", controllers.LoginUser)
	r.POST("/items", controllers.CreateItem)
	r.GET("/items", controllers.GetItems)

	// Protected routes that require token
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
