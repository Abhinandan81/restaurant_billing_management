<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Menu Management</title>
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
                Menu Management
            </h1>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <div id="existingMenuDetails" class="box">
                        <div class="box-header">
                            <h4 class="box-title">Existing Menu Details</h4>
                            <div class="pull-right">
                                <i id="newUser" class="glyphicon glyphicon-plus-sign text-success dataTableAddActionSize" aria-hidden="true"></i>
                            </div>
                        </div><!-- /.box-header -->

                        <div class="box-body">
                            <table id="menuDataTable" class="table table-bordered table-striped tableWidth dataTable">
                                <thead>
                                <tr>
                                    <th>Menu Name</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                            </table>
                        </div><!-- /.box-body -->
                    </div><!-- /.box -->

                    <div id="newMenuCreation" class="box">
                        <div class="box-header">
                            <h4 class="box-title"></h4>
                        </div><!-- /.box-header -->

                        <div class="box-body">
                            <g:render template="/include/MenuForm"></g:render>
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
    });
</script>
</body>
</html>