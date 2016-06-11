<%--
  Created by IntelliJ IDEA.
  User: abhi
  Date: 31/5/16
  Time: 11:36 PM
--%>

<%@ page expressionCodec="none" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Roll | Point</title>
    <!-- Tell the browser to be responsive to screen width -->
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/bootstrap/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/fontAwsome/font-awesome.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/ionicons.min.css">
    %{--fuelUX--}%
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/fuelux.min.css">
    <!-- DataTables -->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/plugins/datatables/dataTables.bootstrap.css">
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/dataTable/select.dataTables.min.css">

    %{--material design--}%
    %{--<link rel="stylesheet" href="<%=request.getContextPath()%>/css/materialDesign/materialize.css">--}%
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/pnotify.custom.min.css">


    <!-- Theme style -->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/AdminLTE.css">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/skins/_all-skins.min.css">
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/custom/eyeStyleSheet.css">   %{-- custom css --}%
%{-- alert dialog plugin css --}%
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/plugins/alertDialog/bootstrap-dialog.min.css">
    %{--progress bar--}%
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/progressBar/centerCircle.css">



    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="<%=request.getContextPath()%>/js/html5shiv.min.js"></script>
        <script src="<%=request.getContextPath()%>/js/respond.min.js"></script>

        <!-- jQuery 2.1.4 -->
    <script src="<%=request.getContextPath()%>/css/plugins/jQuery/jQuery-2.1.4.min.js"></script>
    %{--custom validation--}%
    <script src="<%=request.getContextPath()%>/js/validate/jquery.validate.js"></script>
    <script src="<%=request.getContextPath()%>/js/validate/jquery.form.js"></script>
    <script src="<%=request.getContextPath()%>/js/validate/customValidationRules.js"></script>


    <!-- Bootstrap 3.3.5 -->
    <script src="<%=request.getContextPath()%>/js/bootstrap/bootstrap.min.js"></script>
    <script src="<%=request.getContextPath()%>/js/fuelux.min.js"></script>

    <!-- DataTables -->
    <script src="<%=request.getContextPath()%>/css/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="<%=request.getContextPath()%>/js/dataTable/dataTables.select.min.js"></script>

    <script src="<%=request.getContextPath()%>/css/plugins/datatables/dataTables.bootstrap.min.js"></script>


    <!-- SlimScroll -->
    <script src="<%=request.getContextPath()%>/css/plugins/slimScroll/jquery.slimscroll.min.js"></script>
    <!-- FastClick -->
    <script src="<%=request.getContextPath()%>/css/plugins/fastclick/fastclick.min.js"></script>

    <script src="<%=request.getContextPath()%>/js/jsonValidator/jquery.validate-json.js"></script>
    %{--<script src="<%=request.getContextPath()%>/js/materialDesign/materialize.js"></script>--}%
    %{--<script src="<%=request.getContextPath()%>/js/jquery.scoped.js"></script>--}%
    <script src="<%=request.getContextPath()%>/js/pnotify.custom.min.js"></script>

    %{--alert dialog plugin--}%
    <script src="<%=request.getContextPath()%>/js/alertDialog/bootstrap-dialog.min.js"></script>
    <script>
        window.paceOptions = {
            ajax: {
                trackMethods: ['GET', 'POST', 'PUT', 'DELETE', 'REMOVE']
            }
        };
    </script>
    <script src="<%=request.getContextPath()%>/js/progressBar/pace.min.js"></script>

    <script src="<%=request.getContextPath()%>/js/custom/customJs.js"></script>

    <!-- AdminLTE App -->
    <script src="<%=request.getContextPath()%>/js/app.min.js"></script>
    <!-- AdminLTE for demo purposes -->
    <script src="<%=request.getContextPath()%>/js/demo.js"></script>
    <!-- page script -->
    %{--<![endif]-->--}%
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">

    <header class="main-header">
        <!-- Logo -->
        <a href="../../index2.html" class="logo">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini"><b>R</b>P</span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><b>Roll</b>Point</span>
        </a>
        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top">
            <!-- Sidebar toggle button-->
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </a>

            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <!-- User Account: style can be found in dropdown.less -->
                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <img src="<%=request.getContextPath()%>/images/user2-160x160.jpg" class="user-image" alt="User Image">
                            <span class="hidden-xs"><restaurant:renderUserFullName/></span>
                        </a>
                        <ul class="dropdown-menu">
                            <!-- User image -->
                            <li class="user-header">
                                <img src="<%=request.getContextPath()%>/images/user2-160x160.jpg" class="img-circle" alt="User Image">

                                <p>
                                    <restaurant:renderUserFullName/> - <restaurant:renderUserRole/>
                                    <small>Member since Nov. 2012</small>
                                </p>
                            </li>
                            <!-- Menu Footer-->
                            <li class="user-footer">
                                <div class="pull-left">
                                    <a href="#" class="btn btn-default btn-flat">Profile</a>
                                </div>
                                <div class="pull-right">
                                    <a href="../logout" class="btn btn-default btn-flat">Sign out</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <!-- Control Sidebar Toggle Button -->
                    <li>
                        %{--<a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>--}%
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <!-- Sidebar user panel -->
            <div class="user-panel">
                <div class="pull-left image">
                    <img src="<%=request.getContextPath()%>/images/user2-160x160.jpg" class="img-circle" alt="User Image">
                </div>
                <div class="pull-left info">
                    <p><restaurant:renderUserFullName/></p>
                    <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
                </div>
            </div>

            <!-- sidebar menu: : style can be found in sidebar.less -->
            <ul class="sidebar-menu">
                <li class="header">MAIN NAVIGATION</li>
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-dashboard"></i> <span>Dashboard</span> <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li><a href="../../index.html"><i class="fa fa-circle-o"></i> Dashboard v1</a></li>
                        <li><a href="../../index2.html"><i class="fa fa-circle-o"></i> Dashboard v2</a></li>
                    </ul>
                </li>

                <li id="branchManagementView" class="treeview">
                    <a href="<%=request.getContextPath()%>/restaurantManagement/branchManagement">
                        <i class="fa fa-sitemap"></i> <span>Branch Management</span>
                    </a>
                </li>


                <li id="userManagementView" class="treeview">
                    <a href="<%=request.getContextPath()%>/restaurantManagement/userManagement">
                        <i class="fa fa-users"></i> <span>User Management</span>
                    </a>
                </li>


            </ul>
        </section>
        <!-- /.sidebar -->
    </aside>

    <g:layoutBody/>
    <footer class="main-footer">
        <div class="pull-right hidden-xs">
            <b>Version</b> 1.0.0
        </div>
        <strong>Copyright &copy; 2016-2017 <a href="#">DevsAtWork</a>.</strong> All rights
    reserved.
    </footer>


    <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
    <div class="control-sidebar-bg"></div>
</div>


<!-- ./wrapper -->
<!-- page script -->
</body>
</html>
