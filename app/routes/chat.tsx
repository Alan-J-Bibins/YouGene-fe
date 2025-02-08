export default function Page() {
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
                    <p className="text-nowrap text-sm">30 minutes ago</p>
                </div>
                <Symptoms symptoms={['Headache', 'Throat Pain', 'Chest Swelling']} />
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
