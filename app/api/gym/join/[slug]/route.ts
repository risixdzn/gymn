import { NextResponse } from "next/server";
import * as z from "zod";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const paramsParser = z.object({
    slug: z
        .string()
        .min(2)
        .max(36)
        .refine((x) => /^[a-zA-Z0-9]{7}$/.test(x)),
});

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    const slug = params.slug;
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    if (slug === null) return new NextResponse("Missing gym referral code.", { status: 400 });

    try {
        paramsParser.parse({ slug });

        const {
            data: { session },
            error,
        } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const userProfile = await supabase
            .from("users")
            .select("profile")
            .eq("id", session?.user?.id);

        //1. validate if the user is a gym owner (cant affiliate himself)
        if (userProfile.data![0].profile === "GymOwner") {
            return NextResponse.json("Unauthorized", { status: 401 });
        }
        //2. validate if the user is not affiliated to any gym
        const afilliateStatus = await supabase
            .from("affiliates")
            .select("*")
            .eq("user_id", session?.user?.id);
        if (afilliateStatus.data?.length !== 0 && afilliateStatus.data![0].verified) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }
        //3. if both pass, affiliate the user to the gym.
        const gymId = await supabase.from("gym").select("id").eq("referral_code", slug);
        if (gymId.data?.length == 0) {
            return NextResponse.json(
                { success: false, error: "Gym doesnt exist" },
                { status: 404 }
            );
        }

        console.log(afilliateStatus.data![0]);

        //5. If the user has an active unverified affiliation, update the table, else, insert.
        if (!afilliateStatus.data![0].verified) {
            console.log("UNVERIFIED VERIFYING");

            console.log(session.user.id);
            const updatedAffiliation = await supabase
                .from("affiliates")
                .update({
                    verified: true,
                })
                .eq("user_id", session.user.id)
                .select();

            if (updatedAffiliation.error) {
                return NextResponse.json(
                    { success: false, error: updatedAffiliation.error },
                    { status: 400 }
                );
            }

            console.log(updatedAffiliation.data);
            //+ Delete any gym invite notification assigned to the user
            const deleteNotifications = await supabase
                .from("notifications")
                .delete()
                .eq("notified_user_id", session.user.id)
                .eq("source_gym_id", gymId.data![0].id)
                .eq("event", "gym_invite");

            if (deleteNotifications.error) {
                return NextResponse.json(
                    { success: false, error: deleteNotifications.error },
                    { status: 400 }
                );
            }

            //return res
            const response = NextResponse.redirect(new URL("/dashboard/gym", req.url));
            response.headers.set(
                "Set-Cookie",
                `JoinGymSuccess=true; Max-Age=${60 * 6 * 24}; Path=/`
            );
            return response;
        }

        const createdAffiliation = await supabase.from("affiliates").insert({
            user_id: session.user.id,
            belongs_to: gymId.data![0].id,
            verified: true,
        });

        if (createdAffiliation.error) {
            return NextResponse.json(
                { success: false, error: createdAffiliation.error },
                { status: 400 }
            );
        }

        //return res
        const response = NextResponse.redirect(new URL("/dashboard/gym", req.url));
        response.headers.set("Set-Cookie", `JoinGymSuccess=true; Max-Age=${60 * 6 * 24}; Path=/`);
        return response;
    } catch (error) {
        // Handle validation error
        return NextResponse.json("Invalid referral code.", { status: 400 });
    }
}

export async function POST(req: Request, { params }: { params: { slug: string } }) {
    const slug = params.slug;
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    if (slug === null) return new NextResponse("Missing gym referral code.", { status: 400 });

    try {
        paramsParser.parse({ slug });

        const {
            data: { session },
            error,
        } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const userProfile = await supabase
            .from("users")
            .select("profile")
            .eq("id", session?.user?.id);

        //1. validate if the user is a gym owner (cant affiliate himself)
        if (userProfile.data![0].profile === "GymOwner") {
            return NextResponse.json("Unauthorized", { status: 401 });
        }
        //2. validate if the user is not affiliated to any gym
        const afilliateStatus = await supabase
            .from("affiliates")
            .select("*")
            .eq("user_id", session?.user?.id);
        if (afilliateStatus.data?.length !== 0) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }
        //3. if both pass, affiliate the user to the gym.
        const gymId = await supabase.from("gym").select("id").eq("referral_code", slug);
        if (gymId.data?.length == 0) {
            return NextResponse.json(
                { success: false, error: "Gym doesnt exist" },
                { status: 404 }
            );
        }

        const createdAffiliation = await supabase.from("affiliates").insert({
            user_id: session.user.id,
            belongs_to: gymId.data![0].id,
            verified: true,
        });

        if (createdAffiliation.error) {
            return NextResponse.json(
                { success: false, error: createdAffiliation.error },
                { status: 400 }
            );
        }

        const response = NextResponse.redirect(new URL("/dashboard/gym", req.url));
        return response;
    } catch (error) {
        // Handle validation error
        return NextResponse.json("Invalid referral code.", { status: 400 });
    }
}
