<form class="form-horizontal" id="addingGroceryForm" method="POST">
    <div class="row form-group">
        <div class="col-md-4 col-sm-4">
            <input type="text" class="form-control" id="addGroceryName" name="addGroceryName" placeholder="Grocery Name">
        </div>


        <div class="col-md-2 col-sm-2">
            <input type="number" class="form-control" id="addQuantity" name="addQuantity" placeholder="Quantity">
        </div>

        <div class="col-md-2 col-sm-2">
            <input type="number" class="form-control" id="addPrice" name="addPrice" placeholder="Price(Rs.)">
        </div>
        <div class="col-md-2 col-sm-4">
            <div id="addGroceryDate" class="input-group input-append date">
            <input type="text" class="form-control" id="groceryAddDate" name="groceryAddDate" placeholder="Select Date" readonly="readonly">
            <span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>
            </div>
        </div>


    </div>
    <div class="row form-group">
        <div class="col-md-3 col-sm-3">
            <input type="submit" id="submitGrocery" class="btn btn-success" value="Add">
            <button type="button" id="cancelGroceryAddition" class="btn btn-warning">Cancel</button>
        </div>
    </div>

</form>