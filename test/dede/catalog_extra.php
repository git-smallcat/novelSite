<?php

require_once(dirname(__FILE__)."/config.php");
require_once(DEDEINC."/typeextra.class.php");

$id = empty($id)?0:intval($id);

//检查权限许可
CheckPurview('t_Edit,t_AccEdit');

//检查栏目操作许可
CheckCatalog($id, '你无权更改本栏目！');

$typeExtra = new TypeExtra();
$typeExtra->typeid=$id;
if(!$typeExtra->getTypeExtra()){
	$typeExtra->author="";
	$typeExtra->click="";
	$typeExtra->pic="";
	$data['isnew']=1;
}
$data['extra']=$typeExtra;

include DedeInclude('templets/catalog_extra.tmp.php');
?>