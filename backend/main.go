package main

import (
	"log"
	"shopping-cart-backend/controllers"
	"shopping-cart-backend/database"
	"shopping-cart-backend/middleware"
	"shopping-cart-backend/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func main() {
	database.ConnectDatabase()
	
	// Auto-seed the database with initial data
	seedDatabase()
	
	r := gin.Default()
	
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "https://ricky30feb.github.io"},
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

	// Protected routes
	protected := r.Group("/")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.POST("/carts", controllers.AddItemToCart)
		protected.GET("/carts", controllers.GetCarts)
		protected.POST("/orders", controllers.CreateOrder)
		protected.GET("/orders", controllers.GetOrders)
		protected.POST("/users/logout", controllers.LogoutUser)
	}

	r.Run(":8080")
}

func seedDatabase() {
	log.Println("Auto-seeding database with initial data...")
	
	// Create default user
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte("testpass123"), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("Failed to hash password: %v", err)
		return
	}

	user := models.User{
		Username: "testuser",
		Password: string(hashedPassword),
	}

	if err := database.DB.FirstOrCreate(&user, models.User{Username: "testuser"}).Error; err != nil {
		log.Printf("Failed to seed user: %v", err)
		return
	}

	// Create default items
	items := []models.Item{
		{Name: "Laptop", Status: "available"},
		{Name: "Smartphone", Status: "available"},
		{Name: "Headphones", Status: "available"},
		{Name: "Gaming Mouse", Status: "available"},
		{Name: "Mechanical Keyboard", Status: "available"},
		{Name: "4K Monitor", Status: "available"},
		{Name: "Wireless Charger", Status: "available"},
		{Name: "USB-C Hub", Status: "available"},
		{Name: "Bluetooth Speaker", Status: "available"},
		{Name: "Webcam", Status: "available"},
		{Name: "Power Bank", Status: "available"},
		{Name: "Tablet", Status: "available"},
		{Name: "Smart Watch", Status: "available"},
		{Name: "External SSD", Status: "available"},
		{Name: "Phone Case", Status: "available"},
		{Name: "Gaming Chair", Status: "available"},
		{Name: "Desk Lamp", Status: "available"},
		{Name: "Coffee Mug", Status: "available"},
		{Name: "Standing Desk", Status: "available"},
		{Name: "Drone", Status: "available"},
		{Name: "VR Headset", Status: "available"},
		{Name: "Fitness Tracker", Status: "available"},
		{Name: "Electric Toothbrush", Status: "available"},
		{Name: "Air Purifier", Status: "available"},
		{Name: "Smart Bulb Set", Status: "available"},
	}

	for _, item := range items {
		if err := database.DB.FirstOrCreate(&item, models.Item{Name: item.Name}).Error; err != nil {
			log.Printf("Failed to seed item %s: %v", item.Name, err)
		}
	}
	
	log.Println("Database seeding complete!")
}
