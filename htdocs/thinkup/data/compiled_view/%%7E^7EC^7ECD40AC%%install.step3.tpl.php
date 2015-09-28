<?php /* Smarty version 2.6.26, created on 2013-04-03 04:19:04
         compiled from install.step3.tpl */ ?>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "_header.tpl", 'smarty_include_vars' => array('enable_bootstrap' => 1)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "_statusbar.tpl", 'smarty_include_vars' => array('enable_bootstrap' => 1)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>

<div id="main" class="container">

    <div class="navbar">
        <div class="navbar-inner">
        <span class="brand" style="margin-top: 12px;">Install ThinkUp:</span>
        <ul class="nav pull-left">
            <li><a> <h4><i class="icon-ok-circle "></i> Check System Requirements</h4></a></li>
            <li><a class="disabled"> <h4><i class="icon-ok-circle"></i> Configure ThinkUp</h4></a></li>
            <li class="active"><a class="disabled"> <h4><i class="icon-lightbulb"></i> Finish</h4></a></li>
        </ul>
        </div>
    </div>
    
    <div class="row">
        <div class="span3">
            <div class="embossed-block">
                <ul>
                    <li>Congratulations!</li>
                </ul>
            </div>            
        </div>
        <div class="span9">
            <div class="alert alert-success">
                <div><i class="icon-check"></i> ThinkUp has been installed successfully. Check your email account; an account activation message has been sent.</div>
                
                <a href="<?php echo $this->_tpl_vars['site_root_path']; ?>
session/login.php" class="btn btn-success btn-large" style="margin-top: 16px; clear: left;" ><i class="icon-signin icon-white"></i> Log In</a>
            </div>

        </div>
    </div>
    
    <div class="row">
        <div class="span3">
            <div>&nbsp;

            </div>            
        </div>
        <div class="span9">
            <div class="alert alert-info insight-item">


            <div class="insight-attachment-detail none">
        
                    <i class="icon-envelope icon-muted"></i>
                    <a href="http://thinkup.com/docs/troubleshoot/common/emaildisabled.html">Didn't get the email?</a>
            </div>

            </div>

        </div>
    </div>

        
</div>
  
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "_footer.tpl", 'smarty_include_vars' => array('enable_bootstrap' => 1)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>