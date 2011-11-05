<?
include 'connect.php';
if (isset($_POST['match']) && isset($_POST['winner'])){
	update_json_winner($_POST['match'], $_POST['winner'], 1);	
}
else
	echo "false";

function update_json_winner($match, $winner, $game) {
	$JSON = json_decode(file_get_contents('js/bracket.json'), true);

	$JSON['Games'][$game]['Matches'][$match]['winner'] = (int)$winner;
	$new_match = ((int)($match / 2))+4;
	$player = $match % 2;
	if ($player)
		$JSON['Games'][$game]['Matches'][$new_match]['p2'] = (int)$winner;
	else
		$JSON['Games'][$game]['Matches'][$new_match]['p1'] = (int)$winner;

	file_put_contents('js/bracket.json', json_encode($JSON));

	if (isset($JSON['Games'][$game]['Matches'][6]['winner'])){
		system("/var/www/cgi-bin/log.py $game", $retval);
	}
	echo "true";
}



?>
