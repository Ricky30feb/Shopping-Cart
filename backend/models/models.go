package models

import (
	"time"
)

type User struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Username  string    `json:"username" gorm:"type:varchar(255);unique;not null"`
	Password  string    `json:"password" gorm:"type:varchar(255);not null"`
	Token     string    `json:"token" gorm:"type:varchar(255)"`
	CartID    *uint     `json:"cart_id"`
	CreatedAt time.Time `json:"created_at"`
}

type Cart struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	UserID    uint      `json:"user_id" gorm:"not null"`
	Name      string    `json:"name" gorm:"type:varchar(255);default:'My Cart'"`
	Status    string    `json:"status" gorm:"type:varchar(255);default:'active'"`
	Items     []Item    `gorm:"many2many:cart_items;"`
	CreatedAt time.Time `json:"created_at"`
}

type Item struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name" gorm:"type:varchar(255);not null"`
	Status    string    `json:"status" gorm:"type:varchar(255);default:'available'"`
	Carts     []Cart    `gorm:"many2many:cart_items;"`
	CreatedAt time.Time `json:"created_at"`
}

type CartItem struct {
	CartID    uint `json:"cart_id"`
	ItemID    uint `json:"item_id"`
	CreatedAt time.Time
}

type Order struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	CartID    uint      `json:"cart_id" gorm:"not null"`
	UserID    uint      `json:"user_id" gorm:"not null"`
	CreatedAt time.Time `json:"created_at"`
}
