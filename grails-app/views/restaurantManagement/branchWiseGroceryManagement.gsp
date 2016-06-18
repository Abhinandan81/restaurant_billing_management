<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Branch Wise Grocery Management</title>
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
                Grocery Management
            </h1>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-xs-12 col-md-12 col-lg-12">

                    <div  class="box">
                        <div id="groceryMenu" class="backgroundColor">

                            <div class="box-body">

                                <div class="row form-group">
                                    <div class="col-md-6">
                                        <label class="text-info">Select Branch from below to view and manage grocery</label>
                                    </div>

                                </div>

                                <div class="row form-group">
                                    <div class="col-md-6">
                                        <select id="branchOptionProvider" name="branchName" class="form-control">
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <i id='submitBranchChoice' class='glyphicon glyphicon-ok-circle text-info dataTableAddActionSize' aria-hidden='true'></i>
                                    </div>
                                </div>

                            </div><!-- /.box-body -->
                        </div>

                        <div id="branchWiseGroceryDetailsTable">

                            <div class="box-header">
                                <h4 id="branchGroceryHeader" class="box-title"></h4>

                            </div><!-- /.box-header -->

                            <div class="box-body">
                                <table id="branchWiseGroceryDataTable"
                                       class="table table-bordered table-striped tableWidth dataTable">
                                    <thead>
                                    <tr>
                                        <th>Grocery Name</th>
                                        <th>Available Quantity</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div><!-- /.box-body -->

                        </div>
                    </div><!-- /.box -->

                </div><!-- /.col -->
            </div><!-- /.row -->
        </section><!-- /.content -->
    </div><!-- /.content-wrapper -->
    <div id="addGroceryModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="addGroceryModal">
        <div class="modal-dialog modalWidth" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>

                    <h2 class="modal-title text-warning">Add Grocery</h2>
                </div>

                <div  id="addGroceryModalBody" class="modal-body fontColor">
                    <input id="menuPrice" class="form-control" type="number" placeholder="menu price - only digits allowed">
                    <span class="customError" id="invalidMessage"></span>
                </div>

                <div class="modal-footer">
                    <button id="confirmGrocerySubmit" type="button" class="btn btn-success">Add</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>

</div><!-- ./wrapper -->

<!-- page script -->
<script>
    $(document).ready(function () {
        customRestaurantJs.eventHandlers.branchWiseGroceryManagementView();
    });
</script>
</body>
</html>