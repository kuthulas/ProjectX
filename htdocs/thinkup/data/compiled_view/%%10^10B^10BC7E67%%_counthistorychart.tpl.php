<?php /* Smarty version 2.6.26, created on 2013-04-03 10:15:15
         compiled from D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/_counthistorychart.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'number_format', 'D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/_counthistorychart.tpl', 52, false),array('modifier', 'lower', 'D:/Dropbox/ProjectX/htdocs/thinkup/plugins/insightsgenerator/view/_counthistorychart.tpl', 52, false),)), $this); ?>
<?php if (! $this->_tpl_vars['expand']): ?>
<div class="collapse in" id="chart-<?php echo $this->_tpl_vars['i']->id; ?>
">
<?php endif; ?>
<div id="count_history_<?php echo $this->_tpl_vars['i']->id; ?>
" class="chart"></div>

<script type="text/javascript">
// Load the Visualization API and the standard charts
google.load('visualization', '1.0');
// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart<?php echo $this->_tpl_vars['i']->id; ?>
);
<?php echo '

function drawChart'; ?>
<?php echo $this->_tpl_vars['i']->id; ?>
() <?php echo '{
  var formatter_date = new google.visualization.DateFormat({formatType: \'medium\'});
  var formatter = new google.visualization.NumberFormat({fractionDigits: 0});
  '; ?>

  var count_history_data_<?php echo $this->_tpl_vars['i']->id; ?>
 = new google.visualization.DataTable(
  <?php echo $this->_tpl_vars['i']->related_data['vis_data']; ?>
);
  formatter.format(count_history_data_<?php echo $this->_tpl_vars['i']->id; ?>
, 1);
  formatter_date.format(count_history_data_<?php echo $this->_tpl_vars['i']->id; ?>
, 0);
<?php echo '
  var count_history_chart_'; ?>
<?php echo $this->_tpl_vars['i']->id; ?>
<?php echo ' = new google.visualization.ChartWrapper({
  '; ?>

      containerId: 'count_history_<?php echo $this->_tpl_vars['i']->id; ?>
',
      <?php echo '
      chartType: \'LineChart\',
      dataTable: count_history_data_'; ?>
<?php echo $this->_tpl_vars['i']->id; ?>
<?php echo ',
      options: {
          height: 200,
          legend: "none",
          interpolateNulls: true,
          pointSize: 4,
          colors : [\'#31C22D\'],
          hAxis: {
              baselineColor: \'#eee\',
              format: \'MMM d\',
              textStyle: { color: \'#999\' },
              gridlines: { color: \'#eee\' }
          },
          vAxis: {
              baselineColor: \'#eee\',
              textStyle: { color: \'#999\' },
              gridlines: { color: \'#eee\' }
          },
      },
  });
  count_history_chart_'; ?>
<?php echo $this->_tpl_vars['i']->id; ?>
<?php echo '.draw();
  }
  '; ?>

</script>
<?php if ($this->_tpl_vars['i']->related_data['milestone']['units_of_time'] && $this->_tpl_vars['i']->related_data['trend'] && $this->_tpl_vars['i']->related_data['trend'] != 0): ?>
    Current growth rate: <?php if ($this->_tpl_vars['i']->related_data['trend'] > 0): ?><span style="color:green">+<?php else: ?><span style="color:red"><?php endif; ?><?php echo ((is_array($_tmp=$this->_tpl_vars['i']->related_data['trend'])) ? $this->_run_mod_handler('number_format', true, $_tmp) : number_format($_tmp)); ?>
</span>/<?php echo ((is_array($_tmp=$this->_tpl_vars['i']->related_data['milestone']['units_of_time'])) ? $this->_run_mod_handler('lower', true, $_tmp) : smarty_modifier_lower($_tmp)); ?>

<?php endif; ?>
<?php if (! $this->_tpl_vars['expand']): ?>
</div>
<?php endif; ?>