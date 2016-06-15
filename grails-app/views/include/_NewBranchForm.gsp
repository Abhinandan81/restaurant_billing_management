<form class="form-horizontal" id="branchModificationForm" method="POST">
    <div class="row form-group">
        <div class="col-md-2" >
            <label class="control-label labelColor" for="branchName">Branch Name</label>
        </div>
        <div class="col-md-6">
            <input type="text" class="form-control" id="branchName" name="branchName">
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2" >
            <label class="control-label labelColor" for="address">Address</label>
        </div>
        <div class="col-md-6">
            <input type="text" class="form-control" id="address" name="address">
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2" >
            <label class="control-label labelColor" for="contactNumber">Contact Number</label>
        </div>
        <div class="col-md-6">
            <input type="number" class="form-control" id="contactNumber" name="contactNumber" placeholder="mobile number - only digits allowed">
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2">
        </div>

        <div class="col-md-6">
            <input type="submit" id="branchSubmit" class="btn btn-success">
            <button type="button" id="cancelButton" class="btn btn-warning">Cancel</button>
        </div>

    </div>
</form>