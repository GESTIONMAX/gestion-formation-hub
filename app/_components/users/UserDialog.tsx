'use client';

import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '../../components/ui/dialog';
import { UserForm } from '../forms/UserForm';
import type { UserFormValues } from '../forms/UserForm';

type UserDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: {
    id?: string;
    name: string;
    email: string;
    role: string;
    status: 'actif' | 'inactif';
  } | null;
  onSave: (data: UserFormValues) => Promise<void>;
};

export function UserDialog({ open, onOpenChange, initialData, onSave }: UserDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!initialData?.id;

  const handleSubmit = async (data: UserFormValues) => {
    setIsSubmitting(true);
    try {
      await onSave(data);
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Modifier l'utilisateur" : 'Nouvel utilisateur'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <UserForm
            initialData={initialData}
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
            isSubmitting={isSubmitting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
