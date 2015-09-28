1077
a:4:{s:8:"template";a:14:{s:12:"insights.tpl";b:1;s:11:"_header.tpl";b:1;s:14:"_statusbar.tpl";b:1;s:16:"_usermessage.tpl";b:1;s:77:"D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/_header.tpl";b:1;s:79:"D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/_textonly.tpl";b:1;s:77:"D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/_footer.tpl";b:1;s:83:"D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/archivedposts.tpl";b:1;s:76:"D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/_users.tpl";b:1;s:90:"D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/interestingfollowers.tpl";b:1;s:88:"D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/_counthistorychart.tpl";b:1;s:84:"D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/listmembership.tpl";b:1;s:80:"D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/bigreshare.tpl";b:1;s:11:"_footer.tpl";b:1;}s:9:"timestamp";i:1364966158;s:7:"expires";i:1364966758;s:13:"cache_serials";a:0:{}}<!DOCTYPE html>
<html lang="en" itemscope itemtype="http://schema.org/Article">
<head>
    <meta charset="utf-8">
    <title>ThinkUp</title>
    <link rel="shortcut icon" type="image/x-icon" href="/thinkup/assets/img/favicon.png">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/thinkup/assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/thinkup/assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/thinkup/assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="/thinkup/assets/ico/apple-touch-icon-57-precomposed.png">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- styles -->
    <link href="/thinkup/assets/css/bootstrap.min.css" rel="stylesheet">
    <link href="/thinkup/assets/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link href="/thinkup/assets/css/font-awesome.min.css" rel="stylesheet">
    <link href="/thinkup/assets/css/insights.css" rel="stylesheet">
     

    <!-- IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <script src="/thinkup/assets/js/jquery.js"></script>
    <script src="/thinkup/assets/js/bootstrap.js"></script>
    <script type="text/javascript">var site_root_path = '/thinkup/';</script>

    
    
    
      <script type="text/javascript">

        $(document).ready(function() {

            $(".collapse").collapse();
            $(function () {
                $('#settingsTabs a:first').tab('show');
            })


    
            

        $('#search-keywords').focus(function() {
            $('#search-refine').dropdown();
            if ($('#search-keywords').val()) {
                $('#search-refine a span.searchterm').text($('#search-keywords').val());
            }
        }).blur(function() {
            $('#search-refine').dropdown();
        });

        $('#search-keywords').keyup(function() {
            $('#search-refine a span.searchterm').text($('#search-keywords').val());
        });

    
            

        });
      </script>
    
        

    <script type="text/javascript">
      function searchMe(_baseu) {
        var _mu = $("input#search-keywords").val();
        if (_mu != "null") {
          document.location.href = _baseu + _mu;
        }
      }
    </script>
    
            


  <!-- google chart tools -->
  <!--Load the AJAX API-->
  <script type="text/javascript" src="https://www.google.com/jsapi"></script>
  <script type="text/javascript" src="/thinkup/plugins/twitter/assets/js/widgets.js"></script>
  <script type="text/javascript">var site_root_path = '/thinkup/';</script>
  

</head>
<body>

<div id="sticky-footer-fix-wrapper">

    <div class="navbar navbar-static-top">
      <div class="navbar-inner">
        <div class="container">

          <a href="/thinkup/" class="brand span3"><span style="color : #00AEEF; font-weight : 800;">Think</span><span style="color : black; font-weight : 200;">Up</span></a>


            <a class="btn btn-navbar pull-right" data-toggle="collapse" data-target=".nav-collapse"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></a>

            
                <!--search posts-->
                <form class="navbar-search pull-left dropdown" method="get" action="javascript:searchMe('/thinkup/search.php?u=dexterslab&n=twitter&c=posts&q=');">

                    <input type="text" id="search-keywords" class="search-query span4 dropdown-toggle" data-toggle="dropdown" autocomplete="off" placeholder="Search" />

                    <ul id="search-refine" class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                            <li class="lead"><a onclick="searchMe('/thinkup/search.php?u=dexterslab&n=twitter&c=posts&q=');" href="#"><i class="icon-twitter icon-muted icon-2x"></i> Find <span class="searchterm"></span> in @dexterslab's tweets</a></li>
                                                    <li class="lead"><a onclick="searchMe('/thinkup/search.php?u=dexterslab&n=twitter&c=followers&q=');" href="#"><i class="icon-twitter icon-muted icon-2x"></i> Search @dexterslab's followers' bios for <span class="searchterm"></span></a></li>
                            <li class="lead"><a onclick="searchMe('/thinkup/search.php?u=dexterslab&n=twitter&c=followers&q=name:');" href="#"><i class="icon-twitter icon-muted icon-2x"></i> Search @dexterslab's followers for people named <span class="searchterm"></span></a></li>
                                                                </ul>

                </form>

            

            <div class="nav-collapse">

      
<ul class="nav pull-right" style="border-left : none;">

    <li><script src="/thinkup/install/checkversion.php"></script></li>    <li><a href="/thinkup/crawler/updatenow.php" id="refresh-data"><i class="icon-refresh"></i></a></li>

    <li class="dropdown">
        <a href="#" class="dropdown-toggle hidden-phone" data-toggle="dropdown">
          praveengarlapati@gmail.com <span class="label label-info">admin</span>          <b class="caret"></b>
        </a>
        <ul class="dropdown-menu">
          <li class=""><a href="/thinkup/account/?m=manage"><i class="icon-cog icon-muted"></i> Settings</a></li>
          <li><a href="/thinkup/session/logout.php"><i class="icon-signout icon-muted"></i> Log Out</a></li>
        </ul>
    </li>
</ul> 

                </div><!--/.nav-collapse -->


        </div>
      </div>
    </div>


    <div id="main" class="container">

    
                                            
        
    



<div class="row">
                <div class="span3">
      <div class="embossed-block">
        <ul>
          <li>
                            40 mins  ago                      </li>
        </ul>
      </div>
    </div><!--/span3-->

            
        
    <div class="span9">
                                <!-- including archivedposts.tpl -->
            <div class="alert alert-info emphasis-1 insight-item">

<div class="insight-attachment-detail none">
        <span class="label label-info"><i class="icon-white icon-download"></i> <a href="?u=dexterslab&n=twitter&d=2013-04-03&s=archived_posts">Archived:</a></span>
        <i class="icon-twitter icon-muted"></i>
        ThinkUp has captured over <strong>1,400 tweets</strong> by <a href="https://twitter.com/intent/user?screen_name=dexterslab">@dexterslab</a>.
</div>

    <div class="clearfix"></div>
</div> <!--/alert-->            </div><!--/span9-->
   </div><!--/row-->
<div class="row">
            
    <div class="span3"></div>
        
    <div class="span9">
                                <!-- including interestingfollowers.tpl -->
            <div class="alert alert-info emphasis-0 insight-item">
        <div class="insight-attachment-detail users">
                
<span class="label label-info"><i class="icon-white icon-user"></i> <a href="?u=dexterslab&n=twitter&d=2013-04-03&s=least_likely_followers">Standout:</a></span> 

<i class="icon-twitter icon-muted"></i>
An interesting user followed <a href="https://twitter.com/intent/user?screen_name=dexterslab">@dexterslab</a>.


        
        
<table class="table table-condensed">
    <tr>
    <td class="avatar-data">
                    <h3><a href="https://twitter.com/intent/user?user_id=21394651" title="thewickednoodle has 27,508 followers and 11,484 friends"><img src="http://a0.twimg.com/profile_images/1892328682/withanna-copy_normal.jpg" class="avatar2"  width="48" height="48"/></a></h3>
            </td>

    <td>
                    <h3><img src="/thinkup/plugins/twitter/assets/img/favicon.png" class="service-icon2"/> <a href="https://twitter.com/intent/user?user_id=21394651">the wicked noodle</a>     <small>27,508 followers</small></h3>
            <p>food lover and blogger, mom and wife, love yoga and long naps, good friends and margaritas<br />
            http://www.thewickednoodle.com</p>
            </td>
    </tr>
</table>

        
        </div>

    <div class="clearfix"></div>
</div> <!--/alert-->            </div><!--/span9-->
   </div><!--/row-->
<div class="row">
            
    <div class="span3"></div>
        
    <div class="span9">
                                <!-- including listmembership.tpl -->
            <div class="alert alert-info emphasis-0 insight-item">
<div class="pull-right detail-btn"><button class="btn btn-info btn-mini" data-toggle="collapse" data-target="#chart-9"><i class="icon-signal icon-white"></i></button></div>

<span class="label label-info"><i class="icon-white icon-list"></i> <a href="?u=dexterslab&n=twitter&d=2013-04-03&s=new_group_memberships">Made the list:</a></span> 

<i class="icon-twitter icon-muted"></i>
<a href="https://twitter.com/intent/user?screen_name=dexterslab">@dexterslab</a> is on 6 new lists: <a href="http://twitter.com/astroverdict/namers">namers</a>, <a href="http://twitter.com/yehtech/india">india</a>, <a href="http://twitter.com/sur3shg/cisco-buddies">cisco-buddies</a>, <a href="http://twitter.com/skate056/cisco-colleagues">cisco-colleagues</a>, <a href="http://twitter.com/phanirajkvs/bangalore">bangalore</a> and <a href="http://twitter.com/Anant/bangalore">bangalore</a>.

<div class="collapse in" id="chart-9">
<div id="count_history_9" class="chart"></div>

<script type="text/javascript">
// Load the Visualization API and the standard charts
google.load('visualization', '1.0');
// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart9);


function drawChart9() {
  var formatter_date = new google.visualization.DateFormat({formatType: 'medium'});
  var formatter = new google.visualization.NumberFormat({fractionDigits: 0});
  
  var count_history_data_9 = new google.visualization.DataTable(
  {"rows":[{"c":[{"v":new Date(2013,3,3),"f":"04\/03\/2013"},{"v":6}]}],"cols":[{"type":"date","label":"Date"},{"type":"number","label":"Lists"}]});
  formatter.format(count_history_data_9, 1);
  formatter_date.format(count_history_data_9, 0);

  var count_history_chart_9 = new google.visualization.ChartWrapper({
  
      containerId: 'count_history_9',
      
      chartType: 'LineChart',
      dataTable: count_history_data_9,
      options: {
          height: 200,
          legend: "none",
          interpolateNulls: true,
          pointSize: 4,
          colors : ['#31C22D'],
          hAxis: {
              baselineColor: '#eee',
              format: 'MMM d',
              textStyle: { color: '#999' },
              gridlines: { color: '#eee' }
          },
          vAxis: {
              baselineColor: '#eee',
              textStyle: { color: '#999' },
              gridlines: { color: '#eee' }
          },
      },
  });
  count_history_chart_9.draw();
  }
  
</script>
</div>

    <div class="clearfix"></div>
</div> <!--/alert-->            </div><!--/span9-->
   </div><!--/row-->
<div class="row">
                <div class="span3">
      <div class="embossed-block">
        <ul>
          <li>
                            2 days  ago
                      </li>
        </ul>
      </div>
    </div><!--/span3-->

            
        
    <div class="span9">
                                <!-- including bigreshare.tpl -->
            <div class="alert alert-info emphasis-2 insight-item">
        <div class="insight-attachment-detail users">
                
<span class="label label-success"><i class="icon-white icon-bullhorn"></i> <a href="?u=dexterslab&n=twitter&d=2013-04-01&s=big_reshare_3">Big reshare!</a></span> 

<i class="icon-twitter icon-muted"></i>
Someone with <strong>4x</strong> more followers than <a href="https://twitter.com/intent/user?screen_name=dexterslab">@dexterslab</a> retweeted <a href="/thinkup/post/?t=318761250064588800&n=twitter&v=fwds">this post</a>.


        
        
<table class="table table-condensed">
    <tr>
    <td class="avatar-data">
                    <h3><a href="https://twitter.com/intent/user?user_id=777534" title="teemus has 749 followers and 0 friends"><img src="http://a0.twimg.com/profile_images/3118047094/36a900708d1a75d09bf367b59d75c831_normal.jpeg" class="avatar2"  width="48" height="48"/></a></h3>
            </td>

    <td>
                    <h3><img src="/thinkup/plugins/twitter/assets/img/favicon.png" class="service-icon2"/> <a href="https://twitter.com/intent/user?user_id=777534">Sumeet Mulani</a>     <small>749 followers</small></h3>
            <p>"Tip for people who don't want to use online password systems but want passwords always handy. Use http://t.co/Hd055Dilkf with db on dropbox."<br />
            http://sumeet.info/</p>
            </td>
    </tr>
</table>

        
        </div>

    <div class="clearfix"></div>
</div> <!--/alert-->            </div><!--/span9-->
   </div><!--/row-->

<div class="row">
    <div class="span3">&nbsp;</div>
    <div class="span9">

        <ul class="pager">
                        </ul>

    </div>
</div>
    <script type="text/javascript" src="/thinkup/assets/js/linkify.js"></script>
  

    </div><!-- end container -->

    <div id="sticky-footer-fix-clear"></div>
</div><!-- #sticky-footer-fix-wrapper -->

      <footer>
        <div class="container footer">
          <p class="pull-right"><a href="#">Back to top <i class="icon-chevron-up icon-white"></i></a></p>
          <p><a href="http://thinkup.com">ThinkUp 2.0-beta.5</a> <span class="hidden-phone hidden-tablet">&#8226; 
          <a href="http://thinkup.com/docs/">Documentation</a>  &#8226; 
          <a href="https://groups.google.com/forum/?fromgroups#!forum/thinkupapp">Mailing List</a> &#8226;
          <a href="/thinkup/dashboard.php">Old-School Dashboard</a>
          </span>
          
          </p>  
          <p class="hidden-phone hidden-tablet">
          <a href="http://twitter.com/thinkup"><i class="icon-twitter icon-white"></i></a>
          <a href="http://facebook.com/thinkupapp"><i class="icon-facebook icon-white"></i></a>
          <a href="http://gplus.to/thinkup"><i class="icon-google-plus icon-white"></i></a>
          &copy; ThinkUp LLC 2012-2013. It is nice to be nice.
          </p>
        </div>
      </footer>

 <!-- end bootstrap loop -->

</body>

</html>