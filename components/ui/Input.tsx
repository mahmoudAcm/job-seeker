import { ComponentPropsWithRef } from 'react';
import { cn } from '@/src/utils/cn';

interface InputProps extends ComponentPropsWithRef<'input'> {}

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        'px-[57.9px] py-[22.06px] rounded-[80px] bg-[#F5F5FFB8] placeholder:text-[#464648] placeholder:opacity-1 text-[1rem] leading-[24px] shrink-0',
        props.className
      )}
    />
  );
}
