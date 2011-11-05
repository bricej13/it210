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


allMatches = []

class match:
	winner = ""
	loser = ""
	match = ""



def createNewJSON(bracket):
	try:
		my_json = json.load(open(bracket, 'r'))
	except IOError:
		print "<h4>Invalid file name</h4>"
		sys.exit()
		
	i = 0
	for m in my_json.get('Games')[1].get('Matches'):
		tmp = match()
		try:
			winum = int(m.get('winner'))
		except TypeError:
			winum = None

		if isinstance(m.get('p1'), int):
			p1num = int(m.get('p1'))
		else:
			p1num = None

		if isinstance(m.get('p2'), int):
			p2num = int(m.get('p2'))
		else:
			p2num = None

		if isinstance(winum, int):
			if winum == p1num:
				tmp.winner = my_json.get('People')[p1num].get('name')
				tmp.loser = my_json.get('People')[p2num].get('name')
			elif winum == p2num:
				tmp.winner = my_json.get('People')[p2num].get('name')
				tmp.loser = my_json.get('People')[p1num].get('name')
				
		tmp.match = m.get('match')
		d = dict(winner=tmp.winner, loser=tmp.loser, match=tmp.match)
		allMatches.append(d)
		i += 1
	
def saveLog():
	try:
		game = sys.argv[1]
	except IndexError:
		game = -1

	filename = time.ctime()
	filename = filename.replace(" ", "_")
	if game == "1":
		with open("/var/www/it210/admin/log/Con4_"+ filename +".log", 'a') as logfile:
			logfile.write(json.dumps(allMatches) + "\n")
	elif game == "0":
		with open("/var/www/it210/admin/log/TTT_"+ filename +".log", 'a') as logfile:
			logfile.write(json.dumps(allMatches) + "\n")
	

def printHTML():
	print "<h4>printHTML()</h4>"
	print "<pre>"
	pprint.pprint(json.dumps(allMatches))
	print "<br>"
	print json.dumps(allMatches)
	print "</pre>"

def getFile():
	form = cgi.FieldStorage()
	try: 
		dir = "/var/www/it210/js/" + form.getvalue('file')
	except TypeError:
		dir = "/var/www/it210/js/bracket.json"
	return dir

def main():
	bracket = getFile()
	createNewJSON(bracket)
	saveLog()


if __name__ == "__main__":
	main()
