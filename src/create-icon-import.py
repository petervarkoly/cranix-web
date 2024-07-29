#!/usr/bin/python3

import os
import re
import sys

def convert_to_camel(a):
    n  = ""
    up = False
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
find_ion = re.compile(r'<ion-icon.* name="([a-z\-]+)"',re.MULTILINE)
find_const = re.compile(r'(constructor[^{]+{)',re.MULTILINE)
for line in os.popen('grep -lr templateUrl').readlines():
    dirname = os.path.dirname(line.strip())
    file = open(line.strip()).read()
    matches = [m.groups() for m in find_templateUrl.finditer(file)]
    template = dirname + "/" + matches[0][0]
    #print(template)
    ions = []
    for m in find_ion.finditer(open(template).read()):
        ion = convert_to_camel(m.groups()[0])
        if ion not in ions:
            ions.append(ion)
    #print(ions)
    if len(ions) > 0:
        matches = [m.groups() for m in find_const.finditer(file)]
        print("================")
        files = file.split(matches[0][0])
        #print(files[0])
        #print(matches[0][0])
        #print(files[1])
        file = "import {0} addIcons {2} from 'ionicons';\nimport {0} {1} {2} from 'ionicons/icons';\n{3}{4}\n    addIcons ({0} {1} {2});{5}".format('{',', '.join(ions),'}',files[0],matches[0][0],files[1])
        #print(file)
        #continue
        with open(line.strip(),'w') as f:
            f.write(file)
