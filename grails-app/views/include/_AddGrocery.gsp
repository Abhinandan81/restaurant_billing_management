<form class="form-horizontal" id="addingGroceryForm" method="POST">
    <div class="row form-group">
        <div class="col-md-2">
            <input type="text" class="form-control" id="addGroceryName" name="addGroceryName" placeholder="Grocery Name">
        </div>


        <div class="col-md-2">
            <input type="number" class="form-control" id="addQuantity" name="addQuantity" placeholder="Quantity(Kg / Ltr)">
        </div>

        <div class="col-md-2">
            <input type="number" class="form-control" id="addPrice" name="addPrice" placeholder="Price(Rs.)">
        </div>
        <div class="col-md-2">

            <div id="addGroceryDate" class="input-group input-append date">
            <input type="text" class="form-control" id="groceryAddDate" name="groceryAddDate" placeholder="Select Date" readonly="readonly">
            <span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>
            </div>
        </div>

        <div class="col-md-3">
            <button id="submitGrocery" class="btn btn-success">Add</button>
            <button id="cancelGroceryAddition" class="btn btn-warning">Cancel</button>
        </div>
    </div>
</form>