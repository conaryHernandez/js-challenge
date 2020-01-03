import React from 'react';

import classes from './Button.module.scss';

const Button = props => {
  return (
    <button
      onClick={props.clicked}
      disabled={props.disabled}
      className={classes.Button}
      {...props}>
      {props.children}
    </button>
  );
};

export default Button;
