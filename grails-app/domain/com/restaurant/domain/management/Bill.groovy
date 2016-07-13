package com.restaurant.domain.management

class Bill {
    String customerName
    Long date
    String orderDetails
    Float total
    String restaurantId

    static belongsTo = [branch: Branch]
    static constraints = {
        orderDetails maxSize: 5000
    }
}
