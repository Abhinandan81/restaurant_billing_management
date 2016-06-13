<form class="form-horizontal" id="userModificationForm" method="POST">
    <div class="row form-group">
        <div class="col-md-2" >
            <label class="control-label labelColor" for="currentBranch">Current Branch</label>
        </div>
        <div class="col-md-6">
            <input type="text" class="form-control" id="currentBranch" name="currentBranch">
            </select>
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2" >
            <label class="labelColor">Change Branch</label>
        </div>
        <div class="col-md-6">
            <select id="selectNewBranch" name="branchName" class="form-control" data-toggle="tooltip" data-placement="right" title="Select a new branch only if you intend to change the branch of this user, otherwise left this field as it is.">
            </select>
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2" >
            <label class="control-label text-warning" for="currentUserName">User Name</label>
        </div>
        <div class="col-md-6">
            <input type="email" class="form-control" id="currentUserName" name="userName" placeholder="Email address"
                   data-toggle="tooltip" data-placement="right" title="User name can not be changed">
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
            <label class="control-label text-warning" for="newPassword">Reset Password</label>
        </div>
        <div class="col-md-6">
            <input type="password" class="form-control" id="newPassword" name="password" placeholder="Minimum 5 characters">
        </div>
        <div class="col-md-2">
            <i id='editPassword' class='glyphicon glyphicon-edit text-info' aria-hidden='true' data-toggle="tooltip" data-placement="right" title="Edit password only if you want intend to reset the password, otherwise left this field as it is."></i>
        </div>
    </div>

    <div class="row form-group">
        <div class="col-md-2">
        </div>

        <div class="col-md-6">
            <input type="submit" id="userUpdateSubmit" class="btn btn-success" value="Update">
            <button type="button" id="cancelUserUpdate" class="btn btn-warning">Cancel</button>
        </div>

    </div>
</form>