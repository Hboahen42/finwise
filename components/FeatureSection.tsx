import React from 'react'
import FeatureCard from "@/components/FeatureCard";
import {Bell, Clock, CreditCard, PieChart, Shield, TrendingUp} from "lucide-react";

const FeatureSection = () => {
    return (
        <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-20 dark:border-zinc-800 dark:bg-zinc-900 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                        Everything you need to manager your money
                    </h2>
                    <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                        Powerful features to help you understand and optimize your finances
                    </p>
                </div>
                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {/* Feature 1 */}
                    <FeatureCard
                        icon={<CreditCard />}
                        title={"Connect Your Accounts"}
                        description={"Securely link your bank accounts and credit cards with bank-level encryption"}
                    />

                    {/* Feature 2 */}
                    <FeatureCard
                        icon={<TrendingUp />}
                        title={"Track Spending"}
                        description={"Automatically categorize transactions and see where your money goes"}
                    />

                    {/* Feature 3 */}
                    <FeatureCard
                        icon={<PieChart />}
                        title={"Financial Insights"}
                        description={"Get personalized insights and visualizations of your financial health"}
                    />

                    {/* Feature 4 */}
                    <FeatureCard
                        icon={<Shield />}
                        title={"Secure & Private"}
                        description={"Your data is encrypted and protected with industry-leading security"}
                    />

                    {/* Feature 5 */}
                    <FeatureCard
                        icon={<Clock />}
                        title={"Real-Time Updates"}
                        description={"Stay up-to-date with instant notifications for all your transactions"}
                    />

                    {/* Feature 6 */}
                    <FeatureCard
                        icon={<Bell />}
                        title={"Budget Friendly"}
                        description={"Set budgets and gets alerts when you're close to your limits"}
                    />

                </div>
            </div>
        </div>
    )
}
export default FeatureSection
