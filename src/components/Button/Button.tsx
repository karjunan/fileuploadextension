import React from 'react';

import cn from './Button.module.css';

export function Button({
  className,
  ...props
}: React.ComponentProps<'button'>) {
  return <button className={`${cn.button} ${className}`} {...props} />;
}
