<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Billing</title>
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
                Billing
            </h1>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-xs-12 col-md-12 col-lg-12">

                    <div  class="box">

                        <div id="billing">

                            <div class="box-body">
                            <g:render template="/include/BillingForm"></g:render>
                            </div><!-- /.box-body -->

                        </div>
                    </div><!-- /.box -->

                </div><!-- /.col -->
            </div><!-- /.row -->
        </section><!-- /.content -->
    </div><!-- /.content-wrapper -->

</div><!-- ./wrapper -->

<!-- page script -->
<script>
    $(document).ready(function () {
           customRestaurantJs.eventHandlers.billingManagementView();
    });
</script>

<script id="bill-template" type="text/x-handlebars-template">
<div class="container">
    <div>

        <div style="width: 60%;display: inline-block;">
            <p>Customer Name- {{customerName}}</p>


            %{--  <div style="width: 30%;display: inline-block;">
                  <label>Customer Name- {{customerName}}</label>
              </div>--}%

           %{-- <div style="width: 30%;display: inline-block;">
                <p>{{customerName}}</p>
            </div>--}%

        </div>

        <div style="width: 33.34%;display: inline-block;">
            <p>Date - {{billDate}}</p>


            %{-- <div style="width: 16.67%;display: inline-block;">
                 <label>Date - {{billDate}}</label>
             </div>--}%

           %{-- <div style="width: 16.67%;display: inline-block;">
                <p>{{billDate}}</p>
            </div>--}%

        </div>

    </div>

    <hr>

    <div class="row">
        <div style="width: 33.34%;display: inline-block;">
            <label>Menu Name</label>
        </div>

        <div style="width: 8.33%;display: inline-block;">
            <label>Price</label>
        </div>

        <div style="width: 8.33%;display: inline-block;">
            <label>Quantity</label>
        </div>

        <div style="width: 8.33%;display: inline-block;">
            <label>Total</label>
        </div>
    </div>

    <div id="menuItems" class="row">

    </div>

    <div class="row">
        <span id="totalBillAmount"></span>
    </div>

</div>
</script>

</body>
</html>