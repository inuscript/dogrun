#!/bin/bash

mkdir $1
cd $1
git init

yarn init -y

yarn add --dev react-scripts
yarn add react react-dom

