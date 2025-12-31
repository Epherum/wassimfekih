import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const SmallStar = ({ className, delay = 0, position = {} }) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: 0.2, once: true });

  useEffect(() => {
    if (!inView) return;
    controls.start("spin");
    const timer = setTimeout(() => {
      controls.start("visible");
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [controls, delay, inView]);

  const style = {};
  if (position.x) style["--star-left"] = position.x;
  if (position.y) style["--star-bottom"] = position.y;
  if (position.xTablet) style["--star-left-tablet"] = position.xTablet;
  if (position.yTablet) style["--star-bottom-tablet"] = position.yTablet;
  if (position.xMobile) style["--star-left-mobile"] = position.xMobile;
  if (position.yMobile) style["--star-bottom-mobile"] = position.yMobile;

  return (
    <motion.img
      src="/star.svg"
      alt="small star"
      className={className}
      style={style}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
        spin: {
          rotate: 360,
          transition: {
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
            repeatType: "reverse",
          },
        },
      }}
    />
  );
};

export default SmallStar;
