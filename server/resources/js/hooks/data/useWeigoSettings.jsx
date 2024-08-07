import { usePage } from "@inertiajs/react";
export const useWeigoSettings = () => {
    const { d_p_weigo_settings } = usePage().props;
    return {
        d_p_weigo_settings,
    };
};
