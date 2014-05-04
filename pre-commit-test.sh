#!/bin/bash

SOURCEBASE=/home/pbeck/workspace/Tloustici/src
LNGFILE='/home/pbeck/workspace/Tloustici/tloustici-design/locale/cs/LC_MESSAGES/django.po'

#make backup
cp $LNGFILE /tmp

git stash -q --keep-index

cd $SOURCEBASE
django-admin makemessages -s -a
cd -

grep fuzzy -A 2 $LNGFILE
RESULT=$?

git stash pop -q

d=`diff $LNGFILE /tmp/${LNGFILE##*/} | wc -l`
if [ "$d" == "2" ]; then
	#no change besides the date
	cp /tmp/${LNGFILE##*/} $LNGFILE
fi

[ $RESULT -ne 0 ] && exit 0

echo "Failed!"
exit 1
