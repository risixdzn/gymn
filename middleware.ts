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

    //HANDLER PROTECTED ROUTES
    const supabase = createMiddlewareClient({ req, res });

    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    return res;
}

export const config = {
    matcher: "/dashboard/:path*",
};
