<form class="form-horizontal" id="deductGroceryForm" method="POST">
    <div class="row form-group">
        <div class="col-md-3">
            <input type="text" class="form-control" id="groceryName" name="groceryName" placeholder="Grocery Name">
        </div>


        <div class="col-md-3">
            <input type="number" class="form-control" id="quantity" name="quantity" placeholder="Quantity">
        </div>

        <div class="col-md-3">
            <input type="number" class="form-control" id="price" name="price" placeholder="Price">
        </div>
        <div class="col-md-3">
            <i id="deductGrocery" class="glyphicon glyphicon-ok-circle text-success dataTableAddActionSize" aria-hidden="true"></i>
            <i id="cancelGroceryDeduction" class="glyphicon glyphicon-remove-circle text-warning dataTableAddActionSize" aria-hidden="true"></i>
        </div>
    </div>
</form>