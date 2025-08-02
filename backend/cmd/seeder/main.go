package main

import (
	"log"
	"shopping-cart-backend/database"
	"shopping-cart-backend/models"

	"golang.org/x/crypto/bcrypt"
)

func main() {
	log.Println("Connecting to the database...")
	database.ConnectDatabase()
	log.Println("Database connected.")

	log.Println("Seeding the database with initial data...")
	seedDatabase()
	log.Println("Database seeding complete.")
}

func seedDatabase() {
	// Create a test user
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte("password123"), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("Failed to hash password: %v", err)
	}

	user := models.User{
		Username: "testuser",
		Password: string(hashedPassword),
	}

	if err := database.DB.FirstOrCreate(&user, models.User{Username: "testuser"}).Error; err != nil {
		log.Fatalf("Failed to seed user: %v", err)
	}

	// Create some items
	items := []models.Item{
		{Name: "Laptop", Status: "available"},
		{Name: "Phone", Status: "available"},
		{Name: "Tablet", Status: "available"},
		{Name: "Watch", Status: "available"},
		{Name: "Headphones", Status: "available"},
	}

	for _, item := range items {
		if err := database.DB.FirstOrCreate(&item, models.Item{Name: item.Name}).Error; err != nil {
			log.Printf("Failed to seed item %s: %v", item.Name, err)
		}
	}
}
