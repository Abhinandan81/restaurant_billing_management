package com.restaurant.domain.management

class Restaurant {
    String name
    String address
    String contactNumber
    String ownerFirstName
    String ownerLastName
    String licenseNumber
    String image

    static hasMany = [branches: Branch, menus : Menu, groceries : Grocery]

    static constraints = {
    }
}
