
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, DollarSign, MapPin, Heart, Download, ExternalLink, Award, CheckCircle, Clock, XCircle, FileText, User, Upload, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserPortalProps {
  onBack: () => void;
  savedScholarships: any[];
  appliedScholarships: any[];
  onOneClickApply: (scholarship: any) => void;
  user: any;
}

const UserPortal = ({ onBack, savedScholarships, appliedScholarships, onOneClickApply, user }: UserPortalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('saved');
  const [userProfile, setUserProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    university: '',
    major: '',
    gpa: '',
    personalStatement: '',
    resume: null as File | null
  });

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

  const handleDownloadTemplate = (templateName: string) => {
    toast({
      title: "模板下载成功",
      description: `${templateName}已下载到您的设备`,
    });
  };

  const handleProfileUpdate = () => {
    toast({
      title: "资料更新成功",
      description: "您的个人资料已成功更新",
    });
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUserProfile(prev => ({ ...prev, resume: file }));
      toast({
        title: "简历上传成功",
        description: `${file.name} 已成功上传`,
      });
    }
  };

  const calculateDaysLeft = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateProfileCompletion = () => {
    const fields = [userProfile.name, userProfile.email, userProfile.phone, userProfile.university, userProfile.major, userProfile.gpa, userProfile.personalStatement];
    const completedFields = fields.filter(field => field && field.trim() !== '').length;
    const resumeBonus = userProfile.resume ? 1 : 0;
    return Math.round(((completedFields + resumeBonus) / 8) * 100);
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

        {/* 资料完善进度条 */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">🎯 个人资料完善</h3>
                <p className="text-sm text-gray-600">完善资料可提高申请成功率</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{calculateProfileCompletion()}%</div>
                <div className="text-sm text-gray-500">📝 已提交申请：{appliedScholarships.length}/∞</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${calculateProfileCompletion()}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              我的收藏 ({savedScholarships.length})
            </TabsTrigger>
            <TabsTrigger value="applied" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              我的申请 ({appliedScholarships.length})
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              我的资料
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

          <TabsContent value="profile" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* 个人信息编辑 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    个人信息
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">姓名</Label>
                      <Input
                        id="name"
                        value={userProfile.name}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="请输入您的姓名"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">邮箱</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="请输入您的邮箱"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">手机号</Label>
                    <Input
                      id="phone"
                      value={userProfile.phone}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="请输入您的手机号"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="university">就读院校</Label>
                      <Input
                        id="university"
                        value={userProfile.university}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, university: e.target.value }))}
                        placeholder="请输入您的院校"
                      />
                    </div>
                    <div>
                      <Label htmlFor="major">专业</Label>
                      <Input
                        id="major"
                        value={userProfile.major}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, major: e.target.value }))}
                        placeholder="请输入您的专业"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="gpa">GPA</Label>
                    <Input
                      id="gpa"
                      value={userProfile.gpa}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, gpa: e.target.value }))}
                      placeholder="请输入您的GPA"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="personalStatement">个人陈述</Label>
                    <Textarea
                      id="personalStatement"
                      value={userProfile.personalStatement}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, personalStatement: e.target.value }))}
                      placeholder="请简要介绍您的学术背景和申请动机"
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="resume">简历上传</Label>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="cursor-pointer"
                    />
                    {userProfile.resume && (
                      <p className="text-sm text-green-600 mt-1">
                        已上传: {userProfile.resume.name}
                      </p>
                    )}
                  </div>
                  
                  <Button onClick={handleProfileUpdate} className="w-full">
                    更新资料
                  </Button>
                </CardContent>
              </Card>

              {/* 文档模板库 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    文档模板库
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">个人陈述模板</h4>
                        <p className="text-sm text-gray-600">标准个人陈述写作模板</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadTemplate('个人陈述模板')}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        下载
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">推荐信模板</h4>
                        <p className="text-sm text-gray-600">教授推荐信写作模板</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadTemplate('推荐信模板')}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        下载
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">简历模板</h4>
                        <p className="text-sm text-gray-600">学术简历标准模板</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadTemplate('简历模板')}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        下载
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-amber-50">
                      <div>
                        <h4 className="font-medium text-amber-800">定制修改服务</h4>
                        <p className="text-sm text-amber-600">付费用户专享个性化文档修改</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-amber-300 text-amber-700 hover:bg-amber-100"
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        联系
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserPortal;
