import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import scrollTo from 'gatsby-plugin-smoothscroll';

//Context
import AppContext from '../context/App.context';

//styles
import * as headerStyles from '../styles/header.module.scss';

const Header = ({ }) => {

  const {
    scrollDirection,
  } = useContext(AppContext);

  const data = useStaticQuery(graphql`
    query{
      site{
        siteMetadata{
          author
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata;

  return (<header
    className={`${headerStyles.header}`}
    id="header"
  >
    <ul className={`${headerStyles.menu} ${scrollDirection ? null : headerStyles.menuHide}`}>
      <li>
        <button onClick={() => { scrollTo('#header') }}>{author.toUpperCase()}</button>
      </li>
      <li>
        <button onClick={() => { scrollTo('#main-section') }}>About</button>
      </li>
      <li>
        <button onClick={() => { scrollTo('#projects') }}>Works</button>
      </li>
      <li>
        <button onClick={() => { scrollTo('#contact') }}>Contact</button>
      </li>
    </ul>
    <div className={headerStyles.greeting}>
      <h1>hello.</h1>
    </div>
    <section className={headerStyles.about}>
      <div>
        <h1>Long story short...</h1>
      </div>
      <div>
        <p>
          <span>I'am a frontend freelancer amateur.</span>
        </p>
        <p>
          <span>For last two years I'am learning frontend </span>
        </p>
        <p>
          <span>technologies and now looking for new </span>
        </p>
        <p>
          <span>opportunities to grow up :)</span>
        </p>
      </div>
    </section>
  </header>);
}

export default Header;