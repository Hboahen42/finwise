import React from "react";

declare global {
    type SignInFormData = {
        email: string;
        password: string;
    }

    type SignUpFormData = {
        name: string;
        email: string;
        password: string;
    }

    type FormInputProps = {
        name: string;
        label: string;
        placeholder: string;
        type?: string;
        register: UseFormRegister;
        error?: FieldError;
        validation?: RegisterOptions;
        disabled?: boolean;
        value?: string;
    }

    type FooterLinkProps = {
        text: string;
        linkText: string;
        href: string;
    }

    type FeatureCardProps = {
        icon: React.ReactNode;
        title: string;
        description: string;
    }

    type AuthResponse = {
        message: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
        }
    }

    type AuthError = {
        error: string;
        details?: string;
        message?: string;
    }
}

export {};