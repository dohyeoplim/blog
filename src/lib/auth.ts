const API = process.env.NEXT_PUBLIC_API_URL;

export async function verifyTOTP(
    email: string,
    token: string
): Promise<string> {
    const res = await fetch(`${API}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
    });

    if (!res.ok) throw new Error("Invalid token");
    const data = await res.json();
    return data.token;
}
