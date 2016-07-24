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
                            <g:render template="/include/BillReport"></g:render>
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