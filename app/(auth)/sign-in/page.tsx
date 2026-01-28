'use client'

import {useForm} from "react-hook-form";
import InputField from "@/components/forms/InputField";
import {Button} from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {authApi} from "@/lib/api";
import {useAuth} from "@/contexts/AuthContext";

const signIn = () => {
    const router = useRouter();
    const { signIn } = useAuth();
    const [apiError, setApiError] = useState<string>("");
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: "onBlur"
    }, );
    const onSubmit = async (data: SignInFormData) => {
        try {
            setApiError("");
            await signIn(data.email, data.password);
            router.push("/dashboard");

        } catch (e) {
            console.error(e);
            setApiError(e instanceof Error ? e.message : "An error occurred");
        }
    }

    return (
        <>
            <div className="container">
                <h1 className="form-title">Welcome Back</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* API Error Message */}
                    {apiError && (
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">{apiError}</div>
                    )}

                    {/* INPUTS */}
                    <InputField
                        name="email"
                        label="Email"
                        placeholder="johndoe@email.com"
                        register={register}
                        error={errors.email}
                        validation={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email address'
                            }
                        }}
                    />

                    <InputField
                        name="password"
                        label="Password"
                        placeholder="Enter a strong password"
                        type="password"
                        register={register}
                        error={errors.password}
                        validation={{ required: 'Password is required', minLength: 8 }}
                    />

                    <Button type="submit" disabled={isSubmitting} className="blue-btn w-full mt-5">
                        {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </Button>

                    <FooterLink text="Don't have an account?" linkText="Sign up" href="/sign-up"/>
                </form>
            </div>
        </>
    )
}
export default signIn
