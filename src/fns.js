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

/**
 * 过滤一下一些莫名其妙的热榜内容
 */
const linkFilter = (link) => {
  let f = true;

  const words = ['如何以', '为开头'];

  words.map((word) => {
    if (link.indexOf(word) !== -1) {
      f = false;
    }
  });

  return f;
};

export const getData = async (props) => {
  const { dispatch, channel, mode } = props;
  let links = await getLinks(channel, mode);

  links = links.filter((link) => linkFilter(link.title));

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
