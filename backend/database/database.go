package database

import (
	"shopping-cart-backend/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	database, err := gorm.Open(sqlite.Open("shopping_cart.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database!")
	}

	err = database.AutoMigrate(&models.User{}, &models.Cart{}, &models.Item{}, &models.CartItem{}, &models.Order{})
	if err != nil {
		panic("Failed to migrate database!")
	}

	DB = database
}
