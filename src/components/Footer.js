import React from 'react';

const Footer = props => {
  return (
    <footer className={props.videos.length === 0 ? 'fixedBottom' : 'rmvFixedBottom'}>
      <p>
        Desarrollado por <a href="https://github.com/iairpolo">Iair Poloniecki</a> con la tecnología{' '}
        <a href="https://reactjs.org/">React.js</a>
      </p>
    </footer>
  );
};

export default Footer;
