<?php /* Smarty version 2.6.26, created on 2013-04-03 04:16:56
         compiled from install.step2.tpl */ ?>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "_header.tpl", 'smarty_include_vars' => array('enable_bootstrap' => 1,'register_form' => 1)));
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
            <li class="active"><a class="disabled"> <h4><i class="icon-cogs"></i> Configure ThinkUp</h4></a></li>
            <li><a class="disabled"> <h4><i class="icon-lightbulb"></i> Finish</h4></a></li>
        </ul>
        </div>
    </div>
    
    <div class="row">
        <div class="span3">
            
        </div>
        <div class="span9">

            <form class="input form-horizontal" name="install_form" method="post" action="index.php?step=3">
            
            <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "_usermessage.tpl", 'smarty_include_vars' => array('enable_bootstrap' => 1)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>

            <fieldset>
                <legend>Create your ThinkUp account</legend>
                  
                <div class="control-group">
                    <label class="control-label" for="full_name">Name</label>
                    <div class="controls">
                        <input type="text" name="full_name" id="full_name" required <?php if (isset ( $this->_tpl_vars['full_name'] )): ?> value="<?php echo $this->_tpl_vars['full_name']; ?>
"<?php endif; ?> 
                        data-validation-required-message="<i class='icon-exclamation-sign'></i> Name can't be blank.">
                        <span class="help-inline"></span>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="site_email">Email&nbsp;Address</label>
                    <div class="controls">
                        <span class="input-prepend">
                            <span class="add-on"><i class="icon-envelope"></i></span>
                            <input type="email" name="site_email" id="site_email" required <?php if (isset ( $this->_tpl_vars['site_email'] )): ?> value="<?php echo $this->_tpl_vars['site_email']; ?>
"<?php endif; ?> 
                            data-validation-required-message="<i class='icon-exclamation-sign'></i> A valid email address is required.">
                        </span>
                        <span class="help-inline"></span>
                        <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "_usermessage.tpl", 'smarty_include_vars' => array('field' => 'email','enable_bootstrap' => 1)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="password">Password</label>
                    <div class="controls">
                        <span class="input-prepend">
                            <span class="add-on"><i class="icon-key"></i></span>
                            <input type="password" name="password" id="password"<?php if (isset ( $this->_tpl_vars['password'] )): ?> value="<?php echo $this->_tpl_vars['password']; ?>
"<?php endif; ?>
                            <?php echo 'pattern="^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$"'; ?>
 class="password" required 
                            data-validation-required-message="<i class='icon-exclamation-sign'></i> You'll need a enter a password of at least 8 characters." 
                            data-validation-pattern-message="<i class='icon-exclamation-sign'></i> Must be at least 8 characters, with both numbers & letters.">
                        </span>
                        <span class="help-inline"></span>

                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="confirm_password">Confirm&nbsp;Password</label>
                    <div class="controls">
                        <span class="input-prepend">
                            <span class="add-on"><i class="icon-key"></i></span>            
                            <input type="password" name="confirm_password" id="confirm_password" required 
                            <?php if (isset ( $this->_tpl_vars['confirm_password'] )): ?> value="<?php echo $this->_tpl_vars['confirm_password']; ?>
"<?php endif; ?> class="password" 
                            data-validation-required-message="<i class='icon-exclamation-sign'></i> Password confirmation is required." 
                            data-validation-match-match="password" 
                            data-validation-match-message="<i class='icon-exclamation-sign'></i> Make sure this matches the password you entered above." >
                        </span>
                        <span class="help-block"></span>
                        <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "_usermessage.tpl", 'smarty_include_vars' => array('field' => 'password','enable_bootstrap' => 1)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
                    </div>
                </div>
                <div class="control-group ">
                    <label class="control-label" for="timezone">Time&nbsp;Zone</label>
                    <div class="controls">
                          <select name="timezone" id="timezone">
                          <option value=""<?php if ($this->_tpl_vars['current_tz'] == ''): ?> selected<?php endif; ?>>Select a Time Zone:</option>
                            <?php $_from = $this->_tpl_vars['tz_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['group_name'] => $this->_tpl_vars['group']):
?>
                              <optgroup label='<?php echo $this->_tpl_vars['group_name']; ?>
'>
                                <?php $_from = $this->_tpl_vars['group']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['tz']):
?>
                                  <option id="tz-<?php echo $this->_tpl_vars['tz']['display']; ?>
" value='<?php echo $this->_tpl_vars['tz']['val']; ?>
'<?php if ($this->_tpl_vars['current_tz'] == $this->_tpl_vars['tz']['val']): ?> selected<?php endif; ?>><?php echo $this->_tpl_vars['tz']['display']; ?>
</option>
                                <?php endforeach; endif; unset($_from); ?>
                              </optgroup>
                            <?php endforeach; endif; unset($_from); ?>
                          </select>
                          
                          <script type="text/javascript">
                          <?php echo '
                          var tz_info = jstz.determine();
                          var regionname = tz_info.name().split(\'/\');
                          var tz_option_id = \'#tz-\' + regionname[1];
                          if( $(\'#timezone option[value="\' + tz_info.name() + \'"]\').length > 0) {
                              if( $(tz_option_id) ) {
                                  $(\'#timezone\').val( tz_info.name());
                              }
                          }
                          '; ?>

                          </script>
                          <span class="input_information"></span>
                        <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "_usermessage.tpl", 'smarty_include_vars' => array('field' => 'timezone','enable_bootstrap' => 1)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
                    </div>
                </div>
 
            </fieldset>


            <fieldset style="padding-bottom : 0px;">

                <legend>Connect ThinkUp to Your Database</legend>
 
                 <div class="control-group">
                    <label class="control-label"></label>
                    <div class="controls">
                        <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "_usermessage.tpl", 'smarty_include_vars' => array('field' => 'database','enable_bootstrap' => 1)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
                    </div>
                </div>
                  
                <div class="control-group">
                    <label class="control-label" for="db_host">Database Host</label>
                    <div class="controls">
                        <input type="text" name="db_host" id="db_host" placeholder="localhost"<?php if (isset ( $this->_tpl_vars['db_host'] )): ?> value="<?php echo $this->_tpl_vars['db_host']; ?>
"<?php endif; ?> required 
                        data-validation-required-message="<i class='icon-exclamation-sign'></i> A database host is required - if you don't know yours, try 'localhost'.">
                        <span class="help-inline">Usually <strong>localhost</strong> or specified by your hosting provider.</span>
                        <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "_usermessage.tpl", 'smarty_include_vars' => array('field' => 'database_host','enable_bootstrap' => 1)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="db_name">Database Name</label>
                    <div class="controls">
                        <input type="text" name="db_name" id=""<?php if (isset ( $this->_tpl_vars['db_name'] )): ?> value="<?php echo $this->_tpl_vars['db_name']; ?>
"<?php endif; ?> required 
                        data-validation-required-message="<i class='icon-exclamation-sign'></i> ThinkUp needs the name of the database where it will store its data.">
                        <span class="help-inline">If the database does not exist, ThinkUp will attempt to create it.</span>
                        <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "_usermessage.tpl", 'smarty_include_vars' => array('field' => 'database_name','enable_bootstrap' => 1)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="db_user">User Name</label>
                    <div class="controls">
                        <input type="text" name="db_user" id="db_user"<?php if (isset ( $this->_tpl_vars['db_user'] )): ?> value="<?php echo $this->_tpl_vars['db_user']; ?>
"<?php endif; ?> required 
                        data-validation-required-message="<i class='icon-exclamation-sign'></i> ThinkUp will need the MySQL user name for your database user.">
                        <span class="help-inline">Your MySQL username.</span>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="db_passwd">Password</label>
                    <div class="controls">
                        <input type="password" name="db_passwd" class="ignore" id="db_passwd"<?php if (isset ( $this->_tpl_vars['db_passwd'] )): ?> value="<?php echo $this->_tpl_vars['db_passwd']; ?>
"<?php endif; ?>>
                        <span class="help-inline">Your MySQL password.</span>
                    </div>
                </div>

                <div class="control-group">
                    <label class="control-label"></label>
                    <div class="controls">
                        <span class="help-inline">
                        These options are only necessary for some sites. If you're not sure what you should enter here,
                        leave the default settings or check with your hosting provider.</span>
                          
                        <a class="btn " data-toggle="collapse" data-target="#advanced-setup" style="margin-top: 12px;">Show Advanced Options <i class="icon-chevron-down icon-white"></i></a>
                
                    </div>
                </div>

                <div class="in collapse" id="advanced-setup" style="height: auto;">

                    <div class="control-group">
                        <label class="control-label" for="db_socket">Database Socket</label>
                        <div class="controls">
                            <input type="text" name="db_socket" id="db_socket"<?php if (isset ( $this->_tpl_vars['db_socket'] )): ?> value="<?php echo $this->_tpl_vars['db_socket']; ?>
"<?php endif; ?>>
                            <span class="help-inline">If you're not sure about this, leave it blank.</span>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label" for="db_port">Database Port</label>
                        <div class="controls">
                            <input type="text" name="db_port" id="db_port"<?php if (isset ( $this->_tpl_vars['db_port'] )): ?> value="<?php echo $this->_tpl_vars['db_port']; ?>
"<?php endif; ?>>
                            <span class="help-inline">If you're not sure about this, leave it blank.</span>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label" for="db_prefix">Table Prefix</label>
                        <div class="controls">
                            <input type="text" name="db_prefix" id="db_prefix"<?php if (isset ( $this->_tpl_vars['db_prefix'] )): ?> value="<?php echo $this->_tpl_vars['db_prefix']; ?>
"<?php endif; ?>>
                            <span class="help-inline">Optional prefix for your ThinkUp tables.</span>
                        </div>
                    </div>
                
                </div>

                <div class="form-actions">
                    <input type="submit" name="Submit" class="next_step linkbutton btn btn-primary" id="nextstep" value="Set It Up &raquo">
                </div>
                
            </fieldset>

            </form>

        </div>
    </div>

        
</div>
  

<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "_footer.tpl", 'smarty_include_vars' => array('enable_bootstrap' => 1)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>