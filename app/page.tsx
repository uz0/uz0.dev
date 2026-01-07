import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <a
        href="https://github.com/uz0"
        target="_blank"
        rel="noopener noreferrer"
        className="group hover-link relative inline-block"
      >
        <div className="relative h-[350px] w-[350px]">
          {/* Radial gradient mask container */}
          <div className="bg-gradient-radial absolute inset-0 z-10 rounded-full from-white to-transparent opacity-100"></div>

          {/* Background image */}
          <Image
            src="/Neon_W-Fails_Chemistry_Test_00001_.jpg"
            alt="uz0.dev portal visual"
            width={350}
            height={350}
            className="h-full w-full rounded-full object-cover"
            priority
            style={{
              mask: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)',
              WebkitMask: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)',
            }}
          />
        </div>
      </a>
    </div>
  );
}
