
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Brain, Target } from "lucide-react";

interface MatchingLoaderProps {
  user: any;
  onComplete: () => void;
}

const MatchingLoader = ({ user, onComplete }: MatchingLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Brain, text: "分析您的学术背景..." },
    { icon: Target, text: "匹配全球奖学金数据库..." },
    { icon: Sparkles, text: "生成个性化推荐..." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 1000);

    return () => clearInterval(stepTimer);
  }, []);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 border-0 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <CurrentIcon className="h-10 w-10 text-white animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              你好，{user?.name || '同学'}！
            </h2>
            <p className="text-gray-600">
              欢迎来到奖学金智能匹配平台
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-lg font-medium text-blue-600 mb-4">
              {steps[currentStep].text}
            </p>
            <Progress value={progress} className="h-3" />
            <p className="text-sm text-gray-500 mt-2">{progress}% 完成</p>
          </div>
          
          <div className="text-sm text-gray-500">
            正在为您匹配最适合的奖学金项目...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchingLoader;
