import React, { useState, useEffect, useRef, useContext } from "react";
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import emailjs from 'emailjs-com';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import scrollTo from 'gatsby-plugin-smoothscroll';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowRight, faLeaf, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faReact, faHtml5, faCss3Alt, faJs, faNode, faDocker, faGitAlt } from '@fortawesome/free-brands-svg-icons';
import TypeWriterEffect from 'react-typewriter-effect';

//Context
import AppContext from '../context/App.context';

//Components
import Project from '../components/Project';
import TextSuccess from '../components/TextSuccess';

//Styles
import * as mainStyles from '../styles/main.module.scss';

const Main = ({ }) => {

  const {
    handleErrorMessage,
    handleContactFormSending,
    contactFormSending,
  } = useContext(AppContext);

  const [bouncyBallPosition, setbouncyBallPosition] = useState(0);
  const aboutSpanFirst = useRef(null);
  const aboutSpanSecond = useRef(null);
  const [aboutSpanFirstPosition, setaboutSpanFirstPosition] = useState(0);
  const [aboutSpanSecondPosition, setaboutSpanSecondPosition] = useState(0);
  const [formButton, setformButton] = useState(faArrowRight);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const bouncyBallPosition = -window.pageYOffset / 10;
      setbouncyBallPosition(bouncyBallPosition);
      const spanFirstPosition = -(window.pageYOffset - aboutSpanFirst.current.offsetTop) / 20 + 12;
      setaboutSpanFirstPosition(spanFirstPosition);
      const spanSecondPosition = -(window.pageYOffset - aboutSpanSecond.current.offsetTop) / 20 + 28;
      setaboutSpanSecondPosition(spanSecondPosition);
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

      const { id, projectName, liveLink, githubLink } = project.node;
      const projectScreen = getImage(project.node.projectScreen);
      const alt = project.node.projectScreen.title;
      const props = { id, projectName, liveLink, githubLink, projectScreen, alt };

      return (
        <Project {...props} key={id} />
      )
    })
    return projectsElements
  }

  const contactFormSchema = Yup.object().shape({
    name: Yup.string().min(4, "Name must be minimum 4 characters.").required('Name is required!'),
    email: Yup.string().email('Invalid email').required('Email is required!'),
    message: Yup.string().min(10, "Message must have minimum 10 characters.").required('Message text is required!'),
  })

  const handleSendEmail = (values, resetFunc) => {
    setformButton(faSpinner);
    emailjs.send('gmail', 'Portfolio', values, `user_qZY7FllS46aSyJuEosQN8`)
      .then((result) => {
        resetFunc();
        handleErrorMessage("We send it!");
        setTimeout(() => {
          handleErrorMessage("");
        }, 5000);
        setformButton(faArrowRight);
        console.log(result.status);
      }, (error) => {
        handleErrorMessage("Something went wrong, try again later :(");
        setTimeout(() => {
          handleErrorMessage("");
        }, 5000);
        setformButton(faArrowRight);
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
        <span>write me</span>
      </button>
    </section>
    <section
      className={mainStyles.secondSection}
      id="about"
    >
      <h1>About</h1>
      <div className={mainStyles.profileImage}>
        <GatsbyImage image={profileImage} alt="profile photo" />
        <div
          className={mainStyles.walkingText}
        >
          <span
            ref={aboutSpanFirst}
            style={{
              top: `${Math.min(Math.max(aboutSpanFirstPosition, -100), 0)}%`,
            }}
          >Hello, it's me! Hello, it's me! Hello, it's me! Hello, it's me!</span>
        </div>
        <div
          className={mainStyles.walkingText}
        >
          <span
            ref={aboutSpanSecond}
            style={{
              left: `${Math.min(Math.max(aboutSpanSecondPosition, -100), 0)}%`,
            }}
          >
            Hello, it's me! Hello, it's me! Hello, it's me! Hello, it's me!
          </span>
        </div>
      </div>
      <article
        className={mainStyles.aboutParagraph}
        id="articleAbout"
      >
        <TypeWriterEffect
          text={`Hi!`}
          cursorColor="rgba(255,255,255,0.8)"
          startDelay={300}
          typeSpeed={20}
          hideCursorAfterText={true}
        />
        <TypeWriterEffect
          text={`My name is Michał Skrzypiec. I live in Kraków and currently working as a junior project menager in road construction industry.`}
          cursorColor="rgba(255,255,255,0.8)"
          startDelay={600}
          typeSpeed={20}
          hideCursorAfterText={true}
        />
        <TypeWriterEffect
          text={`Despite I enjoy my job, I want to move on. For last 2y I was learning frontend technologies and now I'm looking for new opportunities as a full time frontend dev.`}
          cursorColor="rgba(255,255,255,0.8)"
          startDelay={3800}
          typeSpeed={20}
          hideCursorAfterText={true}
        />
        <TypeWriterEffect
          text={`Except coding I'm itch with making a pizza , sushi too and hiking!`}
          cursorColor="rgba(255,255,255,0.8)"
          startDelay={7700}
          typeSpeed={20}
          hideCursorAfterText={true}
        />
      </article>
      <div className={mainStyles.skills}>
        <h1>Technologic stuff</h1>
        <ul>
          <li>
            <FontAwesomeIcon icon={faHtml5} />
            <h2>HTML5</h2>
          </li>
          <li>
            <FontAwesomeIcon icon={faCss3Alt} />
            <h2>CSS3</h2>
          </li>
          <li>
            <FontAwesomeIcon icon={faJs} />
            <h2>JavaScript ES6</h2>
          </li>
          <li>
            <FontAwesomeIcon icon={faReact} />
            <h2>React / CRA / Gatsby</h2>
          </li>
          <li>
            <FontAwesomeIcon icon={faNode} />
            <h2>NodeJS</h2>
          </li>
          <li>
            <FontAwesomeIcon icon={faLeaf} />
            <h2>MongoDB</h2>
          </li>
          <li>
            <FontAwesomeIcon icon={faGitAlt} />
            <h2>GIT</h2>
          </li>
          <li>
            <div>
              <FontAwesomeIcon icon={faDocker} />
            </div>
            <h2>Docker</h2>
          </li>
        </ul>
      </div>
      <h2 className={mainStyles.lastTitle}>
        If you want to see it in action, check my projects below <FontAwesomeIcon icon={faArrowDown} />
      </h2>
    </section>
    <section
      className={mainStyles.thirdSection}
      id="projects"
    >
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
          email: "",
          message: "",
        }}
        validationSchema={contactFormSchema}
        onSubmit={(values, actions) => {
          handleSendEmail(values, () => { actions.resetForm({ name: "", email: "", message: "" }) });
        }}
      >{({ errors, touched }) => (
        <Form className={mainStyles.form}>
          <TextSuccess />
          {errors.name && touched.name ? (<span>{errors.name}</span>) : null}
          {errors.email && touched.email ? (<span>{errors.email}</span>) : null}
          {errors.message && touched.message ? (<span>{errors.message}</span>) : null}
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
            <FontAwesomeIcon icon={formButton} />
          </button>
        </Form>
      )}
      </Formik>
    </section>
  </main>);
}

export default Main;
