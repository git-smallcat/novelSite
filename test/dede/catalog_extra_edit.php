<?php

require_once(dirname(__FILE__)."/config.php");
require_once(DEDEINC."/typeextra.class.php");

$typeid = isset($typeid) ? intval($typeid) : 0;

//检查权限许可
CheckPurview('t_Edit,t_AccEdit');

//检查栏目操作许可
CheckCatalog($typeid, '你无权更改本栏目！');

$isNew = isset($isnew)?$isnew:0;
$click = isset($click)? intval($click):0;
$pic = Html2Text($pic,'');
$author = Html2Text($author,'');

$typeExtra = new TypeExtra();
$typeExtra->typeid = $typeid;
$typeExtra->click = $click;
$typeExtra->pic = $pic;
$typeExtra->author = $author;

if($isNew==1){
	$rs = $typeExtra->addTypeExtra();
}else{
	$rs = $typeExtra->editTypeExtra();
}
if($rs){
	ShowMsg("成功更改一个分类！","catalog_main.php");
}else{
	ShowMsg("增加额外信息错误", "-1");
}
exit();
?>