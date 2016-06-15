package com.restaurant.domain.management

class BranchMenu {
    String branchId
    String menuId
    Float price = 00.00

    static constraints = {
        price nullable: true
    }
}
