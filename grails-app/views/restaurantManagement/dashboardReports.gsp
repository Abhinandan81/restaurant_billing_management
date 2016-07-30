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
                    <div id="reportSelectionDiv" class="box backgroundColor">
                        <div class="box-body">
                            <form class="form-horizontal" id="billReportForm" method="POST">
                                <div class="radio col-md-12 col-sm-12">
                                    <label><input type="radio" name="reportType" checked value="bill">Billing Report</label>
                                    <label><input type="radio" name="reportType" value="grocery">Grocery Report</label>
                                </div>


                                <div class="col-md-12 col-sm-12 reportRowMargin">
                                    <div id="reportInputDiv" class="radio col-md-3 col-sm-4">
                                        <select id="branchOptions" name="branchName" class="form-control">
                                        </select>
                                    </div>

                                    <div class="col-md-2 col-sm-3">
                                        <div id="reportStartDate" class="input-group input-append date">
                                            <input type="text" class="form-control" id="startDate" name="startDate"
                                                   placeholder="Start Date" readonly="readonly">
                                            <span class="input-group-addon add-on"><span
                                                    class="glyphicon glyphicon-calendar"></span></span>
                                        </div>
                                    </div>

                                    <div class="col-md-2 col-sm-3">
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

                            %{--<g:render template="/include/BillReport"></g:render>--}%
                        </div><!-- /.box-body -->
                    </div><!-- /.box -->


                    <div id="reportDetailsDiv" class="box">
                        <div class="box-header">
                            <h4 class="box-title">Bill details</h4>
                        </div><!-- /.box-header -->

                        <div class="box-body">
                            <table id="billReportDataTable" class="table table-bordered table-striped tableWidth dataTable">
                                <thead>
                                <tr class="dataTableThWidth">
                                    <th>Bill Date</th>
                                    <th>Total</th>
                                </tr>
                                </thead>
                            </table>
                        </div><!-- /.box-body -->
                    </div><!-- /.box -->

                    <div id="groceryReportDetailsDiv" class="box">
                        <div class="box-header">
                            <h4 class="box-title">Grocery details</h4>
                        </div><!-- /.box-header -->

                        <div class="box-body">
                            <table id="groceryReportDataTable" class="table table-bordered table-striped tableWidth dataTable">
                                <thead>
                                <tr class="dataTableThWidth">
                                    <th>Date</th>
                                    <th>Grocery Name</th>
                                    <th>Quantity(Kg. / Ltr.)</th>
                                    <th>Price</th>
                                    <th>Operation Type</th>
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