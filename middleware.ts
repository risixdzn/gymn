import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    //HANDLER NOTIFICAÇÃO DE CONTA VERIFICADA
    //o middleware vericica se o pathname é o de verificação
    if (req.nextUrl.pathname.startsWith("/dashboard/profile/verify")) {
        //envia o redirect para a home
        const response = NextResponse.rewrite(new URL("/", req.url));
        //seta um cookie que será consumido pelo alerta de verificação, e em seguida deletado.
        response.headers.set(
            "Set-Cookie",
            `VerificationSuccessAlertOpen=true; Max-Age=${60 * 6 * 24}`
        );
        return response;
    }

    //Fetch Session
    const supabase = createMiddlewareClient({ req, res });
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    //HANDLER PROTECTED ROUTES
    if (!session) {
        const callbackUrl = encodeURIComponent(req.url); // Encode the URL that the user tried to access unauthenticated
        const authURL = `/auth?callbackUrl=${callbackUrl}`;
        const response = NextResponse.redirect(new URL(authURL, req.url)); //redirect to /auth, with the callback being the requrl
        response.headers.set(
            "Set-Cookie",
            `UnauthorizedAction=true; Max-Age=${60 * 6 * 24}; Path=/`
        );
        // By adding Path=/ to the cookie definition, you ensure that
        //the "UnauthorizedAction" cookie is available for all subpaths under the root path.
        // This should make the unauthorized alert work correctly on nested protected routes.
        if (new URL(req.url).pathname.startsWith("/api")) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }
        return response;
    }

    return res;
}

export const config = {
    matcher: ["/dashboard/:path*", "/api/:path*"],
};
