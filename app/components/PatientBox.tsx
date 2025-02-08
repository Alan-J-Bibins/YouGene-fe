import { ChevronRight } from "lucide-react";

export default function PatientBox(
    {
        isCompleted,
        symptoms,
        userName,
        diagnosis
    }: {
        isCompleted: boolean,
        symptoms: string[],
        userName: string,
        diagnosis?: string
    }) {
    return (
        <div className="relative overflow-hidden rounded-xl w-full hover:scale-105 group transition-all">
            <div className="border border-grey/20 group-hover:border-primary/40 transition-colors rounded-xl p-4 relative overflow-hidden flex flex-col items-center gap-4 ">
                {!isCompleted && (
                    <div className="flex justify-between items-center text-sigRed text-xl w-full">
                        Pending
                        <ChevronRight />
                    </div>
                )}
                {isCompleted && (
                    <div className="flex justify-between items-center text-primary text-xl w-full">
                        View Results
                        <ChevronRight />
                    </div>
                )}
                {isCompleted && (
                    <div className="flex flex-col gap-2 p-2 rounded-xl border border-primary/40 bg-white/5 w-full">
                        {diagnosis}
                    </div>
                )}
                <Symptoms symptoms={symptoms} />
                <div className="flex gap-4 flex-start w-full items-center">
                    <div className="bg-gray-300 rounded-full h-8 w-8" />
                    <h4 className="text-xl">{userName}</h4>
                </div>
                {!isCompleted && (
                    <p className="text-grey/80 w-full">30 minutes ago</p>
                )}
            </div>
            <div className="bg-primary w-full h-8 absolute bottom-0 blur-3xl group-hover:blur-2xl transition-all" />
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
