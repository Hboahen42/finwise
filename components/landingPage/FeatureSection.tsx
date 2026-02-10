import React from 'react'
import FeatureCard from "@/components/landingPage/FeatureCard";
import {Bell, Clock, CreditCard, PieChart, Shield, TrendingUp} from "lucide-react";

const FeatureSection = () => {
    return (
        <div className="border-t border-white/6 bg-[#0a0a0d] px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl text-white sm:text-[42px] animate-fade-up">
                        Everything you need to manage your money
                    </h2>
                    <p className="mt-4 text-base text-zinc-500 animate-fade-up anim-delay-1">
                        Powerful features to help you understand and optimize your finances
                    </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                    {/* Feature 1 */}
                    <FeatureCard
                        icon={<CreditCard size={18} className="text-blue-400"/>}
                        iconBg={"rgba(59,130,246,0.12)"}
                        title={"Connect Your Accounts"}
                        description={"Securely link your bank accounts and credit cards with bank-level encryption"}
                        delay={"anim-delay-1"}
                    />

                    {/* Feature 2 */}
                    <FeatureCard
                        icon={<TrendingUp size={18} className="text-emerald-400"/>}
                        iconBg={"rgba(52,211,153,0.1)"}
                        title={"Track Spending"}
                        description={"Automatically categorize transactions and see where your money goes"}
                        delay={"anim-delay-2"}
                    />

                    {/* Feature 3 */}
                    <FeatureCard
                        icon={<PieChart size={18} className="text-violet-400"/>}
                        iconBg={"rgba(167,139,250,0.1)"}
                        title={"Financial Insights"}
                        description={"Get personalized insights and visualizations of your financial health"}
                        delay={"anim-delay-3"}
                    />

                    {/* Feature 4 */}
                    <FeatureCard
                        icon={<Shield size={18} className="text-teal-400"/>}
                        iconBg={"rgba(20,184,166,0.12)"}
                        title={"Secure & Private"}
                        description={"Your data is encrypted and protected with industry-leading security"}
                        delay={"anim-delay-4"}
                    />

                    {/* Feature 5 */}
                    <FeatureCard
                        icon={<Clock size={18} className="text-amber-400"/>}
                        iconBg={"rgba(251,191,36,0.1)"}
                        title={"Real-Time Updates"}
                        description={"Stay up-to-date with instant notifications for all your transactions"}
                        delay={"anim-delay-5"}
                    />

                    {/* Feature 6 */}
                    <FeatureCard
                        icon={<Bell size={18} className="text-pick-400"/>}
                        iconBg={"rgba(244,114,182,0.1)"}
                        title={"Budget Friendly"}
                        description={"Set budgets and get alerts when you're close to your limits"}
                        delay={"anim-delay-6"}
                    />

                </div>
            </div>
        </div>
    )
}
export default FeatureSection
