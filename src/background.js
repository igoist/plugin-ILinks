const host = 'http://localhost:6085';

/**
 * mode case:
 * 0 - the old, with cache
 * 1 - latest with storage
 * 2 - latest without storage
 * 3 - answer list(暂无)
 */
const getLinks = (mode, channel = 0) => {
  let api = '/api/v1/list/0';
  let suffix = '';

  if (channel === 0) {
    if (mode === 0) {
      suffix = '';
    }

    if (mode === 1) {
      suffix = 'latest';
    }

    if (mode === 2) {
      suffix = 'incognito';
    }
  }

  if (channel === 1) {
    if (mode === 2) {
      api = '/api/v1/v2ex/hot';
    } else {
      api = '/api/v1/v2ex/nodes';
    }
  }

  let url = `${host}${api}/${suffix}`;

  return new Promise(async (resolve) => {
    let r = await fetch(url).then((res) => {
      console.log('00000000', res);

      return res.json();
    });

    console.log('1111111111', r);
    if (r.Code === 0) {
      resolve(r.list);
    } else {
      resolve([]);
    }
  });
};

const main = () => {
  // 异步情况下，这里不要加 async
  const onMessage = (request, sender, sendResponse) => {
    const { payload } = request;

    const { mode, channel } = payload;

    if (request.to === 'ILinks-bg') {
      switch (request.type) {
        // 传入 src 数组 & 返回 JSON.stringify 后的 base64 数组结果
        case 'getLinkData':
          const handle = async () => {
            const links = await getLinks(mode, channel);

            sendResponse({
              result: JSON.stringify(links),
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
