#!/usr/bin/python

from sys import argv, exit

if len(argv) != 2:
    print "Usage: %s <.po file>" % (argv[0])
    exit(1)



entities = []

class Entity:    
    def __init__(self, lines):
        self.lines = lines
    
    def valid(self):
        return self.lines[0][:2] == "#:"

    def translation_missing(self):
        return self.lines[-1] == 'msgstr ""\n'

    def dump(self):
        for l in self.lines:
            print l[:-1]

lines = []

for l in open(argv[1], "r").readlines():
    if l == "\n":
        e = Entity(lines)
        if e.valid():
            entities.append(e)
        
        lines = []
    else:
        lines.append(l)

m_count = 0
        
for e in entities[1:]:
    if e.translation_missing():
        e.dump()
        m_count += 1
        print
        
print "Translation missing: %d" % m_count