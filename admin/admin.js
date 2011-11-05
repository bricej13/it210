function GetXmlHttpObject() {
	if (window.XMLHttpRequest)
		return new XMLHttpRequest();

	if (window.ActiveXObject)
		return new ActiveXObject("Microsoft.XMLHTTP");

	return null;
}

function loadLog(logfile)
{
	var jsonAjax = GetXmlHttpObject();
	if (jsonAjax == null) { alert('Your browser is uber lame.  It does not support AJAX.  Upgrade NOW.'); return; }

	jsonAjax.onreadystatechange = function() {
		if (jsonAjax.readyState==4) {
			if (jsonAjax.status==200) {
				//log_data = eval("(" + jsonAjax.responseText + ")");
				log_data = jsonAjax.responseText
				document.getElementById('dataright').innerHTML = log_data
				return true;
			}	
			else {
				alert("Server error returned to AJAX call: " + jsonAjax.status);
				return false;
			}
		}
	};

	document.getElementById('dataright').innerHTML = "<img src='/it210/images/ajax-loader.gif'>"
	var logfile = '/cgi-bin/reader.py?file=' + logfile;
	jsonAjax.open("GET", logfile, true);
	jsonAjax.send(null);
}



