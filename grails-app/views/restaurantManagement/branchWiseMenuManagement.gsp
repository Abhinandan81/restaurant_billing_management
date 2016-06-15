<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Branch Wise Menu Price Management</title>
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
                Menu Price Management
            </h1>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-xs-12 col-md-12 col-lg-12">

                    <div id="branchMenu" class="box">
                        <div class="box-header">
                        </div><!-- /.box-header -->

                        <div class="box-body">

                            <div class="row form-group">
                                <div class="col-md-6" >
                                    <label class="text-info">Select Branch from below to view and set branch wise Menu price</label>
                                </div>

                            </div>

                            <div class="row form-group">
                                <div class="col-md-2" >
                                    <label class="labelColor">Select Branch</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="branchOptionProvider" name="branchName" class="form-control">
                                    </select>
                                </div>
                            </div>

                        <div class="row form-group">
                            <div class="col-md-2" >
                            </div>
                            <div class="col-md-6">
                                <button id="submitBranchChoice" class="btn btn-success">Go</button>
                            </div>
                        </div>

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
        customRestaurantJs.eventHandlers.branchWiseMenuManagementView();
    });
</script>
</body>
</html>