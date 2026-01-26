'use client'

import {useForm} from "react-hook-form";
import InputField from "@/components/forms/InputField";
import {Button} from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";

const signIn = () => {
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
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <div className="container">
                <h1 className="form-title">Welcome Back</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* INPUTS */}

                    <InputField
                        name="email"
                        label="Email"
                        placeholder="johndoe@email.com"
                        register={register}
                        error={errors.email}
                        validation={{ required: 'Email is required', pattern: /^\w+@\w+\.\w+$/, message: 'Email address is required' }}
                    />

                    <InputField
                        name="password"
                        label="Pasword"
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
