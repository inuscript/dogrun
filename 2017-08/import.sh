#!/bin/sh -x
USER=inuscript
REPO=$1

git subtree add --prefix=$REPO https://github.com/$USER/$REPO.git master
