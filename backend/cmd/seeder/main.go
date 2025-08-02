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
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte("testpass123"), bcrypt.DefaultCost)
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
	}

	for _, item := range items {
		if err := database.DB.FirstOrCreate(&item, models.Item{Name: item.Name}).Error; err != nil {
			log.Printf("Failed to seed item %s: %v", item.Name, err)
		}
	}
}
