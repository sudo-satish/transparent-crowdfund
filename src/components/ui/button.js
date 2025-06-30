import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Button = forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                {
                    "bg-indigo-600 text-white hover:bg-indigo-700": variant === "default",
                    "bg-transparent hover:bg-gray-100": variant === "ghost",
                    "bg-gray-100 text-gray-900 hover:bg-gray-200": variant === "secondary",
                    "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50": variant === "outline",
                    "h-10 px-4 py-2": size === "default",
                    "h-9 px-3": size === "sm",
                    "h-11 px-8": size === "lg",
                },
                className
            )}
            ref={ref}
            {...props}
        />
    );
});

Button.displayName = "Button";

export { Button }; 