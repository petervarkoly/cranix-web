#!/usr/bin/python3

import os
import re

def convert_to_camel(a):
    n  = ""
    up = True
    for i in a:
        if i == '-':
            up = True
            continue
        if up:
            n += i.upper()
            up = False
        else:
            n += i
    return n

find_templateUrl = re.compile(r"templateUrl: '\.*(.*)'",re.MULTILINE)
find_ion = re.compile(r"<(ion-[a-z\-]+) ",re.MULTILINE)
for line in os.popen('grep -lr templateUrl').readlines():
    dirname = os.path.dirname(line.strip())
    file = open(line.strip()).read()
    matches = [m.groups() for m in find_templateUrl.finditer(file)]
    template = dirname + "/" + matches[0][0]
    ions = []
    for m in find_ion.finditer(open(template).read()):
        ion = convert_to_camel(m.groups()[0])
        if ion not in ions:
            ions.append(ion)
    if len(ions) > 0:
        file = "import {0} {1} {2} from '@ionic/angular/standalone';\n  imports: [ {1} ],\n".format('{',', '.join(ions),'}') +  file
        with open(line.strip(),'w') as f:
            f.write(file)
