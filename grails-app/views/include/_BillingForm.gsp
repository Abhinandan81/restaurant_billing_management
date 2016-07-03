<form class="form-horizontal" id="billingForm" method="POST">
    <div class="row form-group">
        <div class="col-md-2">
            <input type="text" class="form-control" id="customerName" name="customerName" placeholder="Customer Name">
        </div>

        <div class="col-md-2">

            <div id="addBillDate" class="input-group input-append date" data-date-format="dd/mm/yyyy">
                <input type="text" class="form-control" id="billDate" name="billDate" readonly="readonly">
                <span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>
            </div>
        </div>
    </div>

    <hr>

    <div class="row form-group">


        <div class="container">
            <div class="row">
                    <div class="input_fields_wrap">
                        <div class="col-md-4">
                            <input id="billMenuName_1" class="billMenuName inputBoxWidth" type="text" name="menuName[]">
                        </div>

                        <div class="col-md-1">
                            <span id="billMenuPrice_1" class="billMenuPrice" name="menuPrice[]"></span>
                        </div>

                        <div class="col-md-1">
                            <input id="quantity_1" class="billMenuQuantity inputBoxWidth" type="number" name="quantity[]" min="1">
                        </div>

                        <div class="col-md-1">
                            <span id="menuTotalPrice_1" class="billMenuTotalPrice" name="menuTotalPrice[]"></span>
                        </div>

                        <div class="col-md-1">
                            <i id="add_field_button" class="glyphicon glyphicon-plus-sign text-success dataTableAddActionSize" aria-hidden="true"></i>
                        </div>
                    </div>
            </div>
            <div class="row topMargin">
                <div class="col-md-2" >
                    <label class="labelColor" for="totalBillAmount">Total Bill Amount:</label>
                </div>
                <div class="col-md-1">
                    <span id="totalBillAmount" name="billTotalPrice">00</span>
                </div>
            </div>
        </div>


    </div>

    <div class="row form-group">
        <div class="col-md-3"></div>
        <div class="col-md-3">
            <input type="submit" id="submitGrocery" class="btn btn-success" value="Print">
            <button type="button" id="cancelGroceryAddition" class="btn btn-warning">Cancel</button>
        </div>
    </div>
</form>