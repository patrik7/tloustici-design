#!/bin/bash

SOURCEBASE=/home/pbeck/workspace/Tloustici/src
LNGFILE='/home/pbeck/workspace/Tloustici/tloustici-design/locale/cs/LC_MESSAGES/django.po'

git stash -q --keep-index

cd $SOURCEBASE
django-admin makemessages -s -a
cd -

grep fuzzy -A 2 $LNGFILE
RESULT=$?

git stash pop -q

[ $RESULT -ne 0 ] && exit 0
exit 1
