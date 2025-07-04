
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Heart, 
  FileText, 
  Download, 
  User, 
  Mail, 
  GraduationCap,
  Upload,
  Target,
  CheckCircle,
  Clock,
  XCircle,
  Calendar,
  Book,
  Award,
  MessageSquare
} from "lucide-react";

interface UserPortalProps {
  onBack: () => void;
  savedScholarships: any[];
  appliedScholarships: any[];
  onOneClickApply: (scholarship: any) => void;
  user?: any;
  onLogout?: () => void;
}

const UserPortal = ({ 
  onBack, 
  savedScholarships, 
  appliedScholarships, 
  onOneClickApply,
  user,
  onLogout 
}: UserPortalProps) => {
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    education: '',
    major: '',
    gpa: '',
    experience: '',
    goals: '',
  });

  // 计算资料完善进度
  const calculateProfileProgress = () => {
    const fields = Object.values(userProfile);
    const filledFields = fields.filter(field => field.trim() !== '').length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const handleProfileUpdate = () => {
    toast({
      title: "个人资料已更新",
      description: "您的个人资料已成功保存。",
    });
  };

  const handleDownloadTemplate = (templateType: string) => {
    toast({
      title: "模版下载",
      description: `${templateType}模版下载已开始。`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '已提交':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case '审核中':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case '已通过':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case '未通过':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已提交':
        return 'bg-green-100 text-green-800';
      case '审核中':
        return 'bg-yellow-100 text-yellow-800';
      case '已通过':
        return 'bg-green-100 text-green-800';
      case '未通过':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const profileProgress = calculateProfileProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-blue-600 hover:bg-blue-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回首页
              </Button>
              <h1 className="text-2xl font-bold text-blue-600">用户中心</h1>
            </div>
            
            {onLogout && (
              <Button
                variant="outline"
                onClick={onLogout}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                退出登录
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Overview */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Target className="h-5 w-5 mr-2 text-blue-600" />
                资料完善进度
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>个人资料完善</span>
                  <span className="font-medium">{profileProgress}%</span>
                </div>
                <Progress value={profileProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                我的收藏
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {savedScholarships.length}
              </div>
              <p className="text-gray-600 text-sm">已收藏奖学金</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <FileText className="h-5 w-5 mr-2 text-blue-500" />
                我的申请
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {appliedScholarships.length}
              </div>
              <p className="text-gray-600 text-sm">已提交申请</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="saved" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              我的收藏
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              我的申请
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              我的资料
            </TabsTrigger>
          </TabsList>

          {/* 我的收藏 */}
          <TabsContent value="saved" className="space-y-4">
            {savedScholarships.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">暂无收藏</h3>
                  <p className="text-gray-600">您还没有收藏任何奖学金，快去发现适合您的机会吧！</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedScholarships.map((scholarship) => (
                  <Card key={scholarship.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{scholarship.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <GraduationCap className="h-4 w-4" />
                        {scholarship.university}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{scholarship.type}</Badge>
                        <span className="font-bold text-blue-600">{scholarship.amount}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        截止：{scholarship.deadline}
                      </div>

                      <Button
                        onClick={() => onOneClickApply(scholarship)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        一键申请
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* 我的申请 */}
          <TabsContent value="applications" className="space-y-4">
            {appliedScholarships.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">暂无申请</h3>
                  <p className="text-gray-600">您还没有提交任何申请，快去申请适合您的奖学金吧！</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {appliedScholarships.map((application) => (
                  <Card key={application.applicationId} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{application.name}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <GraduationCap className="h-4 w-4" />
                            {application.university}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(application.status)}
                          <Badge className={getStatusColor(application.status)}>
                            {application.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">申请编号：</span>
                          <span className="font-mono">{application.applicationId}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">提交日期：</span>
                          <span>{application.submittedDate}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">奖学金金额：</span>
                          <span className="font-bold text-blue-600">{application.amount}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">截止日期：</span>
                          <span>{application.deadline}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadTemplate('申请文件')}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          下载申请
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toast({
                            title: "进度跟踪",
                            description: "申请进度详情已发送至您的邮箱。",
                          })}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          查看进度
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* 我的资料 */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 个人信息编辑 */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-blue-600" />
                      个人信息
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">姓名</Label>
                        <Input
                          id="name"
                          value={userProfile.name}
                          onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                          placeholder="请输入您的姓名"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">邮箱</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userProfile.email}
                          onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                          placeholder="请输入您的邮箱"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">电话</Label>
                        <Input
                          id="phone"
                          value={userProfile.phone}
                          onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                          placeholder="请输入您的电话号码"
                        />
                      </div>
                      <div>
                        <Label htmlFor="education">最高学历</Label>
                        <Input
                          id="education"
                          value={userProfile.education}
                          onChange={(e) => setUserProfile({...userProfile, education: e.target.value})}
                          placeholder="如：本科、硕士、博士"
                        />
                      </div>
                      <div>
                        <Label htmlFor="major">专业</Label>
                        <Input
                          id="major"
                          value={userProfile.major}
                          onChange={(e) => setUserProfile({...userProfile, major: e.target.value})}
                          placeholder="请输入您的专业"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gpa">GPA/成绩</Label>
                        <Input
                          id="gpa"
                          value={userProfile.gpa}
                          onChange={(e) => setUserProfile({...userProfile, gpa: e.target.value})}
                          placeholder="如：3.8/4.0 或 85/100"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="experience">相关经历</Label>
                      <Textarea
                        id="experience"
                        value={userProfile.experience}
                        onChange={(e) => setUserProfile({...userProfile, experience: e.target.value})}
                        placeholder="请简述您的学术、研究或工作经历..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="goals">学习目标</Label>
                      <Textarea
                        id="goals"
                        value={userProfile.goals}
                        onChange={(e) => setUserProfile({...userProfile, goals: e.target.value})}
                        placeholder="请描述您的学习目标和职业规划..."
                        rows={4}
                      />
                    </div>

                    <Button onClick={handleProfileUpdate} className="w-full">
                      保存个人资料
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* 文档模版库 */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Book className="h-5 w-5 mr-2 text-green-600" />
                      文档模版库
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleDownloadTemplate('个人陈述')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        个人陈述模版
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleDownloadTemplate('推荐信')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        推荐信模版
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleDownloadTemplate('研究计划')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        研究计划模版
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleDownloadTemplate('简历')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        简历模版
                      </Button>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">付费服务</span>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                        <Upload className="h-4 w-4 mr-2" />
                        定制文档修改
                      </Button>
                      <p className="text-xs text-gray-600 mt-2">
                        专业顾问一对一修改您的申请文档
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* 简历上传 */}
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Upload className="h-5 w-5 mr-2 text-purple-600" />
                      简历上传
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">点击上传或拖拽文件至此</p>
                      <p className="text-xs text-gray-500">支持 PDF, DOC, DOCX 格式</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserPortal;
