
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getLanguage, translations } from "@/utils/languageUtils";

interface NavigationButtonsProps {
  canGoBack: boolean;
  canGoNext: boolean;
  onBack: () => void;
  onNext: () => void;
  isFirstQuestion?: boolean;
  onClose?: () => void;
  className?: string;
}

export const NavigationButtons = ({
  canGoNext,
  onBack,
  onNext,
  isFirstQuestion = false,
  onClose,
  className
}: NavigationButtonsProps) => {
  const lang = getLanguage();
  const t = translations.navigationButtons[lang];
  
  return (
    <div className={`flex w-full max-w-3xl mx-auto bg-white/5 ${className}`}>
      <Button 
        onClick={isFirstQuestion ? onClose : onBack} 
        variant="ghost"
        className={`w-1/2 rounded-none border-none text-white hover:bg-white/10 bg-transparent`}
      >
        <ChevronLeft className="mr-1 h-4 w-4" /> {isFirstQuestion ? t.back : t.previous}
      </Button>
      
      <Button 
        onClick={onNext} 
        variant="ghost"
        disabled={!canGoNext}
        className={`w-1/2 rounded-none border-none text-white hover:bg-white/10 bg-transparent ${!canGoNext ? 'opacity-0 pointer-events-none' : ''}`}
      >
        {t.next} <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
};
