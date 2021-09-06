const getTabs = () => {
  // return new Promise((resolve) => {
  //   chrome.tabs.query({}, (tabs) => {
  //     resolve(tabs);
  //   });
  // });

  return new Promise(async (resolve) => {
    let r = await fetch('http://localhost:6085/api/v1/list/0/incognito').then((res) => res.json());
    console.log('1111111111', r);
    resolve([]);
  });
};

const getIconBlob = (url) => {
  return new Promise(async (resolve) => {
    let r = await fetch(url).then((res) => res.blob());

    resolve(URL.createObjectURL(r));
  });
};

const main = () => {
  // 异步情况下，这里不要加 async
  const onMessage = (request, sender, sendResponse) => {
    const { payload } = request;

    // console.log('========', request, sender, sendResponse);

    if (request.to === 'IPin-bg') {
      switch (request.type) {
        // 传入 src 数组 & 返回 JSON.stringify 后的 base64 数组结果
        case 'getTabData':
          const handle = async () => {
            const tabs = await getTabs();

            console.log('should ', tabs);

            // tabs[0].favIconUrl;

            // let taskArr = tabs.map((tab) => getIconBlob(tab.favIconUrl));

            // let r = await Promise.all(taskArr);

            // console.log('herer ', r);

            sendResponse({
              result: JSON.stringify(tabs),
            });
          };

          handle();

          return true;
        default:
          break;
      }
    }
  };

  chrome.runtime.onMessage.addListener(onMessage);
};

try {
  main();
} catch (err) {
  console.log(`%cmain catch%c: ${err}`, 'background: #fff; color:  #f49cec;', 'color: #149cec;', err);
}
