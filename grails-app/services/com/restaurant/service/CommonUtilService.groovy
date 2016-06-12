package com.restaurant.service

import com.restaurant.domain.management.Branch
import grails.transaction.Transactional

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
}
