import { cubicBezier } from "framer-motion";

export const transition1 = {
  duration: 0.5,
  ease: cubicBezier(0.5, 0.01, 0.05, 0.5), // ✅ Type-safe
};
