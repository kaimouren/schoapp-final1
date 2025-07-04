
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Bookmark, Clock } from "lucide-react";

interface ResultsNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  savedCount: number;
}

const ResultsNavigation = ({ activeTab, onTabChange, savedCount }: ResultsNavigationProps) => {
  const tabs = [
    { id: 'results', label: '匹配结果', icon: Search },
    { id: 'saved', label: '收藏夹', icon: Bookmark, count: savedCount },
    { id: 'progress', label: '申请进度', icon: Clock }
  ];

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => onTabChange(tab.id)}
                className="flex items-center gap-2 h-12"
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                {tab.count && tab.count > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {tab.count}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultsNavigation;
