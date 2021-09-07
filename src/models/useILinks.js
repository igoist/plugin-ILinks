import * as React from 'react';
import { createContainer } from 'unstated-next';
import { useArray } from '@Hooks';

const { useState, useEffect } = React;

const channelMax = 1;
const modeMax = 2;

const useILinks = () => {
  const [links, setLinks] = useState([]);
  // const [selects, { push: addSelects, remove: removeSelects, set: setSelects, empty: emptySelects }] = useArray([]);
  const [show, setShow] = useState(false);
  const [channel, setChannel] = useState(0);
  const [mode, setMode] = useState(0);

  const dispatch = (action) => {
    let tmpChannel;
    let tmpMode;

    switch (action.type) {
      case 'setLinks':
        setLinks(action.payload.links);
        break;
      case 'setChannelPrev':
        tmpChannel = channel - 1;

        if (tmpChannel === -1) {
          tmpChannel = channelMax;
        }

        setChannel(tmpChannel);
        break;
      case 'setChannelNext':
        tmpChannel = channel + 1;

        if (tmpChannel > channelMax) {
          tmpChannel = 0;
        }

        setChannel(tmpChannel);
        break;
      case 'setModePrev':
        tmpMode = mode - 1;

        if (tmpMode === -1) {
          tmpMode = modeMax;
        }

        setMode(tmpMode);
        break;
      case 'setModeNext':
        tmpMode = mode + 1;

        if (tmpMode > modeMax) {
          tmpMode = 0;
        }

        setMode(tmpMode);
        break;
      case 'toggleShow':
        setShow(!show);
        break;
      default:
        break;
    }
  };

  return { links, show, channel, mode, dispatch };
};

export default createContainer(useILinks);
