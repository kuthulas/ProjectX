<?php /* Smarty version 2.6.26, created on 2013-04-03 10:15:15
         compiled from D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/_users.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'date_format', 'D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/_users.tpl', 9, false),array('modifier', 'link_usernames_to_twitter', 'D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/_users.tpl', 12, false),array('modifier', 'number_format', 'D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/_users.tpl', 30, false),)), $this); ?>

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


<?php $_from = $this->_tpl_vars['i']->related_data; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }$this->_foreach['bar'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['bar']['total'] > 0):
    foreach ($_from as $this->_tpl_vars['uid'] => $this->_tpl_vars['u']):
        $this->_foreach['bar']['iteration']++;
?>

        <?php if (! $this->_tpl_vars['expand'] && $this->_foreach['bar']['total'] > 1 && ($this->_foreach['bar']['iteration'] <= 1)): ?>
        <div class="pull-right detail-btn"><button class="btn btn-info btn-mini" data-toggle="collapse" data-target="#flashback-<?php echo $this->_tpl_vars['i']->id; ?>
"><i class="icon-chevron-down icon-white"></i></button></div>
    <?php endif; ?>

        <?php if (! $this->_tpl_vars['expand'] && ($this->_foreach['bar']['iteration']-1) == 1): ?>
        <div class="collapse in" id="flashback-<?php echo $this->_tpl_vars['i']->id; ?>
">
    <?php endif; ?>

<table class="table table-condensed">
    <tr>
    <td class="avatar-data">
        <?php if ($this->_tpl_vars['u']->network == 'twitter'): ?>
            <h3><a href="https://twitter.com/intent/user?user_id=<?php echo $this->_tpl_vars['u']->user_id; ?>
" title="<?php echo $this->_tpl_vars['u']->username; ?>
 has <?php echo ((is_array($_tmp=$this->_tpl_vars['u']->follower_count)) ? $this->_run_mod_handler('number_format', true, $_tmp) : number_format($_tmp)); ?>
 followers and <?php echo ((is_array($_tmp=$this->_tpl_vars['u']->friend_count)) ? $this->_run_mod_handler('number_format', true, $_tmp) : number_format($_tmp)); ?>
 friends"><img src="<?php echo $this->_tpl_vars['u']->avatar; ?>
" class="avatar2"  width="48" height="48"/></a></h3>
        <?php else: ?>
            <h3><img src="<?php echo $this->_tpl_vars['u']->avatar; ?>
" class="avatar2" width="48" height="48"/></h3>
        <?php endif; ?>
    </td>

    <td>
        <?php if ($this->_tpl_vars['u']->network == 'twitter'): ?>
            <h3><img src="<?php echo $this->_tpl_vars['site_root_path']; ?>
plugins/<?php echo $this->_tpl_vars['u']->network; ?>
/assets/img/favicon.png" class="service-icon2"/> <a href="https://twitter.com/intent/user?user_id=<?php echo $this->_tpl_vars['u']->user_id; ?>
"><?php echo $this->_tpl_vars['u']->full_name; ?>
</a>     <small><?php echo ((is_array($_tmp=$this->_tpl_vars['u']->follower_count)) ? $this->_run_mod_handler('number_format', true, $_tmp) : number_format($_tmp)); ?>
 followers</small></h3>
            <p><?php echo ((is_array($_tmp=$this->_tpl_vars['u']->description)) ? $this->_run_mod_handler('link_usernames_to_twitter', true, $_tmp) : smarty_modifier_link_usernames_to_twitter($_tmp)); ?>
<br />
            <?php echo $this->_tpl_vars['u']->url; ?>
</p>
        <?php else: ?>
            <h3><img src="<?php echo $this->_tpl_vars['site_root_path']; ?>
plugins/<?php echo $this->_tpl_vars['u']->network; ?>
/assets/img/favicon.png" class="service-icon2"/> <?php echo $this->_tpl_vars['u']->full_name; ?>
    <?php if ($this->_tpl_vars['u']->other['total_likes']): ?><small style="color:gray"><?php echo ((is_array($_tmp=$this->_tpl_vars['u']->other['total_likes'])) ? $this->_run_mod_handler('number_format', true, $_tmp) : number_format($_tmp)); ?>
 likes</small><?php endif; ?></h3>
        <?php endif; ?>
    </td>
    </tr>
</table>

        <?php if (! $this->_tpl_vars['expand'] && $this->_foreach['bar']['total'] > 1 && ($this->_foreach['bar']['iteration'] == $this->_foreach['bar']['total'])): ?>
        </div>
    <?php endif; ?>

<?php endforeach; endif; unset($_from); ?>