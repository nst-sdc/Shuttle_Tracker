import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/utils";

function Dock({
  children,
  className,
  distance = 140,
  magnification = 60,
  baseItemSize = 50,
}) {
  const mouseX = useMotionValue(Infinity);

  const renderChildren = useMemo(() => {
    return Children.map(children, (child) => {
      return cloneElement(child, {
        mouseX: mouseX,
        distance: distance,
        magnification: magnification,
        baseItemSize: baseItemSize,
      });
    });
  }, [children, mouseX, distance, magnification, baseItemSize]);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-[58px] w-max items-end gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 px-2 pb-3 dark:border-neutral-800 dark:bg-neutral-900",
        className,
      )}
    >
      {renderChildren}
    </motion.div>
  );
}

function DockIcon({
  size,
  magnification = 60,
  distance = 140,
  mouseX,
  className,
  children,
  baseItemSize = 50,
  ...props
}) {
  const ref = useRef(null);

  const distanceCalc = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize],
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { Dock, DockIcon };
