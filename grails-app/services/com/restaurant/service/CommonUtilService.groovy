
package com.restaurant.service

import com.restaurant.domain.management.Branch
import com.restaurant.domain.management.BranchGrocery
import com.restaurant.domain.management.Grocery
import com.restaurant.domain.management.Menu
import com.restaurant.domain.management.Restaurant
import grails.transaction.Transactional

import java.text.SimpleDateFormat

@Transactional
class CommonUtilService {

    String fetchBranchNameByBranchId(String branchId){
        String branchName = ""
        try {
            Branch branch = Branch.findById(branchId)
            if (branch){
                branchName  =   branch.name
            }
            return branchName
        }catch (Exception e){
            println "Error in fetching BranchName By BranchId"
        }
    }

    String fetchBranchIdByNameAndRestaurantId(String restaurantId, String branchName){
        String branchId =   ""
        try{
            Restaurant restaurant = Restaurant.findById(restaurantId)
            if (restaurant){
                Branch branch  =   Branch.findByRestaurantAndName(restaurant, branchName)
                if(branch){
                    branchId    =    branch.id
                }
            }
            return branchId
        }catch (Exception e){
            println "Error while fetching branch details"
        }

    }

    String fetchMenuNameByMenuId(String menuId){
        String menuName = ""

        try{
            Menu menu   =   Menu.findById(menuId)

            if (menu){
                menuName    =   menu.name
            }
            return  menuName
        }catch (Exception e){
            println "Error in fetching menu name"

        }
    }

    String fetchMenuIdByMenuName(String restaurantId, String name){
        String menuId = ""

        try{
            Restaurant restaurant   =   Restaurant.findById(restaurantId)
            if (restaurant){
                Menu menu   =   Menu.findByNameAndRestaurant(name, restaurant)

                if (menu){
                    menuId    =   menu.id as String
                }
            }

            return  menuId
        }catch (Exception e){
            println "Error in fetching menu name"

        }
    }

    String getGroceryNameById(String groceryId){
        String groceryName  =   ""
        try {
            Grocery grocery =   Grocery.findById(groceryId)

            if (grocery){
                groceryName =   grocery.name
            }
            return groceryName
        }catch (Exception e){
            println "Error in fetching grocery name"

        }
    }

    String getGroceryIdByName(String restaurantId, String groceryName){
        String groceryId  =   ""
        try {
            Restaurant restaurant   =   Restaurant.findById(restaurantId)
            if (restaurant){
                Grocery grocery =   Grocery.findByRestaurantAndName(restaurant, groceryName)
                if (grocery){
                    groceryId =   grocery.id as String
                }
            }
            return groceryId
        }catch (Exception e){
            println "Error in fetching grocery name"

        }
    }

    Float getTotalQuantity(String branchId, String groceryId, String operationType){
        Float availableQuantity =   0

        try {
            List groceries  =   BranchGrocery.findAllByBranchIdAndGroceryIdAndOperationType(branchId, groceryId, operationType)

            if (groceries){
                groceries.each {grocery->
                    availableQuantity   +=  grocery.quantity
                }
            }
            return availableQuantity
        }catch (Exception e){
            println "Error in fetching available quantity"
        }
    }

    Long stringDateToLong(String date){
        long longDate
        try {
            SimpleDateFormat f  = new SimpleDateFormat("dd/MM/yyyy")
            Date d              = f.parse(date)
            longDate            = d.getTime()
            return longDate
        }catch (Exception e){
            println "Error in converting date"+e.printStackTrace()
        }
    }
}