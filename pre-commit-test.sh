#!/bin/bash

SOURCEBASE=/home/pbeck/workspace/Tloustici/src
LNGFILE='/home/pbeck/workspace/Tloustici/tloustici-design/locale/cs/LC_MESSAGES/django.po'

#make backup
cp $LNGFILE /tmp

backup=$?
if [ "$backup" == "0" ]; then
	git stash -q --keep-index

	cd $SOURCEBASE
	django-admin makemessages -s -a
	cd -

	grep fuzzy -A 2 $LNGFILE
	RESULT=$?

	git stash pop -q

	cp /tmp/django.po $LNGFILE
else
	echo "Cannot create backup"
	exit 1
fi

[ $RESULT -ne 0 ] && exit 0

echo "Failed!"
exit 1
