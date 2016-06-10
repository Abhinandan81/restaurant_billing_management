<form class="form-horizontal" id="newCategoryForm" method="POST">
    <div class="form-group">
        <label class="control-label labelColor" for="categoryName">Category Name</label>
        <div class="col-md-6">
            <input type="text" class="form-control" id="categoryName" name="categoryName">
        </div>
    </div>

    <div class="form-group">
        <label class="control-label labelColor" for="modelNumber">Model Number</label>
        <div class="col-md-6">
            <input type="text" class="form-control" id="modelNumber" name="modelNumber">
        </div>
    </div>

    <div class="form-group">
        <label class="control-label labelColor" for="description">Description</label>

        <div class="col-md-6">
            <textarea class="form-control" cols="90" id="description" name="description"></textarea>
        </div>
    </div>

    <div class="row">
        <div class="buttonAlignment">
        </div>

        <div class="col-md-6">
            <input type="submit" id="submitButton" class="btn btn-default">

            <button type="button" id="clearButton" class="clear btn btn-default">Clear</button>
        </div>

    </div>
</form>