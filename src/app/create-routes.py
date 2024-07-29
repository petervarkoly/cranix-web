#!/usr/bin/python3.11

import os
import re

def convert_to_camel(a):
    n  = ""
    up = True
    for i in a:
        if i == '-' or i == '.':
            up = True
            continue
        if up:
            n += i.upper()
            up = False
        else:
            n += i
    return n

for line in os.popen('find protected/ -name "*ts" | grep -v spec').readlines():
    dirname  = os.path.dirname(line.strip())
    basename = os.path.basename(line.strip()).removesuffix(".ts")
    comp_name = convert_to_camel(basename)
    print("  {")
    print(f"    path: '{dirname}',")
    print(f"    loadComponent: () => import('./{dirname}/{basename}').then(m => m.{comp_name})")
    print("  },")
