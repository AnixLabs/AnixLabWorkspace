import { Shimmer } from "./Shimmer";

const COLUMN_PATTERNS: number[][] = [
  [1.42, 0.75, 1.2, 1.6, 0.8, 1.35, 1.0], // col 0
  [0.8, 1.55, 1.1, 0.7, 1.45, 0.9, 1.3], // col 1
  [1.3, 0.85, 1.5, 1.0, 0.72, 1.4, 1.15], // col 2
  [0.7, 1.4, 0.9, 1.6, 1.1, 0.8, 1.35], // col 3
  [1.5, 0.75, 1.2, 0.9, 1.55, 1.0, 0.85], // col 4
  [0.85, 1.45, 1.0, 1.3, 0.8, 1.5, 1.1], // col 5
];

interface MasonrySkeletonProps {
  rowsPerColumn?: number;
}

export function MasonrySkeleton({ rowsPerColumn = 5 }: MasonrySkeletonProps) {
  return (
    <div className="w-full pt-4">
      <ColumnGrid cols={1} rowsPerColumn={rowsPerColumn} className="grid min-[24rem]:hidden" />
      <ColumnGrid
        cols={2}
        rowsPerColumn={rowsPerColumn}
        className="hidden min-[24rem]:grid sm:hidden"
      />
      <ColumnGrid cols={3} rowsPerColumn={rowsPerColumn} className="hidden sm:grid md:hidden" />
      <ColumnGrid cols={4} rowsPerColumn={rowsPerColumn} className="hidden md:grid lg:hidden" />
      <ColumnGrid cols={5} rowsPerColumn={rowsPerColumn} className="hidden lg:grid" />
    </div>
  );
}

function ColumnGrid({
  cols,
  rowsPerColumn,
  className,
}: {
  cols: number;
  rowsPerColumn: number;
  className: string;
}) {
  return (
    <div
      className={`${className} gap-3`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: cols }, (_, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-3">
          {Array.from({ length: rowsPerColumn }, (_, rowIdx) => {
            const pattern = COLUMN_PATTERNS[colIdx % COLUMN_PATTERNS.length]!;
            const ratio = pattern[rowIdx % pattern.length]!;
            return (
              <Shimmer
                key={rowIdx}
                className="w-full rounded-2xl"
                style={{ paddingBottom: `${ratio * 100}%` }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
