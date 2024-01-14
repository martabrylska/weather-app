import {apiUrl} from "../../config/config";

export const applyUserFilters = async (filtersForm: {
    sort: string,
    country: string,
    mainDesc: string,
}) => {
    try {
        const res = await fetch(`${apiUrl}/city/filter`, {
            method: 'PATCH',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...filtersForm,
            }),
        });
        return res.json();
    } catch (e) {
        return e
    }

}
