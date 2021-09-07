import { extension } from '@Utils';

const { sendMessage } = extension;

const getLinks = (channel, mode) => {
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
        payload: {
          channel,
          mode,
        },
      },
      handleRes
    );
  });
};

export const getData = async (props) => {
  const { dispatch, channel, mode } = props;
  const links = await getLinks(channel, mode);

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

  dispatch({
    type: channelType,
  });
};

export const changeMode = (delta, dispatch) => {
  let modeType = 'setModeNext';

  if (delta === -1) {
    modeType = 'setModePrev';
  }

  dispatch({
    type: modeType,
  });
};
