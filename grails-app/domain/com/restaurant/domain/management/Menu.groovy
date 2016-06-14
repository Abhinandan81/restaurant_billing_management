package com.restaurant.domain.management

class Menu {
    String name

    static belongsTo = [restaurant : Restaurant]
    static constraints = {
    }
}
