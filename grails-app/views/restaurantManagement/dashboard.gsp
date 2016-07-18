<%--
  Created by IntelliJ IDEA.
  User: abhi
  Date: 12/7/16
  Time: 11:50 PM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title></title>
</head>

<body class="hold-transition skin-blue sidebar-mini fixed">
<div class="wrapper">
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Dashboard
    </h1>
</section>

<!-- Main content -->
<section class="content">
<!-- Small boxes (Stat box) -->
<div class="row">
    <div class="col-lg-3 col-xs-6">
        <!-- small box -->
        <div class="small-box bg-aqua">
            <div class="inner">
                <h3 id="totalOrders"></h3>

                <p>Total Orders</p>
            </div>
            <div class="icon">
                <i class="fa fa-cart-plus" aria-hidden="true"></i>
            </div>
        </div>
    </div>
    <!-- ./col -->
    <div class="col-lg-3 col-xs-6">
        <!-- small box -->
        <div class="small-box bg-green">
            <div class="inner">
                <h3 id="totalEarning"></h3>

                <p>Total Earning</p>
            </div>
            <div class="icon">
                <i class="fa fa-inr" aria-hidden="true"></i>
            </div>
        </div>
    </div>
    <!-- ./col -->
    <div class="col-lg-3 col-xs-6">
        <!-- small box -->
        <div class="small-box bg-yellow">
            <div class="inner">
                <h3 id="groceryAddition"></h3>

                <p>Total Grocery Provided(Kg. + Ltr.)</p>
            </div>
            <div class="icon">
                <i class="glyphicon glyphicon-briefcase" aria-hidden="true"></i>
            </div>

        </div>
    </div>
    <!-- ./col -->
    <div class="col-lg-3 col-xs-6">
        <!-- small box -->
        <div class="small-box bg-red">
            <div class="inner">
                <h3 id="groceryConsumption"></h3>

                <p>Total Grocery consumed(Kg. + Ltr.)</p>
            </div>
            <div class="icon">
                <i class="fa fa-hand-scissors-o" aria-hidden="true"></i>
            </div>
        </div>
    </div>
    <!-- ./col -->
</div>
<!-- /.row -->
<!-- Main row -->
<div class="row rowMargin">
<!-- Left col -->
<section class="connectedSortable">
<div class="nav-tabs-custom">
    <ul class="nav nav-tabs pull-right">
        <li class="active"><a href="#revenue-chart" data-toggle="tab">Daily</a></li>
        <li><a href="#sales-chart" data-toggle="tab">Overall</a></li>
        <li class="pull-left header"><i class="fa fa-inbox"></i> Branch wise Summary</li>
    </ul>
    <div class="tab-content no-padding">
        <div class="chart tab-pane active" id="revenue-chart" style="position: relative;">
            <div id="branchWiseSummary" class="container">
            </div>
        </div>
        <div class="chart tab-pane" id="sales-chart" style="position: relative;">
            <div id="overAllBranchWiseSummary" class="container">
            </div>
        </div>
    </div>
</div>
<!-- /.nav-tabs-custom -->

</section>

</div>
<!-- /.row (main row) -->

</section>
<!-- /.content -->
</div>
<!-- /.content-wrapper -->
</div>
<script>
    $(document).ready(function () {
        customRestaurantJs.eventHandlers.dashboardView();
    });
</script>

<script id="branchSummary-template" type="text/x-handlebars-template">
<div class="row">
    <table class="table">
        <thead>
        <tr>
            <th>Branch Name</th>
            <th>Total Orders</th>
            <th>Total Earning</th>
            <th>Provided Grocery</th>
            <th>Consumed Grocery</th>
        </tr>
        </thead>
        <tbody>
        {{#each branchSummary}}

        <tr>
            <td>{{branchName}}</td>
            <td>{{todayBranchTotalOrders}}</td>
            <td>Rs. {{todayBranchTotalEarning}}</td>
            <td>{{branchAddedGroceryQuantity}}</td>
            <td>{{branchDeductedGroceryQuantity}}</td>
        </tr>
        {{/each}}

        </tbody>
    </table>
</div>

</script>

<script id="overAllBranchSummary-template" type="text/x-handlebars-template">
<div class="row">
    <table class="table">
        <thead>
        <tr>
            <th>Branch Name</th>
            <th>Total Orders</th>
            <th>Total Earning</th>
            <th>Provided Grocery</th>
            <th>Consumed Grocery</th>
        </tr>
        </thead>
        <tbody>
        {{#each overAllBranchSummary}}

        <tr>
            <td>{{branchName}}</td>
            <td>{{overAllBranchTotalOrders}}</td>
            <td>{{overAllBranchTotalEarning}}</td>
            <td>{{overAllBranchAddedGroceryQuantity}}</td>
            <td>{{overAllBranchDeductedGroceryQuantity}}</td>
        </tr>
        {{/each}}
        </tbody>
    </table>
    </div>
</div>
</script>
</body>
</html>