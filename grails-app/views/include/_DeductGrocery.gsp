<form class="form-horizontal" id="deductGroceryForm" method="POST">
    <div class="row form-group">
        <div class="col-md-3">
            <input type="text" class="form-control" id="deductGroceryName" name="deductGroceryName" placeholder="Grocery Name">
        </div>


        <div class="col-md-3">
            <input type="number" class="form-control" id="deductQuantity" name="deductQuantity" placeholder="Quantity">
        </div>

        <div class="col-md-2">
            <div id="deductGroceryDate" class="input-group input-append date">
                <input type="text" class="form-control" id="groceryDeductDate" name="groceryDeductDate" placeholder="Select Date" readonly="readonly">
                <span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>
            </div>
        </div>

        <div class="col-md-3">
            <i id="deductGrocery" class="glyphicon glyphicon-ok-circle text-success dataTableAddActionSize" aria-hidden="true"></i>
            <i id="cancelGroceryDeduction" class="glyphicon glyphicon-remove-circle text-warning dataTableAddActionSize" aria-hidden="true"></i>
        </div>
    </div>
</form>