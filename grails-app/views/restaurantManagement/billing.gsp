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
                <div class="col-xs-12 col-md-12 col-lg-12 col-sm-12">

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
    <div>
        <div style="width: 40%;display: inline-block;line-height: 2%;">
            <p><restaurant:renderUserRestaurant/></p>
        </div>

        <div style="width: 50%;display: inline-block;line-height: 2%;">
            <p>Branch- <restaurant:renderUserBranch/></p>
        </div>
    </div>

    <div>

        <div style="width: 65%;display: inline-block;line-height: 2%;">
            <p>Customer name- {{customerName}}</p>
        </div>

        <div style="width: 30%;display: inline-block;line-height: 2%;">
            <p>Date - {{billDate}}</p>
        </div>

    </div>

    <hr>

    <div>
        <div style="width: 5%;display: inline-block;line-height: 2%;">
        </div>

        <div style="width: 50%;display: inline-block;line-height: 2%;">
            <label>Menu name</label>
        </div>

        <div style="width: 10%;display: inline-block;line-height: 2%;">
            <label>Price</label>
        </div>

        <div style="width: 15%;display: inline-block;line-height: 2%;">
            <label>Quantity</label>
        </div>

        <div style="width: 15%;display: inline-block;line-height: 2%;">
            <label>Total</label>
        </div>
    </div>
    <hr>
    <div>
        {{#each menuDetails}}
        <div style="width: 5%;display: inline-block;line-height: 2%;">
        </div>

        <div style="width: 50%;display: inline-block;line-height: 2%;">
            <p>{{menuName}}</p>
        </div>

        <div style="width: 10%;display: inline-block;line-height: 2%;">
            <p>{{menuPrice}}</p>
        </div>

        <div style="width: 15%;display: inline-block;line-height: 2%;">
            <p>{{quantity}}</p>
        </div>

        <div style="width: 15%;display: inline-block;line-height: 2%;">
            <p>{{menuTotalPrice}}</p>
        </div>
        {{/each}}

    </div>
    <hr>

    <div style="width: 90%;display: inline-block;text-align: right;line-height: 5%">
        <p>Total bill amount -{{totalBillAmount}}</p>
    </div>

</script>

</body>
</html>