<?php /* Smarty version 2.6.26, created on 2013-04-03 10:16:39
         compiled from D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/account.index.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('insert', 'help_link', 'D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/account.index.tpl', 3, false),)), $this); ?>
<div class="plugin-info">

    <span class="pull-right"><?php require_once(SMARTY_CORE_DIR . 'core.run_insert_handler.php');
echo smarty_core_run_insert_handler(array('args' => array('name' => 'help_link', 'id' => 'insightsgenerator')), $this); ?>
</span>
    <h1>
        <img src="<?php echo $this->_tpl_vars['site_root_path']; ?>
plugins/insightsgenerator/assets/img/plugin_icon.png" class="plugin-image">
        Insights Generator Plugin
    </h1>

    <p><?php echo $this->_tpl_vars['message']; ?>
</p>

</div>

    <div>
    <p>The following is a list of currently installed and running insight plugins:</p>
    <table class="table">
        <tr>
            <th><b>Name</b></th>
            <th><b>Description</b></th>
        </tr>
    <?php $_from = $this->_tpl_vars['installed_plugins']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }$this->_foreach['foo'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['foo']['total'] > 0):
    foreach ($_from as $this->_tpl_vars['pid'] => $this->_tpl_vars['plugin']):
        $this->_foreach['foo']['iteration']++;
?>
        <tr>
            <td><b><?php echo $this->_tpl_vars['plugin']['name']; ?>
</b></td>
            <td><?php echo $this->_tpl_vars['plugin']['description']; ?>
</td>
        </tr>
    <?php endforeach; endif; unset($_from); ?>
    </table>
    </div>

<div class="append_20">

<?php if ($this->_tpl_vars['options_markup']): ?>
    <?php if ($this->_tpl_vars['user_is_admin']): ?>
        <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "_plugin.showhider.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
        <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "_usermessage.tpl", 'smarty_include_vars' => array('field' => 'setup')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
        <?php echo $this->_tpl_vars['options_markup']; ?>

    <?php endif; ?>
<?php endif; ?>
</div>
