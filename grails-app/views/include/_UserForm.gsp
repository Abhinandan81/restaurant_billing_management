<form class="form-horizontal" id="branchModificationForm" method="POST">
    <div class="row form-group">
        <div class="col-md-2" >
            <label class="labelColor">Select Branch</label>
        </div>
        <div class="col-md-6">

            <select id="selectBranch" class="form-control">
            </select>
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2" >
            <label class="control-label labelColor" for="userName">Email Address</label>
        </div>
        <div class="col-md-6">
            <input type="text" class="form-control" id="userName" name="userName">
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2" >
            <label class="control-label labelColor" for="firstName">First Name</label>
        </div>
        <div class="col-md-6">
            <input type="text" class="form-control" id="firstName" name="firstName">
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2" >
            <label class="control-label labelColor" for="lastName">Last Name</label>
        </div>
        <div class="col-md-6">
            <input type="text" class="form-control" id="lastName" name="lastName">
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2" >
            <label class="control-label labelColor" for="contactNumber">Contact Number</label>
        </div>
        <div class="col-md-6">
            <input type="text" class="form-control" id="contactNumber" name="contactNumber">
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2" >
            <label class="control-label labelColor" for="password">Password</label>
        </div>
        <div class="col-md-6">
            <input type="text" class="form-control" id="password" name="password">
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2" >
            <label class="control-label labelColor" for="confirmPassword">Confirm Password</label>
        </div>

        <div class="col-md-6">
            <input type="text" class="form-control" id="confirmPassword" name="confirmPassword">
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2">
        </div>

        <div class="col-md-6">
            <input type="submit" id="userSubmit" class="btn btn-success">
            <button type="button" id="cancelButton" class="btn btn-warning">Cancel</button>
        </div>

    </div>
</form>