#!/bin/bash

### テンプレ

SCRIPTS=$(cat << EOS
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test --env=jsdom",
  "eject": "react-scripts eject"
}
EOS)

INDEX=$(cat << EOS
<html>
 <body>
   <div id="root"></div>
 </body>
</html>
EOS)

SRC=$(cat << EOS
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <div>Hello</div>,
  document.getElementById('root')
)
EOS)

#### 処理開始
mkdir $1
cd $1
git init

yarn init -y

yarn add --dev react-scripts
yarn add react react-dom


mkdir public
echo $INDEX > public/index.html

mkdir src
echo $SRC > src/index.js

