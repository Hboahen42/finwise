import Image from 'next/image'

const BackgroundImage = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Image
                src="/assets/images/rotated-hero-bg.jpg"
                alt="Financial background"
                fill={true}
                className="object-cover lg:hidden"
                priority
                quality={100}
            />
            <Image
                src="/assets/images/hero-bg.jpg"
                alt="Financial background"
                fill={true}
                className="object-cover hidden lg:block"
                priority
                quality={100}
            />
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-[#0a0a0d]/60"/>
            {/* Bottom fade effect */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#0a0a0d] to-transparent z-10 pointer-events-none"/>
        </div>

    )
}
export default BackgroundImage
