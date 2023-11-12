import { forwardRef, ComponentPropsWithRef } from 'react';
import { cn } from '@/src/utils/cn';

type BaseInputProps = ComponentPropsWithRef<'input'>;

interface InputProps extends Omit<BaseInputProps, 'autoComplete'> {
  errorMessage?: string;
  /*
    @default off
   */
  autoComplete?: BaseInputProps['autoComplete'];
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
          'md:px-[57.9px] py-[22.06px] px-[1rem] rounded-[1rem] md:rounded-[80px] bg-[#F5F5FFB8] placeholder:text-[#464648] placeholder:opacity-1 text-[1rem] leading-[24px] shrink-0',
          { 'border border-red-500 outline-none': !!errorMessage },
          props.className
        )}
      />
      {!!errorMessage && <p className='text-xs text-red-500 md:ml-[57.9px]'>{errorMessage}</p>}
    </div>
  );
});

export default Input;
