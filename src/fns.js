import { extension } from '@Utils';

const { sendMessage } = extension;

const getLinks = () => {
  return new Promise((resolve) => {
    const handleRes = (res) => {
      const links = JSON.parse(res.result);

      console.log('result.length: ', links && links.length);

      resolve(links);
    };

    sendMessage(
      {
        to: 'ILinks-bg',
        type: 'getLinkData',
      },
      handleRes
    );
  });
};

export const getData = async (dispatch) => {
  const links = await getLinks();

  dispatch({
    type: 'setLinks',
    payload: {
      links,
    },
  });

  return {
    links,
  };
};

export const changeChannel = (delta, dispatch) => {
  let channelType = 'setChannelNext';

  if (delta === -1) {
    channelType = 'setChannelPrev';
  }

  sendMessage(
    {
      to: 'ILinks-bg',
      type: 'changeChannel',
      payload: {
        delta,
      },
    },
    (res) => {
      console.log('======= channel:', res);
    }
  );

  dispatch({
    type: channelType,
  });
};

export const changeMode = (delta, dispatch) => {
  let modeType = 'setModeNext';

  if (delta === -1) {
    modeType = 'setModePrev';
  }

  sendMessage(
    {
      to: 'ILinks-bg',
      type: 'changeMode',
      payload: {
        delta,
      },
    },
    (res) => {
      console.log('======= mode:', res);
    }
  );

  dispatch({
    type: modeType,
  });
};
