'use client';

import { FormEvent } from "react";

import { Camera } from "lucide-react";

import { api } from "@/lib/api";

import Cookie from 'js-cookie';

import MediaPicker from "./MediaPicker";
import { useRouter } from "next/navigation";

const NewMemoryForm = () => {

    const router = useRouter();

    const HandleCreateMemory = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const fileToUpload = formData.get('coverUrl');

        let coverUrl = '';

        if (fileToUpload) {
            const uploadFormData = new FormData();
            uploadFormData.set('file', fileToUpload);

            const uploadResponse = await api.post('/upload', uploadFormData);

            coverUrl = uploadResponse.data.fileUrl;
        }

        const token = Cookie.get('token');

        console.log(coverUrl);

        await api.post('/memories',
            {
                coverUrl: coverUrl,
                content: formData.get('content'),
                isPublic: formData.get('isPublic')
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )

        router.push('/');
    }

    return (
        <form onSubmit={HandleCreateMemory} className="flex flex-1 flex-col gap-2">
            <div className="flex items-center gap-4">
                <label htmlFor="media" className="cursor-pointer flex items-ceter gap-1.5 text-sm text-gray-200 hover:text-gray-100">
                    <Camera className="w-4 h-4" />
                    Anexar media
                </label>

                <label htmlFor="isPublic" className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100">
                    <input type="checkbox" name="isPublic" id="isPublic" value="true" className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-700" />
                    Tornar memória publica
                </label>
            </div>

            <MediaPicker />

            <textarea
                name="content"
                spellCheck="false"
                className="flex-1 resize-none rounded border-0 p-0 bg-transparent text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
                placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
            />

            <button
                type="submit"
                className='rounded-full bg-green-500 px-5 py-3 inline-block font-alt text-sm uppercase leading-none text-black hover:bg-green-600 self-end'
            >
                Salvar
            </button>
        </form>
    );
}

export default NewMemoryForm;