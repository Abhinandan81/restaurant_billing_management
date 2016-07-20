<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Reports Management</title>
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
                Reports
            </h1>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <div id="reportSelectionDiv" class="box">
                        %{-- <div class="box-header">
                             <h4 id="branchHeader"  class="box-title">Select report type to view details</h4>
                         </div><!-- /.box-header -->--}%

                        <div class="box-body">
                            <form class="form-horizontal" id="billReportForm" method="POST">
                                <div class="radio col-md-12 col-sm-12">
                                    <label><input type="radio" name="reportType">Billing Report</label>
                                    <label><input type="radio" name="reportType">Grocery Report</label>
                                </div>

                                <div class="col-md-12 col-sm-12 reportRowMargin">
                                    <div id="reportInputDiv" class="radio col-md-3 col-sm-3">
                                        <select id="branchOptions" name="branchName" class="form-control">
                                        </select>
                                    </div>

                                    <div class="col-md-2 col-sm-2">
                                        <div id="reportStartDate" class="input-group input-append date">
                                            <input type="text" class="form-control" id="startDate" name="startDate"
                                                   placeholder="Start Date" readonly="readonly">
                                            <span class="input-group-addon add-on"><span
                                                    class="glyphicon glyphicon-calendar"></span></span>
                                        </div>
                                    </div>

                                    <div class="col-md-2 col-sm-2">
                                        <div id="reportEndDate" class="input-group input-append date">
                                            <input type="text" class="form-control" id="endDate" name="endDate"
                                                   placeholder="End Date" readonly="readonly">
                                            <span class="input-group-addon add-on"><span
                                                    class="glyphicon glyphicon-calendar"></span></span>
                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <input type="submit" id="getReport" class="btn btn-default" value="Get Report">
                                    </div>
                                </div>

                            </form>
                            %{--<g:render template="/include/NewBranchForm"></g:render>--}%
                        </div><!-- /.box-body -->
                    </div><!-- /.box -->


                    <div id="reportDetailsDiv" class="box">
                        <div class="box-header">
                            <h4 class="box-title">Existing Branch Details</h4>

                            <div class="pull-right">
                                <i id="newBranch"
                                   class="glyphicon glyphicon-plus-sign text-success dataTableAddActionSize"
                                   aria-hidden="true"></i>
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

                </div><!-- /.col -->
            </div><!-- /.row -->
        </section><!-- /.content -->
    </div><!-- /.content-wrapper -->
</div><!-- ./wrapper -->

<!-- page script -->
<script>
    $(document).ready(function () {
        customRestaurantJs.eventHandlers.dashboardReportView();
    });
</script>
</body>
</html>