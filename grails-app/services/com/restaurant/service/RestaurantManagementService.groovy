package com.restaurant.service

import com.restaurant.domain.auth.User
import com.restaurant.domain.management.Bill
import com.restaurant.domain.management.Branch
import com.restaurant.domain.management.BranchGrocery
import com.restaurant.domain.management.BranchMenu
import com.restaurant.domain.management.Grocery
import com.restaurant.domain.management.Menu
import com.restaurant.domain.management.Restaurant
import com.utils.ServiceContext
import grails.transaction.Transactional

@Transactional
class RestaurantManagementService {
    def userManagementService
    def commonUtilService

    /**
     * New branch creation
     * @param name
     * @param address
     * @param contactNumber
     * @return : newBranchCreationStatusMap
     */
    Map newBranchCreation(String name, String address, String contactNumber, String restaurantId){
        Map newBranchCreationStatusMap  =   [:]
        Boolean menuAddStatus   =   false
        String successMessage
        try {
            Restaurant restaurant = Restaurant.findById(restaurantId)

            if (restaurant){
                Branch branch   = Branch.findByNameAndRestaurant(name, restaurant)
                if (branch){
                    newBranchCreationStatusMap << [ status: false, message: "Branch with the name ${name} already exist.Please choose another name"]
                }else {
                    Branch newBranch    =   new Branch(name: name, address: address, contactNumber: contactNumber, restaurant: restaurant)
                    newBranch.save(flush: true, failOnError: true)

                    menuAddStatus   = addMenusToBranch(restaurant, newBranch.id as String)
                    if (menuAddStatus){
                        successMessage  =   "Branch ${name} created and Menus are added successfully to the branch."
                    }else {
                        successMessage = "Branch ${name} created successfully.No menu added the branch"
                    }

                    newBranchCreationStatusMap << [ status: true, message: successMessage]
                }
            }else {
                newBranchCreationStatusMap << [ status: false, message: "Invalid restaurant"]
            }
        }catch (Exception e){
            println "Error in branch creation"+e
        }
    }

    /**
     * Branch Update
     * @param branchId
     * @param detailsToUpdate
     * @return : branchUpdateStatusMap
     */
    Map updateBranchDetails(String branchId, String restaurantId, Map detailsToUpdate){
        Map branchUpdateStatusMap   =   [:]
        try {
            Restaurant restaurant = Restaurant.findById(restaurantId)

            if (restaurant){
                    Branch branch   =   Branch.findById(branchId)
                    if (branch){
                        detailsToUpdate.each { key, value->
                            branch."${key}" =   value
                        }

                        branch.save(flush: true, failOnError: true)
                        branchUpdateStatusMap << [status: true, message: "Branch details updated successfully"]
                    }else {
                        branchUpdateStatusMap << [status: false, message: "Invalid branch details"]
                    }
            }else {
                branchUpdateStatusMap << [status: false, message: "Invalid restaurant"]
            }
            return branchUpdateStatusMap
        }catch (Exception e){
            println "Error in branch update"+e.printStackTrace()
        }
    }

    /**
     * Fetch all branch details
     * @return : List of branchDetails
     */
    List branchDetails(String restaurantId){
        List branchesDetailsList   =   []
        List branchDetailLists      =   []
        try{
            Restaurant restaurant = Restaurant.findById(restaurantId)
            if (restaurant){
                def branches  =   Branch.findAllByRestaurant(restaurant)
                branches.each { branch->
                    branchDetailLists = [branch.name, branch.address, branch.contactNumber, branch.id]
                    branchesDetailsList << branchDetailLists
                }
            }
            return branchesDetailsList
        }catch (Exception e){
            println "Error while fetching branch details"
        }
    }

    /**
     * Branch deletion
     * @param branchId
     * @return : branch deletion status
     */
    Map deleteBranch(String branchId){
        Map branchDeletionStatus    =   [:]
        Boolean branchRelatedMenuDeletion = false
        Boolean branchRelatedUserDeletion = false
        String branchName
        String branchDeletionMessage
        try {
            Branch branch   =   Branch.findById(branchId)
            if (branch){
                branchName = branch.name
                branch.delete(flush: true)

                branchRelatedMenuDeletion = deleteBranchRelatedMenus(branch.id as String)
                branchRelatedUserDeletion = deleteUserOnBranchDelete(branch.id as String)

                if (branchRelatedMenuDeletion && branchRelatedUserDeletion){
                    branchDeletionMessage = "Branch ${branchName} , it's related users and menus are deleted successfully"
                }else {
                    branchDeletionMessage = "Branch ${branchName} is deleted successfully"
                }

                branchDeletionStatus << [status: true, message: branchDeletionMessage]
            }else {
                branchDeletionStatus << [status: false, message: "Invalid branch details"]
            }
            return branchDeletionStatus
        }catch (Exception e){
            println "Error in branch deletion"
        }
    }

    /**
     * Fetch all branch details
     * @return : List of branchDetails
     */
    List branchNameByRestaurantId(String restaurantId){
        List branchesDetailsList   =   []
        try{
            Restaurant restaurant = Restaurant.findById(restaurantId)
            if (restaurant){
                def branches  =   Branch.findAllByRestaurant(restaurant)
                branches.each { branch->
                    branchesDetailsList << branch.name
                }
            }
            return branchesDetailsList
        }catch (Exception e){
            println "Error while fetching branch details"
        }
    }

    /**
     * New menu creation
     * @param restaurantId
     * @param name
     * @return
     */
    Map createMenu(String restaurantId, String name){
        Map menuCreationStatusMap   =   [:]
        Boolean menuBranchAssociationStatus = false
        String menuCreationStatusMessage
        try {
            Restaurant restaurant = Restaurant.findById(restaurantId)

            if (restaurant){
                Menu menu   =   Menu.findByName(name)
                if (menu){
                    menuCreationStatusMap << [status: false, message: "Menu with the name ${name} already exist.Please choose another name"]
                }else {
                    Menu newMenu    =   new Menu(name: name, restaurant: restaurant)
                    newMenu.save(flush: true, failOnError: true)

                    menuBranchAssociationStatus = addMenuToBranches(restaurant, newMenu.id as String)
                    if (menuBranchAssociationStatus){
                        menuCreationStatusMessage = "Menu with the name ${name} created successfully and added to all existing brances"
                    }else {
                        menuCreationStatusMessage = "Menu with the name ${name} created successfully"
                    }

                    menuCreationStatusMap << [status: true, message: menuCreationStatusMessage]
                }
            }else {
                menuCreationStatusMap << [status: false, message: "Invalid restaurantId"]
            }

            return menuCreationStatusMap
        }catch (Exception e){
            println "Error in creating menu"+e
        }
    }

    Map updateMenu(String menuId, String name){
        Map menuUpdateStatusMap   =   [:]
        try {
            Menu menu   =   Menu.findById(menuId)
            if (menu){
                menu.name   =   name
                menu.save(flush: true, failOnError: true)
                menuUpdateStatusMap << [status: true, message: "Menu with the name ${name} updated successfully."]
            }else {
                menuUpdateStatusMap << [status: false, message: "Menu doesn't exist"]
            }
            return menuUpdateStatusMap
        }catch (Exception e){
            println "Error in updating menu"+e
        }
    }

    /**
     * Menu deletion
     * @param menuId
     * @return
     */
    Map deleteMenu(String menuId){
        Map menuDeleteStatusMap   =   [:]
        String menuName
        String menuDeleteStatusMessage
        Boolean menuDeletionFromBranchStatus = false
        try {
            Menu menu   =   Menu.findById(menuId)
            if (menu){
                menuName    =   menu.name
                menu.delete()
                menuDeletionFromBranchStatus    =    deleteMenuFromBranches(menu.id as String)
                if(menuDeletionFromBranchStatus){
                    menuDeleteStatusMessage = "Menu ${menuName} deleted successfully from restaurant and all the branches"
                }else {
                    menuDeleteStatusMessage = "Menu ${menuName} deleted successfully from restaurant"
                }
                menuDeleteStatusMap << [status: true, message: menuDeleteStatusMessage]
            }else {
                menuDeleteStatusMap << [status: false, message: "Menu doesn't exist"]
            }
            return menuDeleteStatusMap
        }catch (Exception e){
            println "Error in updating menu"+e
        }
    }

    List fetchMenuList(String restaurantId){
        List allMenuList   =   []
        List menuList   =   []
        try {
            Restaurant restaurant = Restaurant.findById(restaurantId)
            if (restaurant) {
                List menus = Menu.findAllByRestaurant(restaurant)
                if (menus){
                    menus.each { menu->
                        menuList = []
                        menuList = [menu.name, menu.id]
                        allMenuList << menuList
                    }
                }
            }
            return allMenuList
        }catch (Exception e){
            println "Error in fetching menu"+e.printStackTrace()
        }
    }

    /**
     * Adding menus to the given branch
     * @param restaurant
     * @param branchId
     * @return
     */
    Boolean addMenusToBranch(Restaurant restaurant, String branchId){
        Boolean menuAdditionStatus  =   false
        try {
            List menus  =  Menu.findAllByRestaurant(restaurant)

            if (menus){
                menus.each { menu ->
                    try {
                        new BranchMenu(branchId: branchId, menuId: menu.id).save(flush: true, failOnError: true)
                    }catch (Exception e){
                        println "Error in adding menu to the menu"
                    }

                }
                menuAdditionStatus = true
            }
            return menuAdditionStatus
        }catch (Exception e){
            println "Error in adding menus to the branch"
        }
    }

    /**
     * Menu deletion
     * @param branchId
     * @return
     */
    Boolean deleteBranchRelatedMenus(String branchId){
        Boolean menuDeletionStatus  =   false
        List branchMenuList =   []
        try {
            branchMenuList  =   BranchMenu.findAllByBranchId(branchId)

            if (branchMenuList){
                branchMenuList.each { branchMenu ->
                    branchMenu.delete(flush: true)
                }
                menuDeletionStatus = true
            }
            return menuDeletionStatus
        }catch (Exception e){
            println "Error in deleting menus from the branch"
        }
    }

    /**
     * addMenuToBranches
     * @param restaurant
     * @param menuId
     * @return
     */
    Boolean addMenuToBranches(Restaurant restaurant, String menuId){
        Boolean menuAddStatus    =   false

        try {
            List branches   =   Branch.findAllByRestaurant(restaurant)

            if (branches){
                branches.each { branch ->
                    new BranchMenu(branchId: branch.id, menuId: menuId).save(flush: true, failOnError: true)
                }
                menuAddStatus   =   true
            }
            return  menuAddStatus
        }catch (Exception e){
            println "Error in adding menu to the Branches"
        }
    }

    /**
     * deleteMenuFromBranches
     * @param menuId
     * @return
     */
    Boolean deleteMenuFromBranches(String menuId){
        Boolean menuDeletionStatus    =   false
        List branchMenuList =   []

        try {
            branchMenuList  =   BranchMenu.findAllByMenuId(menuId)

            if (branchMenuList){
                branchMenuList.each { branchMenu ->
                    branchMenu.delete(flush: true)
                }
                menuDeletionStatus = true
            }
            return  menuDeletionStatus
        }catch (Exception e){
            println "Error in adding menu to the Branches"
        }
    }

    /**
     * deleteUserOnBranchDelete
     * @return
     */
    Boolean deleteUserOnBranchDelete(String branchId){
        Boolean userDeletionStatus  =   false
        Map userDeletionStatusMap   =   [:]

        try {
            List users  =   User.findAllByBranchId(branchId)

            if(users){
                users.each { user ->
                    userDeletionStatusMap = userManagementService.deleteUser(user.id as String)
                }
                userDeletionStatus = true
            }
            return userDeletionStatus
        }catch (Exception e){
            println "Error in user deletion"
        }
    }

    List fetchBranchWiseMenuDetails(String branchId){
        List allMenuDetails =   []
        List menuDetails
        String menuName = ""

        try {
            List menus  =   BranchMenu.findAllByBranchId(branchId)
            if (menus){
                menus.each { menu ->
                    menuName    =   commonUtilService.fetchMenuNameByMenuId(menu.menuId as String)

                    if (menuName != ""){
                        menuDetails = []
                        menuDetails = [menuName, menu.price, menu.id]
                        allMenuDetails << menuDetails
                    }
                }
            }
            return allMenuDetails
        }catch (Exception e){
            println "Error in fetching branch wise menu information"+e.printStackTrace()
        }

    }

    Map updateBranchWiseMenuPrice(String branchMenuId, Float price){
        Map priceUpdateStatusMap    =   [:]

        try {
            BranchMenu branchMenu   =   BranchMenu.findById(branchMenuId)

            if (branchMenu){
                branchMenu.price    =   price
                branchMenu.save(flush: true, failOnError: true)
                priceUpdateStatusMap << [status: true]
            }else {
                priceUpdateStatusMap << [status: false]
            }
        }catch (Exception e){
            println "Error in updating price"
        }
    }

    Map createGrocery(String restaurantId, String name){
        Map groceryCreationStatusMap = [:]
        try {
            Restaurant restaurant = Restaurant.findById(restaurantId)

            if (restaurant){
                new Grocery(name: name, restaurant: restaurant).save(flush: true, failOnError: true)
                groceryCreationStatusMap << [status:  true, message: "${name} added successfully to the grocery"]
            }else {
                groceryCreationStatusMap << [status:  false, message: "Invalid restaurant"]
            }
            return groceryCreationStatusMap
        }catch (Exception e){
            println "Error in creating grocery"
        }

    }

    Map updatingGrocery(String groceryId, String name){
        Map groceryUpdateStatusMap = [:]
        try {
            Grocery grocery =   Grocery.findById(groceryId)
            if(grocery){
                grocery.name    =   name
                grocery.save(flush: true, failOnError: true)
                groceryUpdateStatusMap << [status: true, message: "Grocery updated successfully"]
            }else {
                groceryUpdateStatusMap << [status: false, message: "Invalid Grocery"]
            }
            return groceryUpdateStatusMap
        }catch (Exception e){
            println "Error in creating grocery"
        }

    }

    Map deletingGrocery(String groceryId){
        Map groceryDeleteStatusMap = [:]
        try {
            Grocery grocery =   Grocery.findById(groceryId)
            if(grocery){
                grocery.delete(flush: true)
                groceryDeleteStatusMap << [status: true, message: "Grocery deleted successfully"]
            }else {
                groceryDeleteStatusMap << [status: false, message: "Invalid Grocery"]
            }
            return groceryDeleteStatusMap
        }catch (Exception e){
            println "Error in creating grocery"
        }

    }

    List fetchGroceryByRestaurantId(String restaurantId){
        List groceriesDetails  =   []
        List groceryDetails  =   []
        try {
            Restaurant restaurant = Restaurant.findById(restaurantId)

            if (restaurant){
                List groceries  =   Grocery.findAllByRestaurant(restaurant)
                if (groceries){
                    groceries.each { grocery ->
                        groceryDetails = []
                        groceryDetails = [grocery.name, grocery.id]
                        groceriesDetails << groceryDetails
                    }
                }
            }
            return groceriesDetails
        }catch (Exception e){
            println "Error in creating grocery"
        }
    }

    List getGroceryListByRestaurantId(String restaurantId){
        List groceriesDetails  =   []
        try {
            Restaurant restaurant = Restaurant.findById(restaurantId)

            if (restaurant){
                List groceries  =   Grocery.findAllByRestaurant(restaurant)
                if (groceries){
                    groceries.each { grocery ->
                        groceriesDetails << grocery.name
                    }
                }
            }
            return groceriesDetails
        }catch (Exception e){
            println "Error in creating grocery"
        }
    }

    Map addGrocery(String restaurantId, String branchId, String groceryId, String operationType, Float quantity, Float price, Long date, String groceryName){
        Map addGroceryStatusMap =   [:]
        try {
            BranchGrocery branchGrocery =   new BranchGrocery(restaurantId: restaurantId, branchId: branchId, groceryId: groceryId, quantity: quantity,
            price: price, operationType: operationType, date: date)
            branchGrocery.save(flush: true, failOnError: true)

            addGroceryStatusMap << [status: true, message: "${groceryName} added successfully to the stock"]
            return  addGroceryStatusMap
        }catch (Exception e){
            println "Error in making grocery entry"
        }
    }

    Map deductGrocery(String restaurantId, String branchId, String groceryId, String operationType, Float quantity, Long date, String groceryName){
        Map deductGroceryStatusMap =   [:]
        try {
            BranchGrocery branchGrocery =   new BranchGrocery(restaurantId: restaurantId, branchId: branchId, groceryId: groceryId, quantity: quantity,
                    operationType: operationType, date: date)
            branchGrocery.save(flush: true, failOnError: true)

            deductGroceryStatusMap << [status: true, message: "${groceryName} deducted successfully from the stock"]
            return  deductGroceryStatusMap
        }catch (Exception e){
            println "Error in making grocery entry"
        }
    }

    List fetchBranchWiseGroceryDetails (String branchId){
        List groceriesDetailsList   =   []
        List groceryDetailsList     =   []
        List calculatedGroceryList  =   []
        String groceryName
        String groceryId
        Float creditedQuantity      =   0
        Float deductedQuantity      =   0
        Float availableQuantity     =   0

        try {
            List groceries  =   BranchGrocery.findAllByBranchId(branchId)

            if (groceries){
                groceries.each { grocery ->
                    groceryDetailsList = []

                    if (!(calculatedGroceryList.contains(grocery.groceryId))){
                        groceryName =   commonUtilService.getGroceryNameById(grocery.groceryId)

                        if (groceryName != ""){
                            creditedQuantity    =   commonUtilService.getTotalQuantity(branchId, grocery.groceryId, "Add")
                            deductedQuantity    =   commonUtilService.getTotalQuantity(branchId, grocery.groceryId, "Deduct")
                            availableQuantity   =   creditedQuantity - deductedQuantity
                            groceryDetailsList  =   [groceryName, availableQuantity]
                            groceriesDetailsList << groceryDetailsList
                        }
                        calculatedGroceryList << grocery.groceryId
                    }
                }
                return groceriesDetailsList
            }else {
                return groceriesDetailsList
            }

        }catch (Exception e){

        }
    }

    Float getAvailableGroceryQuantity(String branchId, String groceryId){
        Float creditedQuantity      =   0
        Float deductedQuantity      =   0
        Float availableQuantity     =   0

        try {

            BranchGrocery branchGrocery =   BranchGrocery.findByBranchIdAndGroceryId(branchId, groceryId)

            if (branchGrocery){
                creditedQuantity    =   commonUtilService.getTotalQuantity(branchId, groceryId, "Add")
                deductedQuantity    =   commonUtilService.getTotalQuantity(branchId, groceryId, "Deduct")
                availableQuantity   =   creditedQuantity - deductedQuantity
            }

            return availableQuantity
        }catch (Exception e){

        }

    }

    List getMenuListByRestaurantId(String restaurantId){
        List menuDetails  =   []
        try {
            Restaurant restaurant = Restaurant.findById(restaurantId)

            if (restaurant){
                List menus  =   Menu.findAllByRestaurant(restaurant)
                if (menus){
                    menus.each { menu ->
                        menuDetails << menu.name
                    }
                }
            }
            return menuDetails
        }catch (Exception e){
            println "Error in fetching menus"
        }

    }

    Map getMenuPriceByBranchIdAndMenuId(String branchId, String menuId){
        Map menuPriceDetails    =   [:]
        try {
            BranchMenu branchMenu   =   BranchMenu.findByBranchIdAndMenuId(branchId, menuId)

            if (branchMenu){
                menuPriceDetails    << [status: true, message: branchMenu.price]
            }else {
                menuPriceDetails    << [status: false, message: "Failed to get menu price"]
            }
            return  menuPriceDetails
        }catch (Exception e){
            println "Error in getting menu price"
        }
    }

    Map persistBillDetails(ServiceContext sCtx, Map params){
        Map persistBillDetailsMap   =   [:]
        Long billDate

        try {
            Branch branch   =   Branch.findById(sCtx.branchId)

            if (branch){
                billDate = commonUtilService.stringDateToLong(params.billDate)

                new Bill(restaurantId: sCtx.restaurantId, branch: branch, customerName: params.customerName, date: billDate,
                    total: params.totalBillAmount, orderDetails: params.allBillMenuDetails ).save(flush: true, failOnError: true)

                persistBillDetailsMap << [status: true, message: "Bill generated successfully"]
            }else {
                persistBillDetailsMap << [status: false, message: "Error in bill generation"]
            }
            return persistBillDetailsMap
        }catch (Exception e){
            println "Error in bill generation"+e.printStackTrace()
        }

    }

    Map fetchSummaryInformation(String restaurantId){
        Map summaryMap  =   [:]

        String currentDate    =   new Date().format('dd/MM/yyyy')
        Long currentTimestamp
        List bills =   []
        List groceries =   []

        Float todayTotalEarning =   00
        Integer todayTotalOrders =   0

        Float addedGroceryQuantity  = 0
        Float deductedGroceryQuantity  = 0

        try {
            currentTimestamp = commonUtilService.stringDateToLong(currentDate)

            bills   =   Bill.findAllByDateAndRestaurantId(currentTimestamp, restaurantId)
            todayTotalOrders    =   bills.size()

            if (bills){
                bills.each { bill ->

                    todayTotalEarning += bill.total
                }
            }


            groceries = BranchGrocery.findAllByDateAndRestaurantId(currentTimestamp, restaurantId)

            if (groceries){
                groceries.each { grocery ->
                    if (grocery.operationType == "Add"){
                        addedGroceryQuantity    += grocery.quantity
                    }else {
                        deductedGroceryQuantity += grocery.quantity
                    }
                }
            }

            summaryMap  <<  [todaysTotalOrders  : todayTotalOrders, todayTotalEarning : todayTotalEarning,
                             addedGroceryQuantity: addedGroceryQuantity, deductedGroceryQuantity : deductedGroceryQuantity]
            return  summaryMap

        }catch (Exception e){
            println "Error in fetching summary"+e.printStackTrace()
        }
    }
}
