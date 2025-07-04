
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface MatchDetailsProps {
  matchRate: number;
  details: {
    gpa: 'match' | 'partial' | 'miss';
    language: 'match' | 'partial' | 'miss';
    experience: 'match' | 'partial' | 'miss';
    background: 'match' | 'partial' | 'miss';
  };
}

const MatchDetails = ({ matchRate, details }: MatchDetailsProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'match':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'partial':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'miss':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (key: string, status: string) => {
    const labels = {
      gpa: 'GPA成绩',
      language: '语言成绩',
      experience: '研究经验',
      background: '专业背景'
    };

    const statusTexts = {
      match: '完全符合',
      partial: '部分符合',
      miss: '不符合'
    };

    return `${labels[key as keyof typeof labels]}: ${statusTexts[status as keyof typeof statusTexts]}`;
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge className="cursor-help bg-blue-100 text-blue-800 hover:bg-blue-200">
          {matchRate}% 匹配
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <div className="space-y-2">
          <h4 className="font-semibold text-sm mb-3">匹配度详情</h4>
          {Object.entries(details).map(([key, status]) => (
            <div key={key} className="flex items-center gap-2 text-sm">
              {getStatusIcon(status)}
              <span>{getStatusText(key, status)}</span>
            </div>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default MatchDetails;
