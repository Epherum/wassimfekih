import "swiper/swiper-bundle.min.css";
import styles from "@/styles/Projects.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    name: "NEXEL",
    shortDescription: "Web agency website",
    video: "/Nexel.mp4",
    poster: "/posters/Nexel.jpg",
    site: "https://nexeldigitalstudio.com/",
    code: "https://github.com/Epherum/Nexel",
  },
  {
    name: "MOON DIVINE",
    shortDescription: "Ecommerce website",
    video: "/Moondivine.mp4",
    poster: "/posters/Moondivine.jpg",
    site: "https://wassim-missguided.web.app/",
    code: "https://github.com/Epherum/Missguided",
  },
  {
    name: "ZAPPER",
    shortDescription: "Issue tracking app",
    video: "/Zapper.mp4",
    poster: "/posters/Zapper.jpg",
    site: "https://zapperr.vercel.app/",
    code: "https://github.com/Epherum/Zapper",
  },
];

const titleVariants = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -18,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

function ProjectVideo({ src, title, poster }) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const shouldLoadRef = useRef(shouldLoad);

  useEffect(() => {
    shouldLoadRef.current = shouldLoad;
  }, [shouldLoad]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          if (!shouldLoadRef.current) {
            setShouldLoad(true);
          }

          const playPromise = videoElement.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {});
          }
        } else {
          videoElement.pause();
        }
      },
      {
        root: null,
        rootMargin: "220px 0px",
        threshold: 0.2,
      }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      poster={poster}
      preload={shouldLoad ? "metadata" : "none"}
      autoPlay
      loop
      muted
      playsInline
      disablePictureInPicture
      aria-label={`${title} preview video`}
    />
  );
}

function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const projectRefs = useRef([]);
  const activeNumber = String(activeIndex + 1).padStart(2, "0");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            if (!Number.isNaN(index)) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      }
    );

    projectRefs.current.forEach((panel) => {
      if (panel) {
        observer.observe(panel);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const section = document.getElementById("projects-section");
    if (!section) {
      return undefined;
    }

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        const isActive = entry.isIntersecting;
        document.body.classList.toggle("projects-section-active", isActive);
      },
      {
        root: null,
        threshold: 0.2,
      }
    );

    sectionObserver.observe(section);

    return () => {
      sectionObserver.disconnect();
      document.body.classList.remove("projects-section-active");
    };
  }, []);

  return (
    <section
      data-scroll-section
      id="projects-section"
      className={styles.projects}
    >
      <div className={styles.projectsLayout}>
        <div className={styles.projectTitleColumn}>
          <div className={styles.projectTitleInner}>
            <AnimatePresence mode="wait">
              <motion.h2
                key={activeIndex}
                className={styles.projectIndex}
                variants={titleVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {activeNumber}
              </motion.h2>
            </AnimatePresence>
          </div>
        </div>
        <div className={styles.projectPanels}>
          {projects.map((project, index) => (
            <article
              key={project.name}
              className={styles.projectPanel}
              data-index={index}
              ref={(panel) => {
                projectRefs.current[index] = panel;
              }}
            >
              <div className={styles.projectMedia}>
                <a
                  href={project.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="media"
                >
                  <ProjectVideo
                    src={project.video}
                    title={project.name}
                    poster={project.poster}
                  />
                </a>
              </div>
              <div className={styles.projectMeta}>
                <div className={styles.projectDetails}>
                  <p className={styles.projectDescription}>
                    {project.shortDescription}
                  </p>
                  <p className={styles.projectTitle}>{project.name}</p>
                </div>
                <div className={styles.projectActions}>
                  {project.site ? (
                    <a
                      className={styles.projectLink}
                      href={project.site}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      VISIT SITE
                    </a>
                  ) : null}
                  {project.code ? (
                    <a
                      className={styles.projectLink}
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      VIEW CODE
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
