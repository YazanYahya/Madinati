import Image from "next/image";
import Link from "next/link";

export function MunicipalityLogo({className = ""}) {
    return (
        <Link href="/" className={`flex items-center gap-2 cursor-pointer ${className}`}>
            <Image
                src="/logo.png"
                alt="Madinati Logo"
                width={200}
                height={500}
                className="h-12 w-auto"
                priority
            />
        </Link>
    );
}