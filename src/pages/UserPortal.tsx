
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, DollarSign, MapPin, Heart, Download, ExternalLink, Award, CheckCircle, Clock, XCircle, FileText, User, Mail, Phone, Upload, Target, Bell, Crown } from "lucide-react";
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
  const [userProfile, setUserProfile] = useState({
    name: '张同学',
    email: 'student@example.com',
    phone: '+86 138****8888',
    university: '北京大学',
    major: '计算机科学',
    gpa: '3.8/4.0',
    personalStatement: '',
    resume: null
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
      title: "模版下载成功",
      description: `${templateName}已下载到本地`,
    });
  };

  const handleFileUpload = (fieldName: string, file: File) => {
    setUserProfile(prev => ({
      ...prev,
      [fieldName]: file
    }));
    toast({
      title: "文件上传成功",
      description: `${file.name}已上传`,
    });
  };

  const calculateProfileCompletion = () => {
    const fields = ['name', 'email', 'phone', 'university', 'major', 'gpa', 'personalStatement', 'resume'];
    const completedFields = fields.filter(field => 
      userProfile[field] && userProfile[field].toString().trim() !== ''
    ).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const calculateDaysLeft = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const profileCompletion = calculateProfileCompletion();
  const appliedCount = appliedScholarships.length;
  const passedCount = appliedScholarships.filter(s => s.status === '已通过').length;

  const templates = [
    { name: '个人陈述模版', description: '标准个人陈述写作指南', free: true },
    { name: '推荐信模版', description: '推荐信请求和格式模版', free: true },
    { name: '简历模版', description: '学术简历标准格式', free: true },
    { name: '定制修改服务', description: 'AI专业修改和优化服务', free: false },
  ];

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
            <p className="text-gray-600 mt-1">管理您的奖学金收藏、申请和个人资料</p>
          </div>
        </div>

        {/* 进度概览卡片 */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-blue-600" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">个人资料完善</span>
                    <span className="text-sm font-bold text-blue-600">{profileCompletion}%</span>
                  </div>
                  <Progress value={profileCompletion} className="h-2" />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-lg font-bold text-gray-900">{appliedCount}/∞</div>
                  <div className="text-sm text-gray-600">已提交申请</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-yellow-600" />
                <div>
                  <div className="text-lg font-bold text-gray-900">{passedCount}</div>
                  <div className="text-sm text-gray-600">获得奖学金</div>
                </div>
              </div>
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

          {/* 我的收藏 Tab */}
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

          {/* 我的申请 Tab */}
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
                      
                      {/* 进度跟踪指示器 */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>申请进度</span>
                          <span>{scholarship.status}</span>
                        </div>
                        <Progress 
                          value={
                            scholarship.status === '已提交' ? 25 :
                            scholarship.status === '审核中' ? 50 :
                            scholarship.status === '已通过' ? 100 :
                            scholarship.status === '未通过' ? 100 : 0
                          } 
                          className="h-2"
                        />
                      </div>
                      
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

          {/* 我的资料 Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* 个人信息 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
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
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">邮箱</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">手机号</Label>
                    <Input
                      id="phone"
                      value={userProfile.phone}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="university">学校</Label>
                      <Input
                        id="university"
                        value={userProfile.university}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, university: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="major">专业</Label>
                      <Input
                        id="major"
                        value={userProfile.major}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, major: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="gpa">GPA</Label>
                    <Input
                      id="gpa"
                      value={userProfile.gpa}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, gpa: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="statement">个人陈述</Label>
                    <Textarea
                      id="statement"
                      placeholder="请简述您的学术背景和申请动机..."
                      value={userProfile.personalStatement}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, personalStatement: e.target.value }))}
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="resume">简历上传</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload('resume', file);
                        }}
                        className="hidden"
                      />
                      <label htmlFor="resume" className="cursor-pointer flex flex-col items-center justify-center space-y-2">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-600">点击上传简历</span>
                        <span className="text-xs text-gray-400">支持 PDF, DOC, DOCX 格式</span>
                      </label>
                      {userProfile.resume && (
                        <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" />
                          <span>简历已上传</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    保存个人信息
                  </Button>
                </CardContent>
              </Card>

              {/* 文档模版库 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-blue-600" />
                    文档模版库
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {templates.map((template, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900 flex items-center gap-2">
                            {template.name}
                            {!template.free && <Crown className="h-4 w-4 text-yellow-500" />}
                          </h4>
                          <p className="text-sm text-gray-600">{template.description}</p>
                        </div>
                        <Badge variant={template.free ? "secondary" : "outline"}>
                          {template.free ? "免费" : "付费"}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadTemplate(template.name)}
                        className="w-full mt-2"
                        disabled={!template.free}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {template.free ? "下载模版" : "升级解锁"}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* 通知设置 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-600" />
                  通知设置
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">申请状态更新</h4>
                      <p className="text-sm text-gray-600">当申请状态发生变化时通知我</p>
                    </div>
                    <Button variant="outline" size="sm">
                      已开启
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">截止日期提醒</h4>
                      <p className="text-sm text-gray-600">重要截止日期前7天提醒</p>
                    </div>
                    <Button variant="outline" size="sm">
                      已开启
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">新奖学金推荐</h4>
                      <p className="text-sm text-gray-600">根据您的资料推荐合适的奖学金</p>
                    </div>
                    <Button variant="outline" size="sm">
                      已开启
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserPortal;
