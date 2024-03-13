import cn from './Input.module.css';

export function Input({
  className,
  ...props
}: React.HTMLProps<HTMLInputElement>) {
  return <input className={`${cn.input} ${className}`} {...props} />;
}
