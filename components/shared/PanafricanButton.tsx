import React from 'react';
import { Button,type  buttonVariants, } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import DashedBorder from './DashedBorder';
import type{ VariantProps } from 'class-variance-authority';

interface PanafricanButtonProps
    extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
    dashArray?: string;
    borderRadius?: number;
    dashedBorderClassName?: string;
    strokeWidth?: number;
    animated?: boolean;
    animateOnHover?: boolean;
    animationDuration?: number;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'tertiary' | 'sepia' | 'ghost' | 'link';
    size?: 'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg';
}

const PanafricanButton = React.forwardRef<HTMLButtonElement, PanafricanButtonProps>(
    ({
        className,
        variant = 'default',
        size = 'default',
        dashArray = '5 5',
        borderRadius = 8,
        dashedBorderClassName,
        animated = false,
        animateOnHover = false,
        animationDuration = 2,
        strokeWidth = 1,
        children,
        ...props
    }, ref) => {
        return (
            <DashedBorder
                dashArray={dashArray}
                borderRadius={borderRadius}
                strokeWidth={strokeWidth}
                strokeColor="panafrican"
                animated={animated}
                animateOnHover={animateOnHover}
                animationDuration={animationDuration}
                className={cn('inline-block', dashedBorderClassName)}
            >
                <Button
                    ref={ref}
                    variant={variant}
                    size={size}
                    className={cn('w-full h-full', className)}
                    {...props}
                >
                    {children}
                </Button>
            </DashedBorder>
        );
    }
);

PanafricanButton.displayName = 'PanafricanButton';

export default PanafricanButton;