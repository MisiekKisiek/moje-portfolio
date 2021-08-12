import React, { useRef } from "react";
import { useStaticQuery, graphql} from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Formik, Field, Form } from 'formik';
import emailjs from 'emailjs-com';

//Components


//Styles
import * as mainStyles from '../styles/main.module.scss';

//Tools
import { wordShow } from '../tools/tools';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';

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

  const handleSendForm = (values) => {
    emailjs.sendForm('gmail', 'PortfolioTemplate', values, process.env.EMAILJS_USER_ID)
      .then((result) => {
        console.log("ok")
      }, (error) => {
        console.log(error)
      });
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
        <FontAwesomeIcon icon={faArrowDown}/>
      </h1>
      <Formik
        initialValues={{
          name: "gsdag",
          email: "gsag@fsaf.pl",
          message: "gsagas",
        }}
        onSubmit={async (values)=>{
          handleSendForm(values);
        }}
      >
        <Form className={mainStyles.form}>
          <label htmlFor="message"></label>
          <Field as='textarea' id="message" name='message' placeholder="message"/>
          <label htmlFor="email"></label>
          <Field id="email" name="email" placeholder="e-mail" type="email" autoComplete="off"/>
          <label htmlFor="name"></label>
          <Field id="name" name="name" placeholder="name" type="name" autoComplete="off"/>
          <button type="submit">
           <FontAwesomeIcon icon={faArrowRight}/>
          </button>
        </Form>
      </Formik>
      
    </section>
  </main>);
}

export default Main;
