import { motion } from "framer-motion";
import styles from "@/styles/Nav.module.scss";
import { SmoothScrollContext } from "@/SmoothScroll.context";
import { useContext } from "react";
import { FaArrowDown } from "react-icons/fa";

function Nav({ isReady = false }) {
  const { scroll } = useContext(SmoothScrollContext);

  const goToAbout = (event) => {
    event.preventDefault();
    scroll && scroll.scrollTo("#about-section");
  };

  const goToProjects = (event) => {
    event.preventDefault();
    scroll && scroll.scrollTo("#projects-section");
  };

  const goToContact = (event) => {
    event.preventDefault();
    scroll && scroll.scrollTo("#contact-section");
  };

  const goToTop = (event) => {
    event.preventDefault();
    scroll && scroll.scrollTo(0);
  };

  const navItems = [
    { text: "home" },
    { text: "projects" },
    { text: "about" },
    { text: "contact" },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.leftNav}>
        <motion.li
          variants={navItemVariants}
          initial="hidden"
          animate={isReady ? "visible" : "hidden"}
        >
          <a onClick={goToTop} href="/" className={styles.logo}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Logo"
            >
              <path
                d="M29.3784 1H2.62162C2.19154 1 1.77907 1.17085 1.47496 1.47496C1.17085 1.77907 1 2.19154 1 2.62162V29.3784C1 29.8085 1.17085 30.2209 1.47496 30.525C1.77907 30.8292 2.19154 31 2.62162 31H29.3784C29.8085 31 30.2209 30.8292 30.525 30.525C30.8292 30.2209 31 29.8085 31 29.3784V2.62162C31 2.19154 30.8292 1.77907 30.525 1.47496C30.2209 1.17085 29.8085 1 29.3784 1Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23.4389 10.0258L19.7189 21.9739L15.9997 10.0258L12.2805 21.9739L8.56055 10.0258"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.li>
        <motion.li
          variants={navItemVariants}
          initial="hidden"
          animate={isReady ? "visible" : "hidden"}
        >
          <button onClick={goToContact} className={styles.request}>
            send a request
          </button>
        </motion.li>
      </ul>
      <motion.p
        className={styles.wassim}
        variants={navVariants}
        initial="hidden"
        animate={isReady ? "visible" : "hidden"}
      >
        WASSIM
      </motion.p>
      <ul className={styles.rightNav}>
        {navItems.map((item, index) => (
          <motion.li
            key={index}
            variants={navItemVariants}
            initial="hidden"
            animate={isReady ? "visible" : "hidden"}
            transition={{ delay: index * 0.07, ease: "easeOut", duration: 0.6 }}
          >
            <a
              onClick={
                item.text === "home"
                  ? goToTop
                  : item.text === "about"
                  ? goToAbout
                  : item.text === "projects"
                  ? goToProjects
                  : item.text === "contact"
                  ? goToContact
                  : null
              }
              className={styles.link}
              id={item.text}
            >
              {item.text}
            </a>
          </motion.li>
        ))}
      </ul>
      <a className={styles.projectsMobile} onClick={goToProjects}>
        projects <FaArrowDown />
      </a>
    </nav>
  );
}

export default Nav;
