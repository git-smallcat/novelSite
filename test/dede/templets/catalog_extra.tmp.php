<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<?php 
	$extra = $data['extra'];
	$isNew = isset($data['isnew'])?$data['isnew']:0;
?>

<form action='catalog_extra_edit.php' method='post'>
	<table>
		<tr>
			<td>栏目ID:</td><td><input name='typeid' value="<?php echo $extra->typeid?>"/></td>
		</tr>
		<tr>
			<td>栏目点击量:</td><td><input name='click' value="<?php echo $extra->click?>".></td>
		</tr>
		<tr>
			<td>栏目图片:</td><td><input name='pic' value="<?php echo $extra->pic?>"/></td>
		</tr>
		<tr>
			<td>栏目作者:</td><td><input name='author' value="<?php echo $extra->author?>"/></td>
		</tr>
		<tr>
			<td colspan="2"><input type="submit" value="提交"/>&nbsp;&nbsp;&nbsp;<a href="catalog_main.php"><input name="back" value="返回" type="button" /></a></td>
		</tr>
	</table>
	<input name='isnew' value="<?php echo $isNew ?>" type="hidden"/>
</form>
</body>
</html>