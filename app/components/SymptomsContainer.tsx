/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Pen, Plus, X } from "lucide-react";
import { useState } from "react";

export default function SymptomRow({ initialSymptoms }: { initialSymptoms: string[] }) {
    const [symptoms, setSymptoms] = useState<string[]>(initialSymptoms);
    const handleAdd = (newSymptom: string) => {
        setSymptoms([...symptoms, newSymptom]);
    };

    const handleEdit = (index: number, newValue: string) => {
        const newSymptoms = [...symptoms];
        newSymptoms[index] = newValue;
        setSymptoms(newSymptoms);
    };

    const handleDelete = (index: number) => {
        setSymptoms(symptoms.filter((_, i) => i !== index));
    };

    return (
        <div className="border-grey/20 flex flex-wrap gap-1 items-start justify-start self-stretch w-full">
            {symptoms.map((symptom, index) => {
                return (
                    <Symptom
                        key={index}
                        initialSymptom={symptom}
                        onEdit={(newValue: string) => handleEdit(index, newValue)}
                        onDelete={() => handleDelete(index)}
                        onAdd={handleAdd}
                    />
                );
            })}
        </div>
    );
}

function Symptom({ initialSymptom, onEdit, onDelete, onAdd }: { initialSymptom: string, onEdit: (newValue: string) => void, onDelete: () => void, onAdd: (value: string) => void }) {
    const [editValue, setEditValue] = useState<string>(initialSymptom);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const handleSave = () => {
        if (editValue.trim()) {
            onEdit(editValue.trim());
            setIsEditing(false);
        }
    };

    if (isEditing) {
        return (
            <div className="flex flex-col justify-center items-center w-full absolute inset-0 bg-black/20" onClick={() => setIsEditing(false)}>
                <div
                    className="w-1/3 p-2 rounded-xl border border-grey/20 bg-background/20 backdrop-blur-md text-nowrap z-20 transition-colors hover:border-primary/40"
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                    <div className="w-full flex justify-between items-center">
                        <h4 className="text-xl">Edit Symptom</h4>
                        <X size={20} className="cursor-pointer" onClick={() => setIsEditing(false)} />
                    </div>
                    <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="p-1 rounded border border-grey/20 bg-primary/10 focus:border-primary/40 w-full"
                        onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                    />
                </div>
            </div>
        );
    } else if (isAdding) {
        return (
            <div className="flex flex-col justify-center items-center w-full absolute inset-0 bg-black/20" onClick={() => setIsEditing(false)}>
                <div
                    className="w-1/3 p-2 rounded-xl border border-grey/20 bg-background/20 backdrop-blur-md text-nowrap z-20 transition-colors hover:border-primary/40"
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                    <div className="w-full flex justify-between items-center">
                        <h4 className="text-xl">Add Symptom</h4>
                        <X size={20} className="cursor-pointer" onClick={() => setIsAdding(false)} />
                    </div>
                    <AddSymptomForm onAdd={onAdd} />
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex items-center gap-1 w-fit p-2 rounded-xl border border-grey/20 bg-black/20 text-nowrap relative cursor-default group ">
                {editValue}
                <Pen
                    size={20}
                    className="hidden group-hover:block cursor-pointer motion-preset-slide-right-md"
                    onClick={() => setIsEditing(true)}
                />
                <X
                    size={20}
                    className="hidden group-hover:block cursor-pointer motion-preset-slide-right-md"
                    onClick={onDelete}
                />
            </div >

        );
    }
}

const AddSymptomForm = ({ onAdd }: { onAdd: (value: string) => void }) => {
    const [newSymptom, setNewSymptom] = useState('');

    const handleSubmit = () => {
        if (newSymptom.trim()) {
            onAdd(newSymptom.trim());
            setNewSymptom('');
        }
    };

    return (
        <div className="flex gap-2 items-center">
            <input
                type="text"
                value={newSymptom}
                onChange={(e) => setNewSymptom(e.target.value)}
                placeholder="Add new symptom"
                className="flex-1 p-2 rounded-lg border border-grey/20 bg-black/10"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button
                onClick={handleSubmit}
                className="p-2 rounded-lg border border-grey/20 bg-black/20 hover:bg-black/30"
            >
                <Plus size={20} />
            </button>
        </div>
    );
};
