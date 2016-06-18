package com.restaurant.domain.management

class Grocery {
    String name
    static belongsTo = [restaurant :  Restaurant]
    static constraints = {
    }
}
