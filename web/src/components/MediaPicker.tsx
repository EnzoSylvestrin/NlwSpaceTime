'use client';

import { ChangeEvent, ChangeEventHandler, useState } from "react";

const MediaPicker = () => {

    const [preview, setPreview] = useState<string | null>(null);

    const OnFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;

        if (!files) return;

        const previewUrl = URL.createObjectURL(files[0]);
        setPreview(previewUrl);
    }

    return (
        <>
            <input
                type="file"
                id="media"
                name="coverUrl"
                className="invisible w-0 h-0"
                accept="img/*"
                onChange={OnFileSelected}
            />

            {preview && <img src={preview} className="w-full aspect-video rounded-lg object-cover" alt="" />}
        </>
    );
}

export default MediaPicker;