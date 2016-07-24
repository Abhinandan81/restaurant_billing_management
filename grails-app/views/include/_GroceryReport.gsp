<form class="form-horizontal" id="billReportForm" method="POST">
    <div class="radio col-md-12 col-sm-12">
        <label><input type="radio" name="reportType" checked value="bill">Billing Report</label>
        <label><input type="radio" name="reportType" value="grocery">Grocery Report</label>
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
            <input type="submit" id="getGroceryReport" class="btn btn-default" value="Get Report">
        </div>
    </div>
</form>
