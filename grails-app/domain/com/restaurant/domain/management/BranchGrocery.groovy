package com.restaurant.domain.management

class BranchGrocery {
    Float quantity
    Float price
    Date date
    String branchId
    String groceryId
    String operationType

    static constraints = {
        price nullable: true
    }
}
