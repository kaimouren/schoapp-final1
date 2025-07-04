
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, DollarSign, MapPin, Heart, Download, ExternalLink, Award, CheckCircle, Clock, XCircle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserPortalProps {
  onBack: () => void;
  savedScholarships: any[];
  appliedScholarships: any[];
  onOneClickApply: (scholarship: any) => void;
}

const UserPortal = ({ onBack, savedScholarships, appliedScholarships, onOneClickApply }: UserPortalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('saved');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '已通过':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case '已提交':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case '审核中':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case '未通过':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case '已通过':
        return 'default';
      case '已提交':
        return 'secondary';
      case '审核中':
        return 'outline';
      case '未通过':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const handleDownloadApplication = (scholarship: any) => {
    toast({
      title: "下载成功",
      description: `${scholarship.name}申请材料已下载`,
    });
  };

  const calculateDaysLeft = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mr-4 hover:bg-blue-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">用户中心</h1>
            <p className="text-gray-600 mt-1">管理您的奖学金收藏和申请</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              我的收藏 ({savedScholarships.length})
            </TabsTrigger>
            <TabsTrigger value="applied" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              我的申请 ({appliedScholarships.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="saved" className="space-y-6">
            {savedScholarships.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">暂无收藏的奖学金</h3>
                  <p className="text-gray-600">去浏览奖学金并收藏您感兴趣的项目吧！</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {savedScholarships.map((scholarship) => (
                  <Card key={scholarship.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Award className="h-6 w-6 text-blue-500" />
                            <CardTitle className="text-xl">{scholarship.name}</CardTitle>
                          </div>
                          <div className="flex items-center gap-4 text-gray-600 mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{scholarship.university} • {scholarship.country}</span>
                            </div>
                            <Badge variant="outline">{scholarship.type}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{scholarship.amount}</div>
                          <div className="text-xs text-gray-500">每年</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{scholarship.description}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-red-600">
                          <Calendar className="h-4 w-4" />
                          <span className="font-medium">截止日期: {scholarship.deadline}</span>
                          <span className="text-sm">
                            (剩{Math.max(0, calculateDaysLeft(scholarship.deadline))}天)
                          </span>
                        </div>
                        
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => onOneClickApply(scholarship)}
                        >
                          一键申请
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="applied" className="space-y-6">
            {appliedScholarships.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">暂无申请记录</h3>
                  <p className="text-gray-600">开始申请您感兴趣的奖学金项目吧！</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {appliedScholarships.map((scholarship) => (
                  <Card key={scholarship.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Award className="h-6 w-6 text-blue-500" />
                            <CardTitle className="text-xl">{scholarship.name}</CardTitle>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(scholarship.status)}
                              <Badge variant={getStatusBadgeVariant(scholarship.status)}>
                                {scholarship.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-gray-600 mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{scholarship.university} • {scholarship.country}</span>
                            </div>
                            <Badge variant="outline">{scholarship.type}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{scholarship.amount}</div>
                          <div className="text-xs text-gray-500">每年</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{scholarship.description}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>提交时间: {scholarship.submittedDate}</span>
                          </div>
                          {scholarship.status === '已通过' && (
                            <div className="text-green-600 font-medium">
                              🎉 恭喜获得奖学金！
                            </div>
                          )}
                        </div>
                        
                        <Button 
                          variant="outline"
                          onClick={() => handleDownloadApplication(scholarship)}
                        >
                          下载申请
                          <Download className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserPortal;
