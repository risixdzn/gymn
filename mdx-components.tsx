import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        h1: ({ children }) => (
            <>
                {" "}
                <h1 style={{ fontSize: "3rem" }} className='font-semibold tracking-tight'>
                    {children}
                </h1>
            </>
        ),
        h3: ({ children }) => (
            <h1
                style={{ fontSize: "1.75rem", padding: "10px 0 10px 0" }}
                className='font-semibold tracking-tight'
            >
                {children}
            </h1>
        ),
        p: ({ children }) => (
            <>
                <p>{children}</p>
                <div id='spacer' className='w-full h-5'></div>
            </>
        ),
        a: (props) => (
            <a style={{ color: "#a855f7" }} {...props}>
                {props.children}
            </a>
        ),
        ul: ({ children }) => (
            <ul className='list-disc' style={{ marginLeft: "25px" }}>
                {children}
            </ul>
        ),
        li: ({ children }) => <li className='my-1'>{children}</li>,
        ...components,
    };
}
