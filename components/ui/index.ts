// Export des composants UI pour faciliter l'importation
export { Button } from './button';

// Pour les composants qui n'ont pas encore été migrés, créer des versions temporaires
// Ces exports devront être mis à jour lorsque les composants réels seront disponibles

import { FC, ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, FormHTMLAttributes, SelectHTMLAttributes } from 'react';

// Card composants
export const Card: FC<{ className?: string; children?: ReactNode }> = ({ 
  children, 
  className = '' 
}) => null;

export const CardHeader: FC<{ className?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

export const CardTitle: FC<{ className?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

export const CardContent: FC<{ className?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

export const CardDescription: FC<{ className?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

export const CardFooter: FC<{ className?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

// Badge
export const Badge: FC<{ className?: string; variant?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

// Tabs
export const Tabs: FC<{ className?: string; defaultValue?: string; value?: string; onValueChange?: (value: string) => void; children?: ReactNode }> = ({ 
  children 
}) => null;

export const TabsContent: FC<{ value: string; className?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

export const TabsList: FC<{ className?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

export const TabsTrigger: FC<{ value: string; className?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

// Alert
export const Alert: FC<{ className?: string; variant?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

export const AlertTitle: FC<{ className?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

export const AlertDescription: FC<{ className?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

// Input
export const Input: FC<InputHTMLAttributes<HTMLInputElement> & { className?: string }> = (props) => null;

// Textarea
export const Textarea: FC<TextareaHTMLAttributes<HTMLTextAreaElement> & { className?: string }> = (props) => null;

// Form components
export const Form: FC<FormHTMLAttributes<HTMLFormElement> & { className?: string; children?: ReactNode }> = (props) => null;

export const FormControl: FC<{ className?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

export const FormField: FC<{ control: any; name: string; render: (props: any) => ReactNode }> = () => null;

export const FormItem: FC<{ className?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

export const FormLabel: FC<{ className?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

export const FormMessage: FC<{ className?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

export const FormDescription: FC<{ className?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

// Select components
export const Select: FC<SelectHTMLAttributes<HTMLSelectElement> & { onValueChange?: (value: string) => void, defaultValue?: string, children?: ReactNode }> = () => null;

export const SelectContent: FC<{ className?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

export const SelectItem: FC<{ value: string; className?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

export const SelectTrigger: FC<{ className?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

export const SelectValue: FC<{ placeholder?: string; className?: string; children?: ReactNode }> = ({ 
  children 
}) => null;

// Switch component
export const Switch: FC<{ checked?: boolean; onCheckedChange?: (checked: boolean) => void; className?: string }> = () => null;

// Table components
export const Table: FC<{ className?: string; children?: ReactNode }> = ({ children }) => null;
export const TableHeader: FC<{ className?: string; children?: ReactNode }> = ({ children }) => null;
export const TableBody: FC<{ className?: string; children?: ReactNode }> = ({ children }) => null;
export const TableFooter: FC<{ className?: string; children?: ReactNode }> = ({ children }) => null;
export const TableHead: FC<{ className?: string; children?: ReactNode }> = ({ children }) => null;
export const TableRow: FC<{ className?: string; children?: ReactNode }> = ({ children }) => null;
export const TableCell: FC<{ className?: string; children?: ReactNode }> = ({ children }) => null;
export const TableCaption: FC<{ className?: string; children?: ReactNode }> = ({ children }) => null;

// Dialog components
export const Dialog: FC<{ open?: boolean; onOpenChange?: (open: boolean) => void; children?: ReactNode }> = ({ children }) => null;
export const DialogTrigger: FC<{ asChild?: boolean; className?: string; children?: ReactNode }> = ({ children }) => null;
export const DialogContent: FC<{ className?: string; children?: ReactNode }> = ({ children }) => null;
export const DialogHeader: FC<{ className?: string; children?: ReactNode }> = ({ children }) => null;
export const DialogFooter: FC<{ className?: string; children?: ReactNode }> = ({ children }) => null;
export const DialogTitle: FC<{ className?: string; children?: ReactNode }> = ({ children }) => null;
export const DialogDescription: FC<{ className?: string; children?: ReactNode }> = ({ children }) => null;

// DropdownMenu components
export const DropdownMenu: FC<{ open?: boolean; onOpenChange?: (open: boolean) => void; children?: ReactNode }> = ({ children }) => null;
export const DropdownMenuTrigger: FC<{ asChild?: boolean; className?: string; children?: ReactNode }> = ({ children }) => null;
export const DropdownMenuContent: FC<{ align?: string; className?: string; children?: ReactNode }> = ({ children }) => null;
export const DropdownMenuItem: FC<{ className?: string; onClick?: () => void; children?: ReactNode }> = ({ children }) => null;
export const DropdownMenuLabel: FC<{ className?: string; children?: ReactNode }> = ({ children }) => null;
export const DropdownMenuSeparator: FC<{ className?: string; children?: ReactNode }> = ({ children }) => null;

// Progress component
export const Progress: FC<{ value?: number; max?: number; className?: string }> = () => null;

// Label component
export const Label: FC<{ children?: ReactNode }> = ({ children }) => null;

// Slider component
export const Slider: FC = () => null;

// DateTimePicker component
export { DateTimePicker } from './date-time-picker';
