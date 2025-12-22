import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <a
          href="https://github.com/uz0"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group inline-block hover-link"
        >
          <div className="w-[350px] h-[350px] relative">
            {/* Radial gradient mask container */}
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-white to-transparent opacity-100 z-10"></div>

            {/* Background image */}
            <Image
              src="/Neon_W-Fails_Chemistry_Test_00001_.jpg"
              alt="uz0.dev portal visual"
              width={350}
              height={350}
              className="w-full h-full object-cover rounded-full"
              priority
              style={{
                mask: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)',
                WebkitMask: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)'
              }}
            />
          </div>
        </a>
      </div>
  );
}
