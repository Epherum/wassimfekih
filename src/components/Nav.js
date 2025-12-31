import { motion } from "framer-motion";
import styles from "@/styles/Nav.module.scss";
import { SmoothScrollContext } from "@/SmoothScroll.context";
import { useContext, useEffect, useRef, useState } from "react";
import { FaArrowDown } from "react-icons/fa";

function Nav({ isReady = false }) {
  const { scroll } = useContext(SmoothScrollContext);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const currentY = window.scrollY || 0;
      const delta = currentY - lastScrollY.current;

      if (currentY <= 10) {
        setIsHidden(false);
      } else if (Math.abs(delta) > 6) {
        setIsHidden(delta > 0);
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    lastScrollY.current = window.scrollY || 0;
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goToAbout = (event) => {
    event.preventDefault();
    if (scroll) {
      scroll.scrollTo("#about-section");
    } else {
      document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToProjects = (event) => {
    event.preventDefault();
    if (scroll) {
      scroll.scrollTo("#projects-section");
    } else {
      document.getElementById("projects-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToContact = (event) => {
    event.preventDefault();
    if (scroll) {
      scroll.scrollTo("#contact-section");
    } else {
      document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToTop = (event) => {
    event.preventDefault();
    if (scroll) {
      scroll.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
    <nav className={`${styles.nav} ${isHidden ? styles.hidden : ""}`}>
      <ul className={styles.leftNav}>
        <motion.li
          variants={navItemVariants}
          initial="hidden"
          animate={isReady ? "visible" : "hidden"}
        >
          <a onClick={goToTop} href="/" className={styles.logo} data-cursor="nav">
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
          <a
            href="mailto:wassimfekih2@gmail.com"
            className={styles.request}
            data-cursor="nav"
          >
            send a request
          </a>
        </motion.li>
      </ul>
      <motion.p
        className={styles.wassim}
        variants={navVariants}
        initial="hidden"
        animate={isReady ? "visible" : "hidden"}
        onClick={goToTop}
        role="button"
        tabIndex={0}
        data-cursor="nav"
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
              data-cursor="nav"
              href={
                item.text === "home"
                  ? "#"
                  : item.text === "about"
                  ? "#about-section"
                  : item.text === "projects"
                  ? "#projects-section"
                  : "#contact-section"
              }
            >
              {item.text}
            </a>
          </motion.li>
        ))}
      </ul>
      <a
        className={styles.projectsMobile}
        onClick={goToProjects}
        data-cursor="nav"
        href="#projects-section"
      >
        projects <FaArrowDown />
      </a>
    </nav>
  );
}

export default Nav;
