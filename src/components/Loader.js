import React, { useEffect, useState, useRef } from "react";
import styles from "@/styles/Loader.module.scss";
import { motion, useAnimation } from "framer-motion";

const letters = ["W", "A", "S", "S", "I", "M"];

const letterVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  bounceRight: {
    y: [0, -17, 0],
    x: [0, 1, 0],
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
  // bounceLeft: {
  //   y: [0, -17, 0],
  //   x: [0, 1, 0],
  //   transition: {
  //     duration: 0.7,
  //     ease: "easeOut",
  //   },
  // },
};

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  bounceRight: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
  bounceLeft: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
      delayChildren: 0.05,
    },
  },
  hide: {
    rotate: 25,
    y: 700,
    transition: {
      delay: 0.5,
      duration: 0.6,
      ease: "easeIn",
    },
  },
};

function Loader({ onFinish }) {
  const animationControls = useAnimation();
  const [isReady, setIsReady] = useState(false);
  const hasFinishedRef = useRef(false);

  const loaderRef = useRef(null);

  useEffect(() => {
    const animate = async () => {
      await animationControls.start("visible");
      await animationControls.start("bounceRight");
      // await animationControls.start("bounceLeft");
    };

    animate();
  }, [animationControls]);

  useEffect(() => {
    document.body.style.backgroundColor = "#111111";
    document.body.classList.add("is-loading");

    let isCancelled = false;
    let loadHandler = null;

    const minDelay = new Promise((resolve) => setTimeout(resolve, 1000));
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const pageLoaded = new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve();
        return;
      }
      loadHandler = () => resolve();
      window.addEventListener("load", loadHandler, { once: true });
    });

    const readiness = Promise.all([fontsReady, pageLoaded, minDelay]);
    const timeoutId = setTimeout(() => {
      if (!isCancelled) {
        setIsReady(true);
      }
    }, 8000);

    readiness.then(() => {
      if (isCancelled) return;
      clearTimeout(timeoutId);
      setIsReady(true);
    });

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
      if (loadHandler) {
        window.removeEventListener("load", loadHandler);
      }
      document.body.classList.remove("is-loading");
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const finishLoader = async () => {
      if (hasFinishedRef.current) return;
      hasFinishedRef.current = true;
      document.body.style.backgroundColor = "var(--color-background)";
      document.body.classList.remove("is-loading");
      await animationControls.start("hide");
      if (loaderRef.current) {
        loaderRef.current.style.opacity = 0;
      }
      if (onFinish) {
        onFinish();
      }
    };

    finishLoader();
  }, [isReady, animationControls, onFinish]);

  return (
    <div className={styles.loader} id="loader" ref={loaderRef}>
      <div
        style={{
          overflow: "hidden",
          paddingTop: "2rem",
          display: "inline-block",
        }}
      >
        <motion.div
          initial="hidden"
          animate={animationControls}
          variants={containerVariants}
          className={styles.letters}
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              style={{
                display: "inline-block",
              }}
              variants={letterVariants}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </div>
      <Counter isReady={isReady} />
    </div>
  );
}

export default Loader;

const counterVariants = {
  hidden: { opacity: 0 },
  counterVisible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.5,
      ease: "easeOut",
    },
  },
  counterHide: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Counter = ({ isReady }) => {
  const [count, setCount] = useState(0);
  const animationControls = useAnimation();

  useEffect(() => {
    const animateIn = async () => {
      await animationControls.start("counterVisible");
    };

    animateIn();
  }, [animationControls]);

  useEffect(() => {
    let startTimestamp = null;
    let requestId = null;
    const duration = 5000;

    const easeOutBezier = (x) => 1 - Math.pow(1 - x, 2);

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;

      const elapsedTime = timestamp - startTimestamp;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutBezier(progress);

      if (!isReady) {
        const currentValue = Math.min(95, Math.floor(easedProgress * 95));
        setCount((prev) => Math.max(prev, currentValue));
        if (progress < 1) {
          requestId = requestAnimationFrame(step);
        }
      }
    };

    requestId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(requestId);
  }, [isReady]);

  useEffect(() => {
    if (!isReady) return;
    setCount(100);
    animationControls.start("counterHide");
  }, [isReady, animationControls]);

  return (
    <motion.p
      initial="hidden"
      animate={animationControls}
      variants={counterVariants}
      className={styles.counter}
    >
      {count} %
    </motion.p>
  );
};
