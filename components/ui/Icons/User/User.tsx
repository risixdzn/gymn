import { SVGProps } from "react";

export const UserIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width='800px'
        height='800px'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
    >
        <path
            d='M20,21V19a4,4,0,0,0-4-4H8a4,4,0,0,0-4,4v2'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
        />

        <circle
            cx='12'
            cy='7'
            r='4'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
        />
    </svg>
);
