import React, { useRef } from "react";
import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

//Components


//Styles
import * as mainStyles from '../styles/main.module.scss';

//Tools
import { } from '../tools/tools';


const Main = () => {

  const element = useRef(null);

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

  const renderProjects = () => {

    const projectsElements = projects.map((project) => {

      const { id, projectName, liveLink, githubLink } = project.node;
      const projectScreen = getImage(project.node.projectScreen);

      return (<div
        className={mainStyles.project}
        key={id}
      >
        <h2
          data-sal="slide-up"
          data-sal-delay="300"
          data-sal-easing="ease"
        >{projectName}</h2>
        <div
          className={mainStyles.projectScreen}
          style={{
            clipPath: `polygon(0 ${Math.random() * 5}%, 100% ${Math.random() * 5}%, 100% ${Math.random() * 5 + 95}%, 0 ${Math.random() * 5 + 95}%)`,
          }}
        >
          <GatsbyImage
            image={projectScreen}
            alt={project.node.projectScreen.title}
          // style={{
          //   transform: `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -2000, 0, 1)`,
          //   color: "red"
          // }}
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
    <section
      className={mainStyles.fourthSection}
      id="contact"
    >
      <h1>Mail me</h1>
    </section>
  </main>);
}

export default Main;
