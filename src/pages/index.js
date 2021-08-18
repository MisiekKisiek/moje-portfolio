import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import emailjs from 'emailjs-com';
import { Formik, Form, Field } from "formik";
import scrollTo from 'gatsby-plugin-smoothscroll';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';


//Components
import Project from '../components/Project';
import TextError from '../components/TextError';

//Styles
import * as mainStyles from '../styles/main.module.scss';

//Tools


const Main = () => {

  const [bouncyBallPosition, setbouncyBallPosition] = useState(0);
  const [errorMessage, seterrorMessage] = useState("");

  useEffect(() => {
    window.addEventListener('scroll',()=>{
      const position = -window.pageYOffset/10;
      setbouncyBallPosition(position);
    })
  }, [])

  const data = useStaticQuery(graphql`
    query{
      deskImage: file(relativePath: {eq: "desk.jpg"}){
        childImageSharp {
					gatsbyImageData(
            layout: FULL_WIDTH
          )
				}
      }
      profileImage: file(relativePath: {eq: "profil.jpg"}){
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

  const desk = getImage(data.deskImage);
  const profileImage = getImage(data.profileImage);

  const renderProjects = (projects) => {

    const projectsElements = projects.map((project) => {

      const {id, projectName, liveLink, githubLink } = project.node;
      const projectScreen = getImage(project.node.projectScreen);
      const alt = project.node.projectScreen.title;
      const props = {id, projectName, liveLink, githubLink, projectScreen, alt};

      return (
      <Project {...props}/>
      )
    })
    return projectsElements
  }

  const handleSendEmail = (values, resetFunc) => {
    emailjs.send('gmail', 'Portfolio', values, `user_qZY7FllS46aSyJuEosQN8`)
      .then((result) => {
        resetFunc();
        seterrorMessage("We send it!");
        console.log(result.status);
      }, (error) => {
        seterrorMessage("Something went wrong, try again later :(");
        console.log(error.text);

      });
  }

  return (<main
    className={mainStyles.main}
  >
    <section className={mainStyles.firstSection}>
      <div className={mainStyles.curtine}></div>
      <GatsbyImage image={desk} alt="desk image" />
      <button
        className={mainStyles.bouncyBall}
        onClick={() => { scrollTo('#contact') }}
        style={{
          transform: `translate(-50%, ${bouncyBallPosition}%)`,
        }}
      >
        <span>just</span>
        <span>contact</span>
      </button>
    </section>
    <section 
      className={mainStyles.secondSection}
      id="about"
    >
      <h1>About</h1>
      <div className={mainStyles.profileImage}>
        <GatsbyImage image={profileImage} alt="profile photo"/>
        <div 
          className={mainStyles.walkingText}
        >
          <span>Hello, it's me! Hello, it's me!</span>
        </div>
        <div 
          className={mainStyles.walkingText}
        >
          <span>Hello, it's me! Hello, it's me!</span>
        </div> 
      </div>
      <p>
        Hi!
        As 
      </p>
    </section>
    <section
      className={mainStyles.thirdSection}
      id="projects"
    >
      <h1>My projects</h1>
      {renderProjects(data.allContentfulPortfolioProjects.edges)}
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
      <Formik
        initialValues={{
          name: "",
          email:"",
          message:"",
        }}
        onSubmit={(values, actions)=>{
          handleSendEmail(values, ()=>{actions.resetForm({name:"", email:"", message:""})});
        }}
      >
        <Form className={mainStyles.form}>
          <TextError errorMessage={errorMessage}/>
          <Field 
            as="textarea" 
            name="message" 
            id="message" 
            type="message" 
            placeholder="message" 
            autoComplete="off"
          />
          <Field 
            name="email" 
            id="email" 
            type="email" 
            placeholder="email" 
            autoComplete="off"
          />
          <Field 
            name="name" 
            id="name" 
            type="name" 
            placeholder="name" 
            autoComplete="off"
          />
          <button type="submit">
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </Form>
      </Formik>
    </section>
  </main>);
}

export default Main;
