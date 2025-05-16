"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
            setLoading(false);
            return;
        }

        setToken(jwt);

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then((data) => {
                setUserId(data.user_id);
            })
            .catch(() => {
                localStorage.removeItem("jwt");
                setToken(null);
            })
            .finally(() => setLoading(false));
    }, []);

    const login = useCallback(
        (jwt: string) => {
            localStorage.setItem("jwt", jwt);
            setToken(jwt);
            router.push("/dashboard");
        },
        [router]
    );

    const logout = useCallback(() => {
        localStorage.removeItem("jwt");
        setToken(null);
        setUserId(null);
        router.push("/");
    }, [router]);

    return {
        token,
        userId,
        isLoggedIn: !!token,
        loading,
        login,
        logout,
    };
}
