import React from 'react';
import IconCaretDown from '../icons/IconCaretDown';
import IconCaretUp from '../icons/IconCaretUp';
import styles from './Caret.module.css';

interface CaretProps {
  caret?: string;
}

const Caret:React.FC<CaretProps> = (props) => {
  if ( props.caret === 'down' ) {
    return <span className={styles.Caret}><IconCaretDown/></span>;
  }
  else if ( props.caret === 'up' ) {
    return <span className={styles.Caret}><IconCaretUp/></span>;
  }
  else {
    return <span/>;
  }
}

export default Caret;