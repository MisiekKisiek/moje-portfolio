import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";

//Styles
import * as mainStyles from '../styles/main.module.scss';

const Project = ({ projectName, liveLink, githubLinkFront, githubLinkBack, projectScreen, alt }) => {

  return (
    <div
      className={mainStyles.project}
    >
      <h2
        data-sal="slide-up"
        data-sal-duration="1200"
        data-sal-delay="500"
        data-sal-easing="ease"
      >
        {projectName}
      </h2>
      <div
        className={mainStyles.projectScreen}
        style={{
          clipPath: `polygon(0 ${Math.random() * 5}%, 100% ${Math.random() * 5}%, 100% ${Math.random() * 5 + 95}%, 0 ${Math.random() * 5 + 95}%)`,
        }}
      >
        <GatsbyImage
          image={projectScreen}
          alt={alt}
        />
        <a href={liveLink} target="_blank" rel="noreferrer">Live</a>
        <a 
          className={githubLinkBack ? mainStyles.backendLink: ""} 
          href={githubLinkFront} 
          target="_blank" 
          rel="noreferrer"
        >
          {githubLinkBack ? "Github frontend" : "Github"}
        </a>
        {githubLinkBack ? (
        <a 
          className={mainStyles.backendLink} 
          href={githubLinkBack} 
          target="_blank" 
          rel="noreferrer"
        >
          Github backend
        </a>
        ) : null}
      </div>
    </div>
  );
}

export default React.memo(Project);