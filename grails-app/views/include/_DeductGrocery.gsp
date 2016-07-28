<form class="form-horizontal" id="deductGroceryForm" method="POST">
    <div class="row form-group">
        <div class="col-md-3 col-sm-4">
            <input type="text" class="form-control" id="deductGroceryName" name="deductGroceryName" placeholder="Grocery Name">
        </div>


        <div class="col-md-3 col-sm-4">
            <input type="number" class="form-control" id="deductQuantity" name="deductQuantity" placeholder="Quantity">
        </div>

        <div class="col-md-2 col-sm-4">
            <div id="deductGroceryDate" class="input-group input-append date">
                <input type="text" class="form-control" id="groceryDeductDate" name="groceryDeductDate" placeholder="Select Date" readonly="readonly">
                <span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>
            </div>
        </div>


    </div>
    <div class="row form-group">
        <div class="col-md-3 col-sm-3">
            <input type="submit" id="deductGrocery" class="btn btn-success" value="Deduct">
            <button type="button" id="cancelGroceryDeduction" class="btn btn-warning">Cancel</button>
        </div>
    </div>
</form>