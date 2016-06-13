<form class="form-horizontal" id="userModificationForm" method="POST">
    <div class="row form-group">
        <div class="col-md-2" >
            <label class="labelColor">Current Branch</label>
        </div>
        <div class="col-md-6">

            <select id="currentBranch" name="currentBranch" class="form-control">
            </select>
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2" >
            <label class="labelColor">Change Branch</label>
        </div>
        <div class="col-md-6">
            <select id="selectBranch" name="branchName" class="form-control">
            </select>
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2" >
            <label class="control-label labelColor" for="currentUserName">User Name</label>
        </div>
        <div class="col-md-6">
            <input type="email" class="form-control" id="currentUserName" name="userName" placeholder="Email address">
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2" >
            <label class="control-label labelColor" for="currentFirstName">First Name</label>
        </div>
        <div class="col-md-6">
            <input type="text" class="form-control" id="currentFirstName" name="firstName">
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2" >
            <label class="control-label labelColor" for="currentLastName">Last Name</label>
        </div>
        <div class="col-md-6">
            <input type="text" class="form-control" id="currentLastName" name="lastName">
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2" >
            <label class="control-label labelColor" for="currentContactNumber">Contact Number</label>
        </div>
        <div class="col-md-6">
            <input type="text" class="form-control" id="currentContactNumber" name="contactNumber" placeholder="Mobile Number">
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2" >
            <label class="control-label labelColor" for="newPassword">New Password</label>
        </div>
        <div class="col-md-6">
            <input type="password" class="form-control" id="newPassword" name="password" placeholder="Minimum 5 characters">
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