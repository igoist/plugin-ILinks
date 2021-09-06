import * as React from 'react';
import { createContainer } from 'unstated-next';
import { useArray } from '@Hooks';

const { useState, useEffect } = React;

const useITabs = () => {
  const [tabs, setTabs] = useState([]);
  // const [selects, { push: addSelects, remove: removeSelects, set: setSelects, empty: emptySelects }] = useArray([]);
  const [show, setShow] = useState(false);

  const dispatch = (action) => {
    switch (action.type) {
      case 'setTabs':
        setTabs(action.payload.tabs);
        break;
      // case 'addSelects':
      //   addSelects(action.payload.item);
      //   break;
      // case 'removeSelects':
      //   removeSelects(action.payload.item);
      //   break;
      // case 'allSelects':
      //   if (selects.length !== tabs.length) {
      //     const tmp = tabs.map((pin) => pin.id);

      //     setSelects(tmp);
      //   } else {
      //     emptySelects();
      //   }
      //   break;
      case 'toggleShow':
        setShow(!show);
        break;
      default:
        break;
    }
  };

  return { tabs, show, dispatch };
};

export default createContainer(useITabs);
