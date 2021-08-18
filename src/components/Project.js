import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";

//Styles
import * as mainStyles from '../styles/main.module.scss';

const Project = ({id, projectName, liveLink, githubLink, projectScreen, alt}) => {
  return ( 
    <div
        className={mainStyles.project}
        key={id}
      >
        <h2
          data-sal="slide-up"
          data-sal-delay="1000"
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
          <a href={liveLink} target="_blank">Live</a>
          <a href={githubLink} target="_blank">Github</a>
        </div>
      </div>
   );
}
 
export default React.memo(Project);