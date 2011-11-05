<?
$JSON = json_decode(file_get_contents('js/bracket.json'), true);

	if (!isset($JSON['Games'][$game]['Matches'][6])){
		system("/var/www/cgi-bin/log.py", $retval);
	}
	else
		echo "Bracket is not finished yet";
?>
