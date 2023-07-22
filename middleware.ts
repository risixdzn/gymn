import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    //o middleware vericica se o pathname é o de verificação
    if (request.nextUrl.pathname.startsWith("/account/verify")) {
        //envia o redirect para a home
        const response = NextResponse.rewrite(new URL("/", request.url));
        //seta um cookie que será consumido pelo alerta de verificação, e em seguida deletado.
        response.headers.set(
            "Set-Cookie",
            `VerificationSuccessAlertOpen=true; Max-Age=${60 * 6 * 24}`
        );
        return response;
    }

    return NextResponse.next();
}
