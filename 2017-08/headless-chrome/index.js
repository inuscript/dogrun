const { Launcher } = require('lighthouse/chrome-launcher/chrome-launcher');

function launchChrome(headless = true) {
  const launcher = new Launcher({
    port: 9222,
    autoSelectChrome: true, // false にした場合は手動で Chrome を選択する
    additionalFlags: [
      '--window-size=412,732',
      '--disable-gpu',
      headless ? '--headless' : ''
    ]
  });
  return launcher.launch().then(() => launcher)
    .catch(err => {
      return launcher.kill().then(() => { // エラーな場合 Chrome を終了
        throw err;
      }, console.error);
    });
}

const chrome = require('chrome-remote-interface');

function onPageLoad(Runtime) {
  const js = "document.querySelector('title').textContent";

  // ページ内で JS の式を評価する。
  return Runtime.evaluate({expression: js}).then(result => {
    console.log('Title of page: ' + result.result.value);
  });
}

launchChrome().then(launcher => {

  chrome(protocol => {
    // DevTools プロトコルから、必要なタスク部分を抽出する。
    // API ドキュメンテーション: https://chromedevtools.github.io/devtools-protocol/
    const {Page, Runtime} = protocol;

    // まず、使用するドメインを有効にする。
    Promise.all([
      Page.enable(),
      Runtime.enable()
    ]).then(() => {
      Page.navigate({url: 'https://www.chromestatus.com/'});

      // window.onload を待つ。
      Page.loadEventFired(() => {
        onPageLoad(Runtime).then(() => {
          protocol.close();
          launcher.kill(); // Chrome を終了させる。
        });
      });

    });

  }).on('error', err => {
    throw Error('Cannot connect to Chrome:' + err);
  });

});