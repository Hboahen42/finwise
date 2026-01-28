'use client'

import {useForm} from "react-hook-form";
import InputField from "@/components/forms/InputField";
import {Button} from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {authApi} from "@/lib/api";
import {useAuth} from "@/contexts/AuthContext";

const signUp = () => {
    const router = useRouter();
    const { signUp } = useAuth();
    const [apiError, setApiError] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
        mode: "onBlur"
    }, );
    const onSubmit = async (data: SignUpFormData) => {
        try {
            setApiError("");
            await signUp(data.name, data.email, data.password);
            router.push("/dashboard");
        } catch (e) {
            console.error(e);
            setApiError(e instanceof Error ? e.message : "An error occurred");
        }
    }

    return (
        <>
            <div className="container">
                <h1 className="form-title">Sign up</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* API Error Message */}
                    {apiError && (
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
                            {apiError}
                        </div>
                    )}

                    {/* INPUTS */}
                    <InputField
                        name="name"
                        label="Full Name"
                        placeholder="John Doe"
                        register={register}
                        error={errors.name}
                        validation={{
                            required: 'Full name is required',
                            minLength: {
                                value: 2,
                                message: 'Name must be at least 2 characters'
                            }
                        }}
                    />

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
                        validation={{
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters'
                            }
                        }}
                    />

                    <Button type="submit" disabled={isSubmitting} className="blue-btn w-full mt-5">
                        {isSubmitting ? 'Creating account...' : 'Start Your Savings Journey'}
                    </Button>

                    <FooterLink text="Already have an account?" linkText="Sign in" href="/sign-in"/>
                </form>
            </div>
        </>
    )
}
export default signUp
