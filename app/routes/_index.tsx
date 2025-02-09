import { useLoaderData } from '@remix-run/react';
import { GradientText } from '~/components/GradientText';
import PatientBox from '~/components/PatientBox';

type Patient = {
    id: string,
    name: string,
    symptoms: string[],
    age: number,
    is_pending: boolean,
}

type ApiResponse = {
    status: 'success' | 'error',
    patients?: Patient[],
    error?: string,
}

export const loader = async (): Promise<ApiResponse> => {
    try {
        const response = await fetch(`${process.env.API_URL}/get-patients/`, {
            method: 'GET'
        })

        if (!response.ok) {
            const error = await response.json();
            console.log("Response is not ok:", error)
            return { status: 'error' };
        }

        const data: ApiResponse = await response.json();
        if (data.status === 'success') {
            console.log(data)
            return {
                status: data.status,
                patients: data.patients
            };
        } else {
            return ({
                status: data.status,
                error: "Data Retrieval Failed"
            })
        }
    } catch (error) {
        console.log(error);
        return {
            status: 'error',
            error: 'Error occured in fetch'
        };
    }
}

export default function Page() {
    const { status, patients, error } = useLoaderData<typeof loader>();
    console.log(status)
    return (
        <div className="flex flex-col justify-start items-start gap-8">
            <h1 className="font-[Gugi] text-3xl">Dashboard</h1>
            <h1 className="font-[Gugi] text-5xl">
                Welcome back, <GradientText>Alan</GradientText>
            </h1>
            {error && (
                <div className="p-2 bg-red-100/20 border border-red-500 text-red-500 rounded-xl w-full">
                    {error}
                </div>
            )}
            <h2 className="font-[Gugi] text-3xl underline">New Patients</h2>
            <div className="flex gap-8 items-center justify-start w-full">
                {patients?.map((patient) => {
                    if (patient.is_pending) {
                        return (
                            <PatientBox
                                id={patient.id}
                                isPending={patient.is_pending}
                                key={patient.id}
                                symptoms={patient.symptoms}
                                userName={patient.name}
                            />
                        );
                    }
                })}
            </div>
            <h2 className="font-[Gugi] text-3xl underline">Recent Patients</h2>
            <div className="flex gap-8 items-center justify-start w-full">
                {patients?.map((patient) => {
                    if (!patient.is_pending) {
                        return (
                            <PatientBox
                                id={patient.id}
                                isPending={patient.is_pending}
                                key={patient.id}
                                symptoms={patient.symptoms}
                                userName={patient.name}
                                diagnosis='liver'
                            />
                        );
                    }
                })}
            </div>
        </div >
    );
}
