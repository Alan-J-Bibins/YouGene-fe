import { FileInput, FolderUp } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone-esm";

export default function Page() {

    const [file, setFile] = useState<File>();
    const symptoms = ['Headache', 'Throat Pain', 'Chest Swelling']

    const handleSubmit = async () => {
        const formdata = new FormData();
        formdata.append('file', file);
        formdata.append('QUERY', symptoms.toString());
        try {
            const response = await fetch('https://seashell-app-mo44g.ondigitalocean.app/process-csv/', {
                method: 'POST',
                body: formdata,
            })
            if (!response.ok) {
                const errorData = await response.json();
                console.log("wellfuck");
                return errorData;
            }
        }
        catch (error) {
            console.log(error)
        }
        alert(file?.name);
    }

    function Dropzone() {
        const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
            onDrop: (incomingFiles) => {
                console.log(incomingFiles);
                setFile(incomingFiles[0])
            },
            multiple: false,
            accept: {
                'text/csv': ['.csv'],
                'application/vnd.ms-excel': ['.csv'],
                'application/csv': ['.csv']
            }
        });

        return (
            <div {...getRootProps()} className="w-full">
                <input {...getInputProps()} />
                <div className={`flex flex-col justify-center items-center bg-white/5 p-4 h-fit w-fit rounded-xl cursor-pointer
                    border border-grey/20 hover:border-b-accent hover:border-x-grey/10 hover:border-t-grey/30 
                    shadow-sm shadow-primary/20 transition-all hover:shadow-primary/20 hover:shadow-2xl`}>
                    {!file && (
                        <div className="flex justify-center items-center gap-4">
                            <FolderUp size={20} className="text-text opacity-40" />
                            <p className="opacity-40 text-nowrap">Upload genomic data</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-start items-start gap-8">
            <h1 className="font-[Gugi] text-3xl">
                Chat
            </h1>
            <div className="bg-white/5 border border-grey/20 w-full rounded-xl p-4 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 flex-start w-full items-center">
                        <div className="bg-gray-300 rounded-full h-8 w-8" />
                        <h4 className="text-xl">John Doe</h4>
                    </div>
                    <div className="flex gap-4 items-center">
                        {file && (
                        <p>{file.name}</p>
                        )}
                        <form onSubmit={handleSubmit}>
                            {file && (
                                <div className="flex flex-col justify-center items-center bg-white/5 p-4 h-fit w-fit rounded-xl cursor-pointer
                                border border-grey/20 hover:border-b-accent hover:border-x-grey/10 hover:border-t-grey/30 
                                shadow-sm shadow-primary/20 transition-all hover:shadow-primary/20 hover:shadow-2xl">
                                    <button type="submit" className="flex gap-2 justify-center">
                                        <FileInput size={20} />
                                        Submit
                                    </button>
                                </div>
                            )}
                            {!file && (
                                <Dropzone />
                            )}
                        </form>
                        <p className="text-nowrap text-sm">30 minutes ago</p>
                    </div>
                </div>
                <Symptoms symptoms={symptoms} />
            </div>
            <div className="flex flex-col justify-center items-center gap-4 w-full">
                <FolderUp size={150} className="text-text opacity-40" />
                <p className="text-xl opacity-40">Upload genomic data to start analysis</p>
            </div>
        </div>
    );
}

function Symptoms({ symptoms }: { symptoms: string[] }) {
    return (
        <div className="flex flex-col gap-2 p-2 rounded-xl border border-grey/20 bg-white/5 w-full">
            <p>Symptoms</p>
            <hr className="border-grey/20" />
            <div className="border-grey/20 flex flex-wrap gap-1 items-start justify-start self-stretch">
                {symptoms.map((symptom, index) => {
                    return (
                        <div key={index} className="w-fit p-2 rounded-xl border border-grey/20 bg-black/20">
                            {symptom}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
