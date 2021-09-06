import * as React from 'react';
import { useITabs } from '@Models';
import { dom, prefix } from '@Utils';

import { getData } from './fns';

const { scrollSmothlyTo2 } = dom;
const pf = prefix;

const { useEffect, useRef } = React;

const Tab = (tab) => {
  const { favIconUrl, title } = tab;

  // const classNameEx = isSelected ? `${pf}-selected` : '';

  return (
    <div
      className={`${pf} ${pf}-tab-item`}
      // onClick={handleClick}
    >
      {/* {desc} */}
      <img src={favIconUrl} />
      <div className={`${pf}-tab-item-title`}>{title}</div>
    </div>
  );
};

const R = () => {
  const btnRef = useRef(null); // btn toggle
  const btnSRef = useRef(null); // btn check all or revert
  const wRef = useRef(null); // wfc content wrap
  const { tabs, selects, show, dispatch } = useITabs.useContainer();

  useEffect(() => {
    const w = wRef.current;
    const btn = btnRef.current;
    // const btnS = btnSRef.current;

    const handleEvent = (e) => {
      if (e.altKey && e.keyCode === 80) {
        btn && btn.click();
      }

      if (e.keyCode === 74) {
        scrollSmothlyTo2(100, w);
      }

      if (!e.altKey && e.keyCode === 75) {
        scrollSmothlyTo2(-100, w);
      }
    };

    document.addEventListener('keydown', handleEvent);

    return () => {
      document.removeEventListener('keydown', handleEvent);
    };
  }, []);

  useEffect(() => {
    if (!show) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    getData(dispatch);
  }, [show]);

  const handleToggle = () => {
    dispatch({
      type: 'toggleShow',
    });
  };

  return (
    <div className={`${pf} ${pf}-wrap ${show ? '' : 'is-hidden'}`}>
      <div style={{ display: 'none' }} ref={btnRef} onClick={handleToggle}></div>
      {/* <div style={{ display: 'none' }} ref={btnSRef} onClick={handleCheckAll}></div> */}
      <div className={`${pf} ${pf}-content clearfix`} ref={wRef}>
        <div className={`${pf} ${pf}-wf clearfix`}>
          {show &&
            tabs.map((tab, index) => (
              // <Tab key={`${pf}-tab-${index}`} {...tab} isSelected={selects.includes(pin.id)} handleClick={() => handleClick(pin.id)} />
              <Tab key={`${pf}-tab-${index}`} {...tab} />
            ))}
        </div>
      </div>

      <div className={`${pf} ${pf}-ttt`}></div>
    </div>
  );
};

export default R;
