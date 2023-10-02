export function useGetRouteName(pathname: string) {
    const splittedPathname = pathname.split("/");
    //running shift twice to remove "" and "/" from the splitted pathname array (index 1 & 2)
    for (let index = 0; index < 2; index++) {
        splittedPathname.shift();
    }
    const Route = splittedPathname[0];

    return Route;
}

export function useGetPathnameArray(pathname: string) {
    return pathname.split("/");
}
