package com.restaurant.domain.management

class Bill {
    String customerName
    Long date
    String orderDetails
    Float total

    static belongsTo = [branch: Branch]
    static constraints = {
    }
}
