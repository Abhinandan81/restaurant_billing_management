<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>User Management</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
</head>

<body class="hold-transition skin-blue sidebar-mini fixed">
<div class="wrapper">

    <!-- Left side column. contains the logo and sidebar -->

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper topPadding">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                User Management
            </h1>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <div id="existingBranchDetails" class="box">
                        <div class="box-header">
                            <h4 class="box-title">Existing User Details</h4>
                            <div class="pull-right">
                                <i id="newBranch" class="glyphicon glyphicon-plus-sign text-success dataTableAddActionSize" aria-hidden="true"></i>
                            </div>
                        </div><!-- /.box-header -->

                        <div class="box-body">
                            <table id="branchDataTable" class="table table-bordered table-striped tableWidth dataTable">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Contact Number</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                            </table>
                        </div><!-- /.box-body -->
                    </div><!-- /.box -->

                    <div id="branchEditing" class="box">
                        <div class="box-header">
                            <h4 id="categoryHeader"  class="box-title">New Branch Creation</h4>
                        </div><!-- /.box-header -->

                        <div class="box-body">
                            <g:render template="/include/NewBranchForm"></g:render>
                        </div><!-- /.box-body -->
                    </div><!-- /.box -->

                </div><!-- /.col -->
            </div><!-- /.row -->
        </section><!-- /.content -->
    </div><!-- /.content-wrapper -->

    <div id="deleteBranchModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="deleteBranchModal">
        <div class="modal-dialog modalWidth" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>

                    <h2 class="modal-title text-warning">Delete Branch</h2>
                </div>

                <div  id="deleteBranchModalBody" class="modal-body fontColor">
                    <p id="branchDeletionMessage" class="text-info"></p>
                    <div id="branchDeletionModalBody">
                        <input id="branchNameValidator" class="form-control" type="text" placeholder="Branch Name here">
                        <span class="customError" id="invalidBranchNameMessage"></span>
                    </div>

                </div>

                <div class="modal-footer">
                    <button id="confirmBranchDelete" type="button" class="btn btn-danger">Delete</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>

</div><!-- ./wrapper -->

<!-- page script -->
<script>
    $(document).ready(function () {
    });
</script>
</body>
</html>