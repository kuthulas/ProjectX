<?php /* Smarty version 2.6.26, created on 2013-04-03 04:16:51
         compiled from _header.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'ucwords', '_header.tpl', 177, false),array('modifier', 'strip_tags', '_header.tpl', 178, false),)), $this); ?>
<!DOCTYPE html>
<html lang="en" itemscope itemtype="http://schema.org/Article">
<head>
    <meta charset="utf-8">
    <title><?php if ($this->_tpl_vars['controller_title']): ?><?php echo $this->_tpl_vars['controller_title']; ?>
 | <?php endif; ?><?php echo $this->_tpl_vars['app_title']; ?>
</title>
    <link rel="shortcut icon" type="image/x-icon" href="<?php echo $this->_tpl_vars['site_root_path']; ?>
assets/img/favicon.png">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="<?php echo $this->_tpl_vars['site_root_path']; ?>
assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="<?php echo $this->_tpl_vars['site_root_path']; ?>
assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="<?php echo $this->_tpl_vars['site_root_path']; ?>
assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="<?php echo $this->_tpl_vars['site_root_path']; ?>
assets/ico/apple-touch-icon-57-precomposed.png">

<?php if ($this->_tpl_vars['enable_bootstrap']): ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- styles -->
    <link href="<?php echo $this->_tpl_vars['site_root_path']; ?>
assets/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo $this->_tpl_vars['site_root_path']; ?>
assets/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link href="<?php echo $this->_tpl_vars['site_root_path']; ?>
assets/css/font-awesome.min.css" rel="stylesheet">
    <link href="<?php echo $this->_tpl_vars['site_root_path']; ?>
assets/css/insights.css" rel="stylesheet">
    <?php $_from = $this->_tpl_vars['header_css']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['css']):
?>
    <link type="text/css" rel="stylesheet" href="<?php echo $this->_tpl_vars['site_root_path']; ?>
<?php echo $this->_tpl_vars['css']; ?>
" />
    <?php endforeach; endif; unset($_from); ?> 

    <!-- IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <script src="<?php echo $this->_tpl_vars['site_root_path']; ?>
assets/js/jquery.js"></script>
    <script src="<?php echo $this->_tpl_vars['site_root_path']; ?>
assets/js/bootstrap.js"></script>
    <script type="text/javascript">var site_root_path = '<?php echo $this->_tpl_vars['site_root_path']; ?>
';</script>

    <?php $_from = $this->_tpl_vars['header_scripts']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['script']):
?>
    <script type="text/javascript" src="<?php echo $this->_tpl_vars['site_root_path']; ?>
<?php echo $this->_tpl_vars['script']; ?>
"></script>
    <?php endforeach; endif; unset($_from); ?>

    <?php if ($this->_tpl_vars['register_form']): ?>
    <script src="<?php echo $this->_tpl_vars['site_root_path']; ?>
assets/js/jqBootstrapValidation.js"></script>
    <script type="text/javascript" src="<?php echo $this->_tpl_vars['site_root_path']; ?>
assets/js/jstz-1.0.4.min.js"></script>
    <script>
        <?php echo '
        $(function () { $("input").not("[type=submit]").jqBootstrapValidation(); } );
        '; ?>

    </script>

    <?php endif; ?>

    <?php echo '
      <script type="text/javascript">

        $(document).ready(function() {

            $(".collapse").collapse();
            $(function () {
                $(\'#settingsTabs a:first\').tab(\'show\');
            })


    '; ?>

        <?php if ($this->_tpl_vars['logged_in_user']): ?>
    <?php echo '

        $(\'#search-keywords\').focus(function() {
            $(\'#search-refine\').dropdown();
            if ($(\'#search-keywords\').val()) {
                $(\'#search-refine a span.searchterm\').text($(\'#search-keywords\').val());
            }
        }).blur(function() {
            $(\'#search-refine\').dropdown();
        });

        $(\'#search-keywords\').keyup(function() {
            $(\'#search-refine a span.searchterm\').text($(\'#search-keywords\').val());
        });

    '; ?>

        <?php endif; ?>
    <?php echo '

        });
      </script>
    '; ?>

    <?php if ($this->_tpl_vars['logged_in_user']): ?>
    <?php echo '

    <script type="text/javascript">
      function searchMe(_baseu) {
        var _mu = $("input#search-keywords").val();
        if (_mu != "null") {
          document.location.href = _baseu + _mu;
        }
      }
    </script>
    '; ?>

    <?php endif; ?>
        
<?php else: ?> <!-- not bootstrap -->
  
    <link type="text/css" rel="stylesheet" href="<?php echo $this->_tpl_vars['site_root_path']; ?>
assets/css/base.css">
    <link type="text/css" rel="stylesheet" href="<?php echo $this->_tpl_vars['site_root_path']; ?>
assets/css/style.css">
    <?php $_from = $this->_tpl_vars['header_css']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['css']):
?>
    <link type="text/css" rel="stylesheet" href="<?php echo $this->_tpl_vars['site_root_path']; ?>
<?php echo $this->_tpl_vars['css']; ?>
" />
    <?php endforeach; endif; unset($_from); ?>
    <!-- jquery -->
    <link type="text/css" rel="stylesheet" href="<?php echo $this->_tpl_vars['site_root_path']; ?>
assets/css/jquery-ui-1.8.13.css">

    <script type="text/javascript" src="<?php echo $this->_tpl_vars['site_root_path']; ?>
assets/js/jquery.min-1.4.js"></script>
    <script type="text/javascript" src="<?php echo $this->_tpl_vars['site_root_path']; ?>
assets/js/jquery-ui.min-1.8.js"></script>
  
    <?php echo '
      <script type="text/javascript">
      $(document).ready(function() {
          $(".post").hover(
            function() { $(this).children(".small").children(".metaroll").show(); },
            function() { $(this).children(".small").children(".metaroll").hide(); }
          );
          $(".metaroll").hide();
        });
      </script>
    '; ?>


    <!-- custom css -->
    <?php echo '
    <style>
        .line { background:url(\''; ?>
<?php echo $this->_tpl_vars['site_root_path']; ?>
<?php echo 'assets/img/border-line-470.gif\') no-repeat center bottom;
            margin: 8px auto;
            height: 1px;
        }
        
    </style>
    '; ?>

  <?php $_from = $this->_tpl_vars['header_scripts']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['script']):
?>
    <script type="text/javascript" src="<?php echo $this->_tpl_vars['site_root_path']; ?>
<?php echo $this->_tpl_vars['script']; ?>
"></script>
  <?php endforeach; endif; unset($_from); ?>

<?php endif; ?>

<?php if ($this->_tpl_vars['enable_tabs']): ?>
<script type="text/javascript">
    <?php echo '
      $(function() {
        // Hide all sections
        $(\'.section\').hide();
        // Add event handlers to tab links
        $(\'#tabs a\').click(function(e) {
            $this = $(this);
            $(\'#tabs li.active\').removeClass(\'active\');
            $this.parent().addClass(\'active\');
            // Prevent the default link behavior
            e.preventDefault();
            // Hide all the sections
            $(\'.section\').hide();
            // Show the appropiate section
            $($this.attr(\'href\')).show();
        });
        // Simulate clicking the first tab
        $(\'#tabs li:first-child a\').click();
        // Load the tab if URL has a hash
        if (window.location.hash) {
            $(\'#tabs a[href="\'+window.location.hash+\'"]\').click();
        }
      });
    '; ?>

</script>
<?php endif; ?>

  <!-- google chart tools -->
  <!--Load the AJAX API-->
  <script type="text/javascript" src="https://www.google.com/jsapi"></script>
  <script type="text/javascript" src="<?php echo $this->_tpl_vars['site_root_path']; ?>
plugins/twitter/assets/js/widgets.js"></script>
  <script type="text/javascript">var site_root_path = '<?php echo $this->_tpl_vars['site_root_path']; ?>
';</script>
  <?php if ($this->_tpl_vars['csrf_token']): ?><script type="text/javascript">var csrf_token = '<?php echo $this->_tpl_vars['csrf_token']; ?>
';</script><?php endif; ?>

<?php if ($this->_tpl_vars['post']->post_text): ?> 
    <meta itemprop="name" content="<?php echo ((is_array($_tmp=$this->_tpl_vars['post']->network)) ? $this->_run_mod_handler('ucwords', true, $_tmp) : ucwords($_tmp)); ?>
 post by <?php echo $this->_tpl_vars['post']->author_username; ?>
 on ThinkUp">
    <meta itemprop="description" content="<?php echo ((is_array($_tmp=$this->_tpl_vars['post']->post_text)) ? $this->_run_mod_handler('strip_tags', true, $_tmp) : smarty_modifier_strip_tags($_tmp)); ?>
">
    <meta itemprop="image" content="http://thinkup.com/assets/img/thinkup-logo_sq.png">
<?php endif; ?>

</head>
<body>

<?php if ($this->_tpl_vars['enable_bootstrap']): ?>
<div id="sticky-footer-fix-wrapper">
<?php endif; ?>