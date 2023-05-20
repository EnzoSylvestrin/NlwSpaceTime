import Image from "next/image";
import Link from "next/link";

import nlwSpace from '../assets/logo.svg';

const Hero = () => {
    return (
        <div className="space-y-5">
            <Image src={nlwSpace} alt='logo' />
            <div className="max-w-[420px] space-y-1">
                <h1 className='mt-5 text-5xl font-bold leading-tight'>
                    Sua cápsula do tempo
                </h1>
                <p className='text-lg leading-relaxed'>
                    Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!
                </p>
            </div>
            <Link
                className='rounded-full bg-green-500 px-5 py-3 inline-block font-alt text-sm uppercase leading-none text-black hover:bg-green-600'
                href="/memories/new"
            >
                CADASTRAR LEMBRANÇA
            </Link>
        </div>
    );
}

export default Hero;