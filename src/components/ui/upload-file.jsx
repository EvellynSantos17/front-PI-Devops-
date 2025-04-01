"use client"
import Image from "next/image";
import { useState } from "react";

export default function UploadFile({error, label}){


    const [fileInfo, setFileInfo] = useState(null)

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setFileInfo({
            name: file.name
          });
        }
      };

    return (
        <div className="flex flex-col ">
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <div className="flex items-end gap-2">
                <label
                htmlFor="file-upload">
                    <div className="p-2 bg-zinc-300 hover:bg-zinc-200 flex items-center gap-2 hover:cursor-pointer">
                        <Image
                          alt="upload-icon"
                          src={'/icons/Upload.png'}
                          width={20}
                          height={20}
                        />
                        <span>
                            Clique para adicionar
                        </span>
                    </div>
                </label>
                <span className="text-gray-700">{fileInfo?.name ? fileInfo.name : 'nenhum arquivo selecionado' } </span>
                <input accept="application/pdf" type="file" id="file-upload" className="hidden" onChange={handleFileChange}/>
                <p className={`text-sm text-red-500 transition-opacity duration-150 px-2 ${error ? 'opacity-100' : 'opacity-0'}`}>{error ? error : '.'}</p>
            </div>

        </div>
    )
}