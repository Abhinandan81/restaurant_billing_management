<form class="form-horizontal" id="userCreationForm" method="POST">
    <div class="row form-group">
        <div class="col-md-2" >
            <label class="labelColor">Select Branch</label>
        </div>
        <div class="col-md-6">

            <select id="selectBranch" name="branchName" class="form-control">
            </select>
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2" >
            <label class="control-label labelColor" for="userName">User Name</label>
        </div>
        <div class="col-md-6">
            <input type="email" class="form-control" id="userName" name="userName" placeholder="Email address">
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
            <input type="text" class="form-control" id="contactNumber" name="contactNumber" placeholder="Mobile Number">
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2" >
            <label class="control-label labelColor" for="password">Password</label>
        </div>
        <div class="col-md-6">
            <input type="password" class="form-control" id="password" name="password" placeholder="Minimum 5 characters">
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