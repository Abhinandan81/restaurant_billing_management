<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Sp's Roll Point</title>
</head>

<body>

<div class="container">
    <div>

        <div style="width: 60%;display: inline-block;">

            <div style="width: 30%;display: inline-block;">
                <label>Customer Name -</label>
            </div>

            <div style="width: 30%;display: inline-block;">
                <span id="billCustomerName"></span>
            </div>

        </div>

        <div style="width: 33.34%;display: inline-block;">

            <div style="width: 16.67%;display: inline-block;">
                <label>Date -</label>
            </div>

            <div style="width: 16.67%;display: inline-block;">
                <span id="billPrintDate"></span>
            </div>

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
</body>
</html>

