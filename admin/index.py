#!/usr/bin/env python
from __future__ import with_statement
try:
	import json
except ImportError:
	import simplejson as json
import cgi
import pprint
import sys
import time
import os



def showLogs():
	path = "/var/www/it210/admin/log"
	dirList = os.listdir(path)
	print "<table border='1'>"
	print "<tr><th>Connect 4 Logs</th></tr>"
	for fname in dirList:
		if fname.find("Con4") >= 0:
			print "<tr><td><a href='#' onclick='loadLog(\""+fname+"\")'>"+fname+"</a></td></tr>"

	print "</table><br>"
	print "<table border='1'>"
	print "<tr><th>Tic-Tac-Toe Logs</th></tr>"
	for fname in dirList:
		if fname.find("TTT") >= 0:
			print "<tr><td><a href='#' onclick='loadLog(\""+fname+"\")'>"+fname+"</a></td></tr>"
	print "</table>"

def resetLogs():
	form = cgi.FieldStorage()
	reset = form.getvalue('resetLogs')
	if reset == "1":
		dir = "/var/www/it210/admin/log/"
		files = os.listdir(dir)
		for f in files:
			os.remove(dir+f)

def resetBracket():
	form = cgi.FieldStorage()
	reset = form.getvalue('resetBracket')
	if reset == "1":
		game = int(form.getvalue('game'))
		try:
			my_json = json.load(open("/var/www/it210/js/bracket.json", 'r'))
		except IOError:
			print "<h4>Invalid file name</h4>"
			sys.exit()
		
		if my_json.get('Games')[game].get('Matches')[6].get('winner') != None:
			i = 0
			for m in my_json.get('Games')[game].get('Matches'):
				m['winner'] = None
				if i >= 4:
					m['p1'] = None
					m['p2'] = None
				#print str(m) + "<br>"
				i += 1
				
			with open("/var/www/it210/js/bracket.json", 'w') as bracketfile:
				#print json.dumps(my_json)
				bracketfile.write(json.dumps(my_json))
		else:
			print "Cannot reset bracket - the tournament has not finished<br>"

def HTML():
	print """
	<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<link href="http://fonts.googleapis.com/css?family=Questrial" rel="stylesheet" type="text/css" />
	<link href="http://fonts.googleapis.com/css?family=Fontdiner+Swanky" rel="stylesheet" type="text/css" />
	<link href="/it210/css/style.css" rel="stylesheet" type="text/css" />
	<link href="/it210/admin/admin.css" rel="stylesheet" type="text/css" />
	<link rel="SHORTCUT ICON" href="/it210/images/tigerhawk.png" />
	<script type="text/javascript" src="/it210/admin/admin.js"></script>

	<script type="text/javascript">
	function showData(arg) {
		alert(arg)
	}
	</script>

	<style type="text/css">
	</style>

	<title>Online Gaming</title>
	</head>
<body>
	<div id="menu">
	</div>
	<div id="banner">Administration</div>
	<div id="buttondiv">
		<a href="index.py"><button>Refresh</button></a>
		<a href="index.py?resetLogs=1"><button>Clear Logs</button></a>
		<a href="index.py?resetBracket=1&game=0"><button>Reset Tic-Tac-Toe</button></a>
		<a href="index.py?resetBracket=1&game=1"><button>Reset Connect 4</button>
	</a></div>
	<table id="data_table"><tr style="vertical-align: top;">
	<td><div id="dataleft">"""
	showLogs()
	print """</div></td>
	<td><div id="dataright"></div></td>
	</tr></table>
	"""


print "Content-type: text/html\n\n"
resetLogs()
resetBracket()
HTML()

