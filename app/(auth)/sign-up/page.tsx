'use client'

import {useForm} from "react-hook-form";
import InputField from "@/components/forms/InputField";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useAuth} from "@/contexts/AuthContext";
import BackgroundImage from "@/components/BackgroundImage";
import Link from "next/link";

const SignUp = () => {
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
    },);
    const onSubmit = async (data: SignUpFormData) => {
        try {
            setApiError("");
            await signUp(data.name, data.email, data.password);
            router.push("/dashboard");
        } catch (e) {
            console.error(e);
            setApiError(e instanceof Error ? e.message : "An error occurred while signing up");
        }
    }

    return (
        <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
            {/* Background Image and Overlay */}
            <BackgroundImage />

            {/* Centered Content */}
            <div className="relative z-10 flex flex-col items-center gap-7 w-full max-w-2xl px-12 py-12 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col items-center">
                    <div className="pb-6">
                        <Link href="/" className="text-2xl font-bold text-zinc-50 leading-8">
                            FinWise
                        </Link>
                    </div>
                    <div className="pb-2">
                        <h1 className="text-3xl font-bold text-zinc-50 leading-9">
                            Create Your Account
                        </h1>
                    </div>
                    <div className="px-1 py-2">
                        <p className="text-sm font-medium text-zinc-400 leading-5">
                            Get started with FinWise today
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="w-full bg-zinc-950 rounded-2xl shadow-lg px-9 py-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        {/* API Error Message */}
                        {apiError && (
                            <div className="rounded-md text-sm py-3 text-red-400 bg-red-900/20">
                                {apiError}
                            </div>
                        )}

                        <InputField
                            name="name"
                            label="Full Name"
                            placeholder="Enter your name"
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
                            placeholder="Enter your email"
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

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="rounded-md text-sm font-medium leading-5 px-4 py-2 cursor-pointer w-full bg-zinc-50 text-zinc-900 hover:bg-zinc-200">
                                {isSubmitting ? 'Creating account...' : 'Start Your Savings Journey'}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Footer link */}
                <div className="flex items-center gap-1 p-2.5">
                    <p className="text-sm font-medium text-zinc-400 leading-5">
                        Already have an account?
                    </p>
                    <Link
                        href="/sign-in"
                        className="text-sm font-medium leading-5 bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                        Sign In
                    </Link>
                </div>
            </div>

        </section>
    )
}
export default SignUp
