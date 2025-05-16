"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { verifyTOTP } from "@/lib/auth";
import Header from "@/components/Header";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const { isLoggedIn, login, loading: authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && isLoggedIn) {
            router.push("/dashboard");
        }
    }, [authLoading, isLoggedIn, router]);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        if (!email || !code || code.length !== 6) {
            alert("이메일과 6자리 OTP 코드를 정확히 입력해주세요.");
            return;
        }

        try {
            setLoading(true);
            const token = await verifyTOTP(email, code);
            login(token);
        } catch (err) {
            alert("로그인 실패: " + (err as Error).message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Header title="로그인" />

            <form onSubmit={handleLogin} className="space-y-6 w-full">
                <div className="grid gap-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="code">OTP Code</Label>
                    <Input
                        id="code"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="123456"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "로그인 중..." : "로그인"}
                </Button>
            </form>
        </>
    );
}
