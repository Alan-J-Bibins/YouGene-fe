import { FileInput, FolderUp, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { FormEvent, useState } from 'react';
import { useDropzone } from 'react-dropzone-esm';

export default function Page() {
    const [file, setFile] = useState<File>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');
    // const symptoms = ['Lump', 'Skin changes', 'Swelling']
    const [symptoms, setSymptoms] = useState<string[]>([]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formdata = new FormData();
        if (!file) {
            setErrors(prev => [...prev, 'File has not been selected']);
            return;
        }
        formdata.append('file', file);
        formdata.append('query', symptoms.toString());
        console.log(formdata);
        try {
            setIsLoading(true);
            setIsDisabled(true);
            const response = await fetch(
                'https://seashell-app-mo44g.ondigitalocean.app/process-csv/',
                {
                    method: 'POST',
                    body: formdata,
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                console.log('wellfuck');
                return errorData;
            }
            const data = await response.json();
            console.log('Response', data);
            console.log('Treatment', data.treatment_plan);
            setMessage(data.treatment_plan);
            console.log('Message', message);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
            setIsDisabled(false);
        }
    };

    function Dropzone() {
        const { getRootProps, getInputProps } = useDropzone({
            onDrop: incomingFiles => {
                console.log(incomingFiles);
                setFile(incomingFiles[0]);
            },
            multiple: false,
            accept: {
                'text/csv': ['.csv'],
                'application/vnd.ms-excel': ['.csv'],
                'application/csv': ['.csv'],
            },
        });

        return (
            <div {...getRootProps()} className="w-full">
                <input {...getInputProps()} />
                <div
                    className={`flex flex-col justify-center items-center bg-white/5 p-4 h-fit w-fit rounded-xl cursor-pointer
                    border border-grey/20 hover:border-b-accent hover:border-x-grey/10 hover:border-t-grey/30 
                    shadow-sm shadow-primary/20 transition-all hover:shadow-primary/20 hover:shadow-2xl`}
                >
                    <div className="flex justify-center items-center gap-4">
                        <FolderUp size={20} className="text-text opacity-40" />
                        <p className="opacity-40 text-nowrap">
                            Upload genomic data
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-start items-start gap-8">
            <h1 className="font-[Gugi] text-3xl">Chat</h1>
            <div className="bg-white/5 border border-grey/20 w-full rounded-xl p-4 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 flex-start w-full items-center">
                        <div className="bg-gray-300 rounded-full h-8 w-8" />
                        <h4 className="text-xl">John Doe</h4>
                    </div>
                    <div className="flex gap-4 items-center">
                        {file && (
                            <div className="relative">
                                <p className="p-2">{file.name}</p>
                                <X
                                    size={20}
                                    onClick={() => setFile(undefined)}
                                    className="bg-grey/20 rounded-full absolute top-0 right-0"
                                />
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            {file && (
                                <div
                                    className="flex flex-col justify-center items-center bg-white/5 p-4 h-fit w-fit rounded-xl cursor-pointer
                                border border-grey/20 hover:border-b-accent hover:border-x-grey/10 hover:border-t-grey/30 
                                shadow-sm shadow-primary/20 transition-all hover:shadow-primary/20 hover:shadow-2xl"
                                >
                                    <button
                                        type="submit"
                                        className="flex gap-2 justify-center disabled:opacity-50"
                                        disabled={isDisabled}
                                    >
                                        {!isLoading && (
                                            <>
                                                <FileInput size={20} />
                                                Submit
                                            </>
                                        )}
                                        {isLoading && <p>Submitting...</p>}
                                    </button>
                                </div>
                            )}
                            {!file && <Dropzone />}
                        </form>
                        <p className="text-nowrap text-sm">30 minutes ago</p>
                    </div>
                </div>
                {errors.length > 0 && (
                    <div className="p-2 bg-red-100/20 border border-red-500">
                        {errors.map((error, index) => {
                            return (
                                <div key={index}>
                                    <p>{error}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
                <Symptoms symptoms={symptoms} />
            </div>
            {!file && (
                <div className="flex flex-col justify-center items-center gap-4 w-full">
                    <FolderUp size={150} className="text-text opacity-40" />
                    <p className="text-xl opacity-40">
                        Upload genomic data to start analysis
                    </p>
                </div>
            )}
            {message !== '' && (
                <div className="p-4 border border-grey/20 rounded-xl motion-preset-blur-down-md bg-white/5">
                    <ReactMarkdown>{message}</ReactMarkdown>
                </div>
            )}
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
                        <div
                            key={index}
                            className="w-fit p-2 rounded-xl border border-grey/20 bg-black/20"
                        >
                            {symptom}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
