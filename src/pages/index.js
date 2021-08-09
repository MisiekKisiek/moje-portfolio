import React, { useRef } from "react";
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

//Components


//Styles
import * as mainStyles from '../styles/main.module.scss';

//Tools
import { projectAnimationFunction } from '../tools/tools';


const Main = () => {

  const data = useStaticQuery(graphql`
    query{
      deskImage: file(relativePath: {eq: "desk.jpg"}){
        childImageSharp {
					gatsbyImageData(
            layout: FULL_WIDTH
          )
				}
      }
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

  const desk = getImage(data.deskImage)

  const projects = data.allContentfulPortfolioProjects.edges;

  console.log(projectAnimationFunction(window, 170));

  const renderProjects = () => {
    const projectsElements = projects.map((project) => {
      const { id, projectName, liveLink, githubLink } = project.node;
      const projectScreen = getImage(project.node.projectScreen);
      return (<div
        className={mainStyles.project}
        key={id}
      >
        <h2>{projectName}</h2>
        <div
          style={{
            clipPath: `polygon(0 0, ${projectAnimationFunction(window, 150)}% 5%, 100% 100%, 0 95%)`,
          }}
          className={mainStyles.projectScreen}
        >
          <GatsbyImage
            image={projectScreen}
            alt={project.node.projectScreen.title}
          />
          <a href={liveLink}>Live</a>
          <a href={githubLink}>Github</a>
        </div>
      </div>)
    })
    return projectsElements
  }

  return (<main
    className={mainStyles.main}
    id="main-section"
  >
    <section className={mainStyles.firstSection}>
      <div className={mainStyles.curtine}></div>
      <GatsbyImage image={desk} alt="desk image" />
    </section>
    <section className={mainStyles.secondSection}>

    </section>
    <section
      className={mainStyles.thirdSection}
      id="projects"
    >
      <h1>My projects</h1>
      {renderProjects()}
    </section>
  </main>);
}

export default Main;
