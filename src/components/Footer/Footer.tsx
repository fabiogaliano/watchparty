import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const Footer = () => (
  <div
    style={{
      margin: '1em',
      paddingBottom: '1em',
      fontSize: '18px',
      color: 'white',
      textAlign: 'center',
    }}
  >
    <Link style={{ color: 'white', marginRight: '1em' }} to="/faq">
      FAQ
    </Link>
    {' · '}
    <a
      href="https://github.com/fabiogaliano/watchparty"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: 'white',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5em',
        marginLeft: '1em',
      }}
    >
      <Icon name="github" />
      GitHub
    </a>
  </div>
);
