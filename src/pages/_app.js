import { useEffect, useRef } from "react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(false);

  useEffect(() => {
    mouseRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    ringPosRef.current = { ...mouseRef.current };

    const onMove = (event) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        document.body.classList.add("cursor-visible");
      }
    };

    const getCursorMode = (node) => {
      if (!node) return null;
      const elementNode = node.nodeType === 3 ? node.parentElement : node;
      if (!elementNode || !elementNode.closest) return null;
      const withMode = elementNode.closest("[data-cursor]");
      if (withMode) return withMode.getAttribute("data-cursor");
      if (elementNode.closest("a, button")) return "ui";
      return null;
    };

    const setCursorMode = (mode) => {
      document.body.classList.remove(
        "cursor-hover-media",
        "cursor-hover-ui",
        "cursor-hover-nav"
      );
      if (mode) {
        document.body.classList.add(`cursor-hover-${mode}`);
      }
    };

    const onPointerOver = (event) => {
      const mode = getCursorMode(event.target);
      if (mode) setCursorMode(mode);
    };

    const onPointerOut = (event) => {
      const fromMode = getCursorMode(event.target);
      const toMode = getCursorMode(event.relatedTarget);
      if (fromMode && !toMode) {
        setCursorMode(null);
      } else if (toMode && fromMode !== toMode) {
        setCursorMode(toMode);
      }
    };

    const tick = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      const { x, y } = mouseRef.current;
      const ringPos = ringPosRef.current;

      ringPos.x += (x - ringPos.x) * 0.1;
      ringPos.y += (y - ringPos.y) * 0.1;

      if (dot) {
        dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (ring) {
        ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <main>
      <Component />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true">
        <span className="cursor-text">visit ↗</span>
        <span className="cursor-arrow">↗</span>
      </div>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true"></div>
    </main>
  );
}
