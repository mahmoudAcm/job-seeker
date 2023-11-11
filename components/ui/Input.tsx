import { forwardRef, ComponentPropsWithRef } from 'react';
import { cn } from '@/src/utils/cn';

interface InputProps extends ComponentPropsWithRef<'input'> {
  errorMessage?: string;
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>(({ errorMessage, ...props }, ref) => {
  return (
    <div className='grid gap-[0.5rem]'>
      <input
        autoComplete='off'
        {...props}
        ref={ref}
        className={cn(
          'px-[57.9px] py-[22.06px] rounded-[80px] bg-[#F5F5FFB8] placeholder:text-[#464648] placeholder:opacity-1 text-[1rem] leading-[24px] shrink-0',
          { 'border border-red-500 outline-none': !!errorMessage },
          props.className
        )}
      />
      {!!errorMessage && <p className='ml-[57.9px] text-xs text-red-500'>{errorMessage}</p>}
    </div>
  );
});

export default Input;
