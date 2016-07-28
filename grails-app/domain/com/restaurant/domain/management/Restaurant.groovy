package com.restaurant.domain.management

class Restaurant {
    String name
    String address
    String contactNumber
    String ownerFirstName
    String ownerLastName

    static hasMany = [branches: Branch, menus : Menu, groceries : Grocery]

    static constraints = {
    }
}
