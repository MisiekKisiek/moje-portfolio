import React, { useState } from "react";
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import emailjs from 'emailjs-com';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';

//Components
import TextError from '../components/TextError';

//Styles
import * as mainStyles from '../styles/main.module.scss';

//Tools


const Main = () => {

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const [errorMessage, seterrorMessage] = useState("");

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
            alt={project.node.projectScreen.title}
          />
          <a href={liveLink}>Live</a>
          <a href={githubLink}>Github</a>
        </div>
      </div>)
    })
    return projectsElements
  }

  const handleSendEmail = (e) => {
    e.preventDefault();
    console.log(e.target)
    if (e.target.value) { }
    // emailjs.sendForm('gmail', 'Portfolio', e.target, `user_qZY7FllS46aSyJuEosQN8`)
    //   .then((result) => {
    //     console.log(result.text)
    //   }, (error) => {
    //     console.log(error.text)
    //   });
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
      <h1>
        <span>M</span>
        <span>a</span>
        <span>i</span>
        <span>l</span>
        {" "}
        <span>m</span>
        <span>e</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
        {" "}
        <FontAwesomeIcon icon={faArrowDown} />
      </h1>
      <form
        className={mainStyles.form}
        onSubmit={handleSendEmail}
      >
        <TextError errorMessage={errorMessage} />
        <label htmlFor="message"></label>
        <textarea
          id="message"
          name='message'
          placeholder="message"
          value={message}
          onChange={(e) => { setmessage(e.target.value) }}
        />
        <label htmlFor="email"></label>
        <input
          id="email"
          name="email"
          placeholder="e-mail"
          type="email"
          autoComplete="off"
          value={email}
          onChange={(e) => { setemail(e.target.value) }}
        />
        <label htmlFor="name"></label>
        <input
          id="name"
          name="name"
          placeholder="name"
          type="name"
          autoComplete="off"
          value={name}
          onChange={(e) => { setname(e.target.value) }}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </form>
    </section>
  </main>);
}

export default Main;
