import * as React from 'react';
import { useILinks } from '@Models';
import { dom, prefix, IAdB } from '@Utils';

import { getData, changeMode } from './fns';

const { scrollSmothlyTo2 } = dom;
const pf = prefix;

const { useEffect, useRef } = React;

const Link = (props) => {
  const { title, link } = props;

  // const classNameEx = isSelected ? `${pf}-selected` : '';

  return (
    <div
      className={`${IAdB} ${pf} ${pf}-link-item`}
      // onClick={handleClick}
    >
      {/* {desc} */}
      <div className={`${IAdB} ${pf}-link-item-title`}>{title}</div>
      <div className={`${IAdB} ${pf}-link-item-link`}>{link}</div>
    </div>
  );
};

const R = () => {
  const wRef = useRef(null); // wfc content wrap
  const { links, selects, show, mode, dispatch } = useILinks.useContainer();

  useEffect(() => {
    const w = wRef.current;

    const handleEvent = (e) => {
      if (e.altKey && e.keyCode === 84) {
        dispatch({
          type: 'toggleShow',
        });
      }

      // n - prev mode
      if (e.altKey && e.keyCode === 78) {
        changeMode(-1, dispatch);
      }

      // m - next mode
      if (e.altKey && e.keyCode === 77) {
        changeMode(1, dispatch);
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
  }, [dispatch]);

  useEffect(() => {
    if (!show) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    getData(dispatch);
  }, [show]);

  return (
    <div className={`${IAdB} ${pf} ${pf}-wrap ${show ? '' : 'is-hidden'}`}>
      <div className={`${IAdB} ${pf} ${pf}-content clearfix`} ref={wRef}>
        <div className={`${IAdB} ${pf} ${pf}-wf clearfix`}>
          {show && links.map((link, index) => <Link key={`${pf}-tab-${index}`} {...link} />)}
        </div>
      </div>

      <div className={`${pf} ${pf}-mode-lights is-mode-${mode}`}>
        <div className={`${pf} ${pf}-mode-light`}>0</div>
        <div className={`${pf} ${pf}-mode-light`}>1</div>
        <div className={`${pf} ${pf}-mode-light`}>2</div>
      </div>
    </div>
  );
};

export default R;
