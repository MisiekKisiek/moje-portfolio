import React from 'react';
import { Helmet } from 'react-helmet';
import favicon from '../images/favicon.ico';


const Head = () => {

  return (
    <>
      <Helmet  >
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </meta>
        <title>Michal Skrzypiec</title>
        <link rel='icon' type='image/png' href={favicon} sizes="16x16" />
      </Helmet>
    </>
  );
}

export default Head;