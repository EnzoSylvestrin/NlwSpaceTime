import { cookies } from 'next/headers';

import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';

import { api } from '@/lib/api';

import EmptyMemories from '@/components/EmptyMemories';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

dayjs.locale(ptBr);

type Memory = {
  coverUrl: string,
  except: string,
  id: string,
  createdAt: string,
}

const Home = async () => {
  const isAuthenticated = cookies().has('token');

  if (!isAuthenticated) {
    return (
      <EmptyMemories />
    );
  }

  const token = cookies().get('token')?.value;

  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const memories: Memory[] = response.data;

  if (memories.length === 0) {
    return (
      <EmptyMemories />
    );
  }

  return (
    <div className='flex flex-col gap-10 p-8'>
      {
        memories.map(memory => {
          return (
            <div className="space-y-4" key={memory.id}>
              <time className='flex gap-2 items-center text-sm text-gray-100 -ml-8 before:h-px before:w-5 before:bg-gray-50'>
                {dayjs(memory.createdAt).format("D[ de ]MMMM[, ]yyyy")}
              </time>
              <Image src={memory.coverUrl} width={592} height={280} className='w-full aspect-video object-cover rounded-lg' alt='' />
              <p className='text-lg leading-relaxed text-gray-100'>
                {memory.except}
              </p>

              <Link href={`/memories${memory.id}`} className='flex items-center gap-2 text-sm text-gray-200'>
                Ler Mais
                <ArrowRight className='w-4 h-4' />
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home;