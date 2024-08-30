import { Dumbbell } from "lucide-react";
type NotificationTexts = {
    icon: JSX.Element;
    event: string;
    description: string;
    action?: {
        true_text: string;
        false_text: string;
        true: (referral: string) => string;
        false: string;
        false_alert: {
            title: string;
            description: string;
        };
    };
};

function generateGymJoinActionLink(referral: string): string {
    return `/api/gym/join/${referral}`;
}

export const notificationsInfo: { [key: string]: NotificationTexts } = {
    gym_invite: {
        icon: <Dumbbell className='w-6 h-6 text-g_purple' />,
        event: "foi convidado para treinar na",
        description: "Aceite ou negue o convite abaixo.",
        action: {
            true_text: "Aceitar",
            false_text: "Negar",
            true: generateGymJoinActionLink,
            false_alert: {
                title: "Negar convite",
                description:
                    "Ao negar o convite, você não poderá aceitá-lo até ser convidado novamente.",
            },
            false: "",
        },
    },
};
