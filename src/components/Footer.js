import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope ,faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';

//styles
import * as footerStyles from '../styles/footer.module.scss';



const Footer = () => {

  const data = useStaticQuery(graphql`
    query{
      allContentfulPortfolioProjects{
        edges{
          node{
            id
            projectName
            liveLink
            githubLink
            projectScreen{
              gatsbyImageData(
                layout: FULL_WIDTH
              )
              title
            }
          }
        }
      }
      site{
        siteMetadata{
          title
        }
      }
    }
  `);

  const projects = data.allContentfulPortfolioProjects.edges;

  const renderProjects = (projects) => {

    const projectsElements = projects.map((project) => {

      const { id, projectName, liveLink} = project.node;

      return (<li key={id}>
        <a href={liveLink} target="_blank">{projectName}</a>
      </li>)
    })
    return projectsElements
  }

  return ( <footer className={footerStyles.footer}>
    <section className={footerStyles.footerProjects}>
      <h2>Projects</h2>
      <ul>
        {renderProjects(projects)}
      </ul>
    </section>
    <section className={footerStyles.footerContact}>
      <span>
        <a href="https://www.instagram.com/kisiekm" target="_blank"><FontAwesomeIcon icon={faInstagram}/></a>
      </span>
      <span>
        <a href="https://github.com/MisiekKisiek" target="_blank"><FontAwesomeIcon icon={faGithub}/></a>
      </span>
      <span>
        <a href="mailto: skrzypkka@gmail.com"><FontAwesomeIcon icon={faEnvelope}/></a>
      </span>
    </section>
  </footer> );
}
 
export default Footer;