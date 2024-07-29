#!/usr/bin/python3.11

import os
import re
import sys

find_imports = re.compile(r'imports: \[(.*)\]',re.MULTILINE)
for f in os.popen('grep -lr cranix-md-list').readlines():
    file_name = f.strip().removesuffix("html")+'ts'
    try:
        file = open(file_name).read()
    except:
        continue
    matches = [m.groups() for m in find_imports.finditer(file)]
    try:
        imports = matches[0][0]
    except:
        continue
    file = "import { CranixMdListComponent } from 'src/app/shared/cranix-md-list/cranix-md-list.component'\n" + file.replace("[" +imports+ "]", "[ CranixMdListComponent," + imports + "]")
    with open(file_name,'w') as f:
            f.write(file)
