#!/usr/bin/python3.11

import os
import re
import sys

find_imports = re.compile(r'imports: \[(.*)\]',re.MULTILINE)
for f in os.popen('grep -lr ngIf protected/ | grep html').readlines():
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
    print(file_name)
    file = "import { NgIf, NgFor } from '@angular/common';\n" +file.replace("[" +imports+ "]", "[ NgIf, NgFor," + imports + "]")
    with open(file_name,'w') as f:
        f.write(file)
