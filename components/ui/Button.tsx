import { ComponentPropsWithRef } from 'react';
import { cn } from '@/src/utils/cn';

interface ButtonProps extends ComponentPropsWithRef<'button'> {}

export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      style={{ boxShadow: '0px 4px 61px 0px rgba(77, 71, 195, 0.40)', ...props.style }}
      className={cn(
        'bg-[#624BFF] rounded-[50px] text-[clamp(0.875rem,0.768rem_+_0.536vw,1.25rem)] font-[700] leading-[30px] text-white py-[20px] disabled:bg-[#624BFF3D] disabled:cursor-not-allowed hover:bg-[#624BFF99] transition-colors shrink-0 select-none',
        props.className
      )}
    />
  );
}
