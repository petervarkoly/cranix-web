#!/usr/bin/python3.11

import os
import re
import sys

find_imports = re.compile(r'imports: \[(.*)\]',re.MULTILINE)
find_ngtrans = re.compile(r'(AgGridAngular)',re.MULTILINE)
for f in os.popen('grep -lr ag-grid-angular protected/ | grep html').readlines():
    file_name = f.strip().removesuffix("html")+'ts'
    try:
        file = open(file_name).read()
    except:
        continue
    matches1 = [m.groups() for m in find_imports.finditer(file)]
    matches2 = [m.groups() for m in find_ngtrans.finditer(file)]
    try:
        imports = matches1[0][0]
        ngimpot = matches2[0][0]
    except:
        print(file_name)
        file = "import { AgGridAngular } from 'ag-grid-angular';\n" +file.replace("[" +imports+ "]", "[ AgGridAngular," + imports + "]")
        with open(file_name,'w') as f:
            f.write(file)
