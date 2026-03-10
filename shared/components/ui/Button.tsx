import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { AiOutlineLoading } from "react-icons/ai";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react";
import Image from "next/image";
import type { LinkProps } from "next/link";

interface CommonProps {
  loading?: boolean;
  loadingText?: string;
  loadingSvg?: ReactNode;
  svg?: ReactNode;
  className?: string;
  children?: ReactNode;
}

type ButtonAsButton = { as?: "button" } & CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonAsAnchor = { as?: "a" } & CommonProps & LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonAsLabel = { as?: "label" } & CommonProps & LabelHTMLAttributes<HTMLLabelElement>;

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLabel;

const baseClass = "inline-flex justify-center items-center m-2 py-2.5 px-4 text-white font-bold outline-0 border-0 rounded-md overflow-hidden max-w-xs cursor-pointer transition-all duration-500 bg-theme-450 select-none min-h-8";
const activeClass = "hover:shadow-[inset_3px_3px_10px,inset_-3px_-3px_10px] hover:shadow-theme-600";
const disabledClass = "cursor-not-allowed opacity-75";

function ButtonInner({
  loading,
  loadingText = "Loading...",
  loadingSvg = <AiOutlineLoading className="text-white animate-spin" />,
  svg,
  children,
}: CommonProps) {
  return (
    <span
      className={twMerge(
        "inline-flex justify-center items-center gap-2 whitespace-nowrap transition-all duration-500",
        loading && "[&_svg]:w-4 [&_svg]:h-4",
      )}
    >
      {loading ? (
        <>
          {loadingSvg}
          {loadingText}
        </>
      ) : (
        <>
          {svg}
          {children}
        </>
      )}
    </span>
  );
}

export function Button(props: ButtonProps) {
  const {
    children,
    loading = false,
    loadingText = "Loading...",
    loadingSvg,
    svg,
    className = "",
    ...rest
  } = props;

  const innerProps = { loading, loadingText, loadingSvg, svg, children };
  const isDisabled = loading || ("disabled" in rest && rest.disabled === true);
  const mergedClass = twMerge(baseClass, isDisabled ? disabledClass : activeClass, className);

  if ("href" in rest) {
    const { as: _as, ...linkRest } = rest as ButtonAsAnchor;
    return (
      <Link className={mergedClass} {...linkRest}>
        <ButtonInner {...innerProps} />
      </Link>
    );
  }

  if ("htmlFor" in rest) {
    const { as: _as, ...labelRest } = rest as ButtonAsLabel;
    return (
      <label className={mergedClass} {...labelRest}>
        <ButtonInner {...innerProps} />
      </label>
    );
  }

  const { as: _as, ...buttonRest } = rest as ButtonAsButton;
  return (
    <button className={mergedClass} disabled={isDisabled} {...buttonRest}>
      <ButtonInner {...innerProps} />
    </button>
  );
}

export const IconButton = ({ className, ...props }: ButtonProps) => (
  <Button
    className={twMerge(
      "inline-block shrink-0 bg-transparent rounded-full p-2 m-0 aspect-square hover:shadow-[inset_1px_1px_5px,inset_-1px_-1px_5px] hover:shadow-theme-500/50 text-inherit",
      className,
    )}
    {...props}
  />
);

type CardButtonProps = {
  image: string | URL;
  title: string;
  description: string;
  imageClassName?: string;
  imageWidth?: number;
  imageHeight?: number;
  isNew?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps;

export function CardButton({
  image,
  title,
  description,
  className = "",
  imageClassName = "",
  imageWidth,
  imageHeight,
  isNew,
  ...props
}: CardButtonProps) {
  return (
    <Link
      className={twMerge(
        "w-full relative flex h-full flex-row items-center gap-4 p-4 overflow-hidden hover:scale-102 transition-all",
        "shadow-[0px_3px_10px_rgba(0,0,0,.20),inset_20px_20px_18px_rgba(255,255,255,.9),inset_-20px_-20px_18px_rgba(0,0,0,.07)]",
        "dark:shadow-[inset_20px_20px_18px_rgba(255,255,255,.07),inset_-20px_-20px_18px_rgba(0,0,0,.9)]",
        "hover:shadow-[0px_3px_10px_rgba(0,0,0,.20),inset_20px_20px_18px_rgba(0,0,0,.07),inset_-20px_-20px_18px_rgba(255,255,255,.9)]",
        "dark:hover:shadow-[0px_-1px_10px_rgba(255,255,255,.10),inset_20px_20px_18px_rgba(0,0,0,.9),inset_-20px_-20px_18px_rgba(255,255,255,.07)]",
        className,
      )}
      {...props}
    >
      {isNew && (
        <div className="absolute z-10 top-0 left-0 w-10 aspect-square grid place-items-center">
          <div className="absolute -rotate-45 bg-linear-to-r from-red-600 to-red-500 text-white font-bold text-[10px] px-8 py-0.5 text-center ring-2 ring-red-600 border border-white shadow-md">
            NEW
          </div>
        </div>
      )}
      {image && (
        <div
          className={twMerge(
            "w-1/4 max-w-24 aspect-square shrink-0 flex items-center justify-center overflow-hidden",
            imageClassName,
          )}
        >
          <Image
            src={image.toString()}
            alt={title || "Feature Image"}
            width={imageWidth ?? 96}
            height={imageHeight ?? 96}
            className="object-contain w-full h-full"
          />
        </div>
      )}
      <div className="text-left">
        {title && <h3 className="text-xl md:text-2xl font-semibold mb-2">{title}</h3>}
        {description && <p className="text-sm text-gray-700 dark:text-gray-200">{description}</p>}
      </div>
    </Link>
  );
}