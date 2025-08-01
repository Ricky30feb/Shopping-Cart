package controllers

import (
	"net/http"
	"shopping-cart-backend/database"
	"shopping-cart-backend/models"

	"github.com/gin-gonic/gin"
)

func AddItemToCart(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	var input struct {
		ItemID uint `json:"item_id"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get or create cart for user
	var cart models.Cart
	err := database.DB.Where("user_id = ? AND status = ?", userID, "active").First(&cart).Error
	if err != nil {
		// Create new cart if none exists
		cart = models.Cart{
			UserID: userID.(uint),
			Status: "active",
		}
		if err := database.DB.Create(&cart).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create cart"})
			return
		}
	}

	// Add item to cart
	cartItem := models.CartItem{
		CartID: cart.ID,
		ItemID: input.ItemID,
	}
	
	if err := database.DB.Create(&cartItem).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add item to cart"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Item added to cart successfully"})
}

func GetCarts(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	var cart models.Cart
	if err := database.DB.Where("user_id = ? AND status = ?", userID, "active").First(&cart).Error; err != nil {
		c.JSON(http.StatusOK, []models.CartItem{})
		return
	}

	var cartItems []models.CartItem
	database.DB.Where("cart_id = ?", cart.ID).Find(&cartItems)
	
	c.JSON(http.StatusOK, cartItems)
}