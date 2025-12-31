import styles from "@/styles/Contact.module.scss";
import { SmoothScrollContext } from "@/SmoothScroll.context";
import SmallStar from "@/components/SmallStar";
import { useContext } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

function Contact() {
  const { scroll } = useContext(SmoothScrollContext);

  const goToTop = (event) => {
    event.preventDefault();
    scroll && scroll.scrollTo(0);
  };

  return (
    <section
      data-scroll-section
      className={styles.contact}
      id="contact-section"
    >
      <SmallStar
        className={styles.contactStar}
        delay={0.3}
        position={{ x: "15%", y: "70%" }}
      />
      <SmallStar
        className={styles.contactStar}
        delay={0.7}
        position={{ x: "78%", y: "20%" }}
      />
      <div className={styles.main}>
        <p className={styles.headline}>
          Interested In <br /> Working Together?
        </p>
        <p className={styles.drop}>Drop me an email</p>
        <a href="mailto:wassimfekih2@gmail.com" className={styles.email}>
          wassimfekih2@gmail.com
        </a>
      </div>
      <div className={styles.left}>
        <p>Made with 🤍🤍</p>
        <p>Developed by Wassim Fekih</p>
      </div>
      <div className={styles.right}>
        <p onClick={goToTop}>
          back to top &nbsp; <AiOutlineArrowUp />
        </p>
        <p>2023 - All Rights Reserved</p>
      </div>
      <div className={styles.buttons}>
        <a
          href="
            https://www.linkedin.com/in/wassimfekih/
          "
          target="_blank"
          className={styles.button}
        >
          LINKEDIN
        </a>
        <a
          href="
           https://github.com/Epherum
          "
          target="_blank"
          className={styles.button}
        >
          GITHUB
        </a>
        <a
          className={styles.button}
          href="/Wassim Fekih Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          RESUME
        </a>
      </div>
    </section>
  );
}

export default Contact;
