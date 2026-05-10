import styles from "./Shimmer.module.css";

type ShimmerProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children">;
export function Shimmer({ className = "", ...props }: ShimmerProps) {
  return (
    <div className={`relative overflow-hidden bg-neutral-800/70 ${className}`} {...props}>
      {/* Sweep animation */}
      <div
        className={`absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/6 to-transparent ${styles.skeletonShimmer}`}
      />
    </div>
  );
}
