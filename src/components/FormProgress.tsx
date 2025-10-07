import { getLanguage, translations } from "@/utils/languageUtils";

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
}
export const FormProgress = ({
  progress
}: FormProgressProps) => {
  
    const lang = getLanguage();
    const t = translations.progress[lang];
  return <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between mb-2 text-sm text-gray-400">
        <span>`${t.text}`</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="progress-bar bg-gray-200">
        <div className="progress-fill" style={{
        width: `${progress}%`
      }} />
      </div>
    </div>;
};