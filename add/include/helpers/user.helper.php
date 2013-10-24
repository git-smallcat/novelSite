<?php
$top_catelog = array();

/**
 * 获得一个栏目的顶级栏目的名称
 * @param $tid 栏目ID
 * 
 * @return 顶级栏目的名称
 */
if ( ! function_exists('GetTopName'))
{
    function GetTopName($tid)
    {
    	return GetTop($tid)['typename'];
    }
       
}

/**
 * 获得一个栏目的顶级栏目的链接
 * @param $tid 栏目ID
 *
 * @return 顶级栏目的链接
 */
if ( ! function_exists('GetTopLink'))
{
	function GetTopLink($tid)
	{
		return GetTop($tid)['typeurl'];
	}
}

/**
 * 获得一个栏目的顶级目录
 * @param $tid 栏目ID
 * @return array 顶级栏目信息
 */

function GetTop($tid)
{
	global $dsql;
	global $cfg_cmsurl;
	global $top_catelog;
	
	$tid = trim(preg_replace('/[^0-9]/', '', $tid));
	
	$tid =GetTopid($tid);
	
	if(!isset($top_catelog[$tid])){
		$reArr = array();
		$arcRow = $dsql->GetOne("SELECT * FROM #@__arctype WHERE id = '$tid' ");
		
		if(!is_array($arcRow)) {
			return $reArr;
		}
		// 	$reArrStr = '';
		$reArr = $arcRow;
		// 	foreach ( $reArr as $kye=>$value){
		// 		$reArrStr=$reArrStr.' '.$kye.'=>'.$value;
		// 	}
		$typeurl = $reArr['typedir'];
		$typeurl = preg_replace("#^{cmspath}#", $cfg_cmsurl, $typeurl);
		$reArr['typeurl'] = $typeurl;
		
		$top_catelog[$reArr[id]]=$reArr;
	}
	
	return $top_catelog[$tid];
}

?>