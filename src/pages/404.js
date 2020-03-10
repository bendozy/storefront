import React from 'react';
import useDarkMode from 'use-dark-mode';

import SEO from '../components/utils/seo';

const NotFoundPage = () => {
  const darkMode = useDarkMode(false);

  console.log('darkMode', darkMode);

  return (
    <>
      <SEO title="404: Not found" />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </>
  );
};

export default NotFoundPage;
