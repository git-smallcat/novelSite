<?php if(!defined('DEDEINC')) exit("Request Error!");


class TypeExtra{
	var $typeid;
	var $click;
	var $pic;
	var $author;
	
	private $dsql;
	
	var $curSql;
	
	function __construct(){
		$this->dsql = $GLOBALS['dsql'];
	}
	
	function addTypeExtra(){
		$isql = "INSERT INTO #@__type_extra(typeid,click,pic,author) VALUES ('$this->typeid','$this->click','$this->pic','$this->author')";
		$this->curSql = $isql;
		return $this->dsql->ExecuteNoneQuery($isql);
	}
	
	function editTypeExtra(){
		$usql = "UPDATE #@__type_extra SET click='$this->click', pic='$this->pic',author='$this->author' WHERE typeid = '$this->typeid'";
		$this->curSql = $usql;
		return $this->dsql->ExecuteNoneQuery($usql);
	}	
	
	function getTypeExtra($typeid){
		if(isset($typeid)){
			$this->typeid = $typeid;
		}		
		$query = "SELECT typeid,click,pic,author FROM #@__type_extra WHERE typeid='$this->typeid'";
		$this->curSql = $query;
		$this->dsql->SetQuery($query);
		$this->dsql->Execute();
		$row=$this->dsql->GetObject();
		if($row){
			$this->click = $row->click;
			$this->pic = $row->pic;
			$this->author = $row->author;
			return true;
		}else{
			return false;
		}
	}
	
	
}
?>