package models

import (
	"time"
)

type User struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Username  string    `json:"username" gorm:"unique;not null"`
	Password  string    `json:"password" gorm:"not null"`
	Token     string    `json:"token"`
	CartID    uint      `json:"cart_id"`
	CreatedAt time.Time `json:"created_at"`
}

type Cart struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	UserID    uint      `json:"user_id" gorm:"not null"`
	Name      string    `json:"name" gorm:"default:'My Cart'"`
	Status    string    `json:"status" gorm:"default:'active'"`
	CreatedAt time.Time `json:"created_at"`
}

type Item struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name" gorm:"not null"`
	Status    string    `json:"status" gorm:"default:'available'"`
	CreatedAt time.Time `json:"created_at"`
}

type CartItem struct {
	CartID uint `json:"cart_id" gorm:"primaryKey"`
	ItemID uint `json:"item_id" gorm:"primaryKey"`
}

type Order struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	CartID    uint      `json:"cart_id" gorm:"not null"`
	UserID    uint      `json:"user_id" gorm:"not null"`
	CreatedAt time.Time `json:"created_at"`
}
