#!/usr/bin/python

from sys import argv, exit

if len(argv) != 2:
    print "Usage: %s <.po file>" % (argv[0])
    exit(1)



entities = []

class Entity:    
    def __init__(self, d, lines):
        self.lines = lines
        self.start_line = d
    
    def valid(self):
        return self.lines[0][:2] == "#:"

    def translation_missing(self):
        return self.lines[-1] == 'msgstr ""\n'

    def dump(self):
        c = self.start_line
        
        for l in self.lines:
            print "%d: %s" % (c, l[:-1])
            c += 1

lines = []
count = 0

for l in open(argv[1], "r").readlines():
    count += 1
    if l == "\n":
        e = Entity(count - len(lines), lines)
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