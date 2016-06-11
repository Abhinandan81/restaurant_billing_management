package com.restaurant.domain.management

class Branch {
    String name
    String address
    String contactNumber

    static hasMany = [bills: Bill]
    static belongsTo = [restaurant : Restaurant]

    static constraints = {
    }
}
