#!/bin/bash
REPO="/data1/OSC/home:pvarkoly:CRANIX/cranix-web"
HERE=$( pwd )
DATE=$( date -u +"Built at: %Y-%m-%d %H:%M" )
git status

echo -n "Can we build y/n "; read b
if [ $b != "y" ]; then
	exit
fi
cp src/app/services/utils.service.ts-notest src/app/services/utils.service.ts
cp src/index.html-prod src/index.html
sed -i "s/VERSION-PLACE-HOLDER/${DATE}/" src/app/services/auth.service.ts
ionic build --prod
git stash
echo -n "Can we checkin y/n "; read b
if [ "${b}" != "y" ]; then
	exit
fi
cd www
tar cjf $REPO/cranix-web.tar.bz2 *
xterm -e "git log --raw" &
cd ${REPO}
osc vc
osc ci
cd ${HERE}
