<form class="form-horizontal" id="billingForm" method="POST">
    <div class="row form-group">
        <div class="col-md-2">
            <input type="text" class="form-control" id="customerName" name="customerName" placeholder="Customer Name">
        </div>

        <div class="col-md-2">

            <div id="addBillDate" class="input-group input-append date" data-date-format="dd/mm/yyyy">
                <input type="text" class="form-control" id="billDate" name="billDate">
                <span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>
            </div>
        </div>
    </div>

    <div class="row form-group">


        <div class="container">
            <div class="row">
                    <div class="input_fields_wrap">

                        <input id="billMenuName_1" class="billMenuName" type="text" name="menuName[]">
                        <input id="billMenuPrice_1" class="billMenuPrice" type="number" name="menuPrice[]" readonly="true">
                        <input id="quantity_1" class="billMenuQuantity" type="number" name="quantity[]" min="1">
                        <input id="menuTotalPrice_1" class="billMenuTotalPrice" type="number" name="menuTotalPrice[]" readonly="true">
                        <i id="add_field_button" class="glyphicon glyphicon-plus-sign text-success dataTableAddActionSize" aria-hidden="true"></i>                    </div>
                <div>
                    <input id="totalBillAmount" type="number" name="billTotalPrice" readonly="true">
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <input type="submit" id="submitGrocery" class="btn btn-success" value="Add">
            <button type="button" id="cancelGroceryAddition" class="btn btn-warning">Cancel</button>
        </div>
    </div>
</form>