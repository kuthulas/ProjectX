<?php /* Smarty version 2.6.26, created on 2013-04-03 10:15:14
         compiled from D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/_textonly.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'date_format', 'D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/_textonly.tpl', 10, false),array('modifier', 'link_usernames_to_twitter', 'D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/_textonly.tpl', 12, false),)), $this); ?>

<div class="insight-attachment-detail none">
        <span class="label label-<?php if ($this->_tpl_vars['i']->emphasis == '1'): ?>info<?php elseif ($this->_tpl_vars['i']->emphasis == '2'): ?>success<?php elseif ($this->_tpl_vars['i']->emphasis == '3'): ?>error<?php else: ?>info<?php endif; ?>"><i class="icon-white icon-<?php echo $this->_tpl_vars['icon']; ?>
"></i> <a href="?u=<?php echo $this->_tpl_vars['i']->instance->network_username; ?>
&n=<?php echo $this->_tpl_vars['i']->instance->network; ?>
&d=<?php echo ((is_array($_tmp=$this->_tpl_vars['i']->date)) ? $this->_run_mod_handler('date_format', true, $_tmp, '%Y-%m-%d') : smarty_modifier_date_format($_tmp, '%Y-%m-%d')); ?>
&s=<?php echo $this->_tpl_vars['i']->slug; ?>
"><?php echo $this->_tpl_vars['i']->prefix; ?>
</a></span>
        <i class="icon-<?php echo $this->_tpl_vars['i']->instance->network; ?>
<?php if ($this->_tpl_vars['i']->instance->network == 'google+'): ?> icon-google-plus<?php endif; ?> icon-muted"></i>
        <?php echo ((is_array($_tmp=$this->_tpl_vars['i']->text)) ? $this->_run_mod_handler('link_usernames_to_twitter', true, $_tmp) : smarty_modifier_link_usernames_to_twitter($_tmp)); ?>

</div>
