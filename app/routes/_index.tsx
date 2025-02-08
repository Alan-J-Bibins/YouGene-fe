import { GradientText } from '~/components/GradientText';
import PatientBox from '~/components/PatientBox';

export default function Page() {
    const patients = [
        {
            symptoms: ['Headache', 'Throat Pain', 'Chest Swelling'],
            userName: 'John Doe',
            href: '/chat',
        },
        {
            symptoms: ['Headache', 'Throat Pain', 'Chest Swelling'],
            userName: 'John Doe',
            href: '/chat',
        },
        {
            symptoms: ['Headache', 'Throat Pain', 'Chest Swelling'],
            userName: 'John Doe',
            href: '/chat',
        },
        {
            symptoms: ['Headache', 'Throat Pain', 'Chest Swelling'],
            userName: 'John Doe',
            href: '/chat',
        },
    ];

    return (
        <div className="flex flex-col justify-start items-start gap-8">
            <h1 className="font-[Gugi] text-3xl">Dashboard</h1>
            <h1 className="font-[Gugi] text-5xl">
                Welcome back, <GradientText>Alan</GradientText>
            </h1>
            <h2 className="font-[Gugi] text-3xl underline">New Patients</h2>
            <div className="flex gap-8 items-center justify-between w-full">
                {patients.map((patient, index) => {
                    return (
                        <PatientBox
                            href={patient.href}
                            isCompleted={false}
                            key={index}
                            symptoms={patient.symptoms}
                            userName={patient.userName}
                        />
                    );
                })}
            </div>
            <h2 className="font-[Gugi] text-3xl underline">Recent Patients</h2>
            <div className="flex gap-8 items-center justify-between w-full">
                {patients.map((patient, index) => {
                    return (
                        <PatientBox
                            href={patient.href}
                            isCompleted={true}
                            key={index}
                            symptoms={patient.symptoms}
                            userName={patient.userName}
                            diagnosis="Lung Cancer"
                        />
                    );
                })}
            </div>
        </div>
    );
}
