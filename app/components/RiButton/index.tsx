import { Link } from '@remix-run/react';
import css from './index.module.css';

export default function RiButton({
  children,
  className,
  style,
  href,
}: {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  href: string;
}) {
  return (
    <Link className={`${css.button} ${className}`} to={href} style={style}>
      {children}
    </Link>
  );
}
