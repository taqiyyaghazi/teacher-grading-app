import * as React from 'react';

import { cn } from '@/lib/utils';
import { EyeIcon, EyeOff } from 'lucide-react';

const InputPassword = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const [show, setShow] = React.useState(false);
  const toggleShow = () => setShow((prevState) => !prevState);
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
      {show ? (
        <EyeOff
          className="absolute right-3 top-3 cursor-pointer hover:opacity-50"
          onClick={toggleShow}
        />
      ) : (
        <EyeIcon
          className="absolute right-3 top-2 cursor-pointer hover:opacity-50"
          onClick={toggleShow}
        />
      )}
    </div>
  );
});
InputPassword.displayName = 'InputPassword';

export { InputPassword };
