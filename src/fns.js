import { extension } from '@Utils';

const { sendMessage } = extension;

export const getData = async (dispatch) => {
  const getTabs = () => {
    return new Promise((resolve) => {
      const handleRes = (res) => {
        const tabs = JSON.parse(res.result);

        console.log('22222222222', res, tabs);

        resolve(tabs);
      };

      sendMessage(
        {
          to: 'IPin-bg',
          type: 'getTabData',
        },
        handleRes
      );
    });
  };

  const tabs = await getTabs();

  dispatch({
    type: 'setTabs',
    payload: {
      tabs,
    },
  });

  return {
    tabs,
  };
};

export const fnDownload = async (config) => {
  const { pins, selects } = config;

  let taskArr = pins.filter((pin) => selects.includes(pin.id));

  const handleRes = async (res) => {
    console.log('fnDownload handleRes ', res);

    if (res && res.result) {
      const arr = JSON.parse(res.result);

      for (let i = 0; i < arr.length; i++) {
        // let r = await getImageDataURL(arr[i]);

        let r = arr[i];

        if (r) {
          download(r, `test-${i}`);
        }
      }
    }
  };

  taskArr = taskArr.map((item) => item.src);

  sendMessage(
    {
      to: 'IPin-bg',
      type: 'getImageData',
      payload: {
        taskArr: JSON.stringify(taskArr),
      },
    },
    handleRes
  );
};
