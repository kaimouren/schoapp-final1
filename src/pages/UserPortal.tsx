import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calendar, DollarSign, MapPin, Heart, Download, ExternalLink, Award, CheckCircle, Clock, XCircle, FileText, User, Upload, Mail, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserPortalProps {
  onBack: () => void;
  savedScholarships: any[];
  appliedScholarships: any[];
  onOneClickApply: (scholarship: any) => void;
  user: any;
}

interface EducationRecord {
  id: string;
  schoolName: string;
  degree: string;
  major: string;
  status: string;
  gpa: string;
  startDate: string;
  endDate: string;
}

interface AwardRecord {
  id: string;
  awardName: string;
  institution: string;
  awardDate: string;
  description: string;
}

const UserPortal = ({ onBack, savedScholarships, appliedScholarships, onOneClickApply, user }: UserPortalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Enhanced user profile state
  const [userProfile, setUserProfile] = useState({
    // 基础信息
    name: user?.name || '',
    gender: '',
    birthDate: '',
    nationality: '',
    phone: '',
    email: user?.email || '',
    city: '',
    ieltsScore: '',
    toeflScore: '',
    personalStatement: '',
    resume: null as File | null
  });

  // 教育经历
  const [educationRecords, setEducationRecords] = useState<EducationRecord[]>([
    {
      id: '1',
      schoolName: '',
      degree: '',
      major: '',
      status: '',
      gpa: '',
      startDate: '',
      endDate: ''
    }
  ]);

  // 奖项荣誉
  const [awardRecords, setAwardRecords] = useState<AwardRecord[]>([
    {
      id: '1',
      awardName: '',
      institution: '',
      awardDate: '',
      description: ''
    }
  ]);

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

  const calculateDetailedProgress = () => {
    // 基础信息 (30%)
    const basicFields = [
      userProfile.name, userProfile.gender, userProfile.birthDate, 
      userProfile.nationality, userProfile.phone, userProfile.email, 
      userProfile.city
    ];
    const basicCompleted = basicFields.filter(field => field && field.trim() !== '').length;
    const basicProgress = (basicCompleted / basicFields.length) * 30;

    // 教育经历 (30%)
    const educationCompleted = educationRecords.filter(record => 
      record.schoolName && record.degree && record.major && record.status
    ).length;
    const educationProgress = educationRecords.length > 0 
      ? (educationCompleted / educationRecords.length) * 30 
      : 0;

    // 奖项荣誉 (20%)
    const awardCompleted = awardRecords.filter(record => 
      record.awardName && record.institution && record.awardDate
    ).length;
    const awardProgress = awardRecords.length > 0 
      ? (awardCompleted / awardRecords.length) * 20 
      : 0;

    // 简历上传 (20%)
    const resumeProgress = userProfile.resume ? 20 : 0;

    return {
      basic: Math.round(basicProgress),
      education: Math.round(educationProgress),
      awards: Math.round(awardProgress),
      resume: resumeProgress,
      total: Math.round(basicProgress + educationProgress + awardProgress + resumeProgress)
    };
  };

  const calculateDaysLeft = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const addEducationRecord = () => {
    const newRecord: EducationRecord = {
      id: Date.now().toString(),
      schoolName: '',
      degree: '',
      major: '',
      status: '',
      gpa: '',
      startDate: '',
      endDate: ''
    };
    setEducationRecords(prev => [...prev, newRecord]);
  };

  const updateEducationRecord = (id: string, field: keyof EducationRecord, value: string) => {
    setEducationRecords(prev => 
      prev.map(record => 
        record.id === id ? { ...record, [field]: value } : record
      )
    );
  };

  const removeEducationRecord = (id: string) => {
    if (educationRecords.length > 1) {
      setEducationRecords(prev => prev.filter(record => record.id !== id));
    }
  };

  const addAwardRecord = () => {
    const newRecord: AwardRecord = {
      id: Date.now().toString(),
      awardName: '',
      institution: '',
      awardDate: '',
      description: ''
    };
    setAwardRecords(prev => [...prev, newRecord]);
  };

  const updateAwardRecord = (id: string, field: keyof AwardRecord, value: string) => {
    setAwardRecords(prev => 
      prev.map(record => 
        record.id === id ? { ...record, [field]: value } : record
      )
    );
  };

  const removeAwardRecord = (id: string) => {
    if (awardRecords.length > 1) {
      setAwardRecords(prev => prev.filter(record => record.id !== id));
    }
  };

  const progress = calculateDetailedProgress();

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
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              我的资料
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              我的收藏 ({savedScholarships.length})
            </TabsTrigger>
            <TabsTrigger value="applied" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              我的申请 ({appliedScholarships.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">🎯 资料完成度：{progress.total}%</h3>
                    <p className="text-sm text-gray-600 mt-1">完善资料可显著提高申请成功率</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">📝 已提交申请：{appliedScholarships.length}/∞</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <Progress value={progress.total} className="h-3" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-700">基础信息</div>
                    <div className="text-2xl font-bold text-blue-600">{progress.basic}%</div>
                    <div className="text-xs text-gray-500">权重 30%</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="font-semibold text-green-700">教育经历</div>
                    <div className="text-2xl font-bold text-green-600">{progress.education}%</div>
                    <div className="text-xs text-gray-500">权重 30%</div>
                  </div>
                  <div className="text-center p-3 bg-amber-50 rounded-lg">
                    <div className="font-semibold text-amber-700">奖项荣誉</div>
                    <div className="text-2xl font-bold text-amber-600">{progress.awards}%</div>
                    <div className="text-xs text-gray-500">权重 20%</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="font-semibold text-purple-700">简历上传</div>
                    <div className="text-2xl font-bold text-purple-600">{progress.resume}%</div>
                    <div className="text-xs text-gray-500">权重 20%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  基础信息
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">姓名 *</Label>
                    <Input
                      id="name"
                      value={userProfile.name}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">性别 *</Label>
                    <Select onValueChange={(value) => setUserProfile(prev => ({ ...prev, gender: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择性别" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">男</SelectItem>
                        <SelectItem value="female">女</SelectItem>
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="birthDate">出生日期 *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={userProfile.birthDate}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, birthDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nationality">国籍 *</Label>
                    <Input
                      id="nationality"
                      value={userProfile.nationality}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, nationality: e.target.value }))}
                      placeholder="请输入您的国籍"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">手机号 *</Label>
                    <Input
                      id="phone"
                      value={userProfile.phone}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="请输入您的手机号"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">邮箱 *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="请输入您的邮箱"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">当前居住城市 *</Label>
                    <Input
                      id="city"
                      value={userProfile.city}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="请输入您的居住城市"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <Label htmlFor="ieltsScore">雅思成绩</Label>
                    <Input
                      id="ieltsScore"
                      value={userProfile.ieltsScore}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, ieltsScore: e.target.value }))}
                      placeholder="例：7.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="toeflScore">托福成绩</Label>
                    <Input
                      id="toeflScore"
                      value={userProfile.toeflScore}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, toeflScore: e.target.value }))}
                      placeholder="例：100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    教育经历
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addEducationRecord}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    添加教育经历
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {educationRecords.map((record, index) => (
                  <div key={record.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">教育经历 #{index + 1}</h4>
                      {educationRecords.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducationRecord(record.id)}
                          className="text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>学校名称 *</Label>
                        <Input
                          value={record.schoolName}
                          onChange={(e) => updateEducationRecord(record.id, 'schoolName', e.target.value)}
                          placeholder="请输入学校名称"
                        />
                      </div>
                      <div>
                        <Label>学历层级 *</Label>
                        <Select onValueChange={(value) => updateEducationRecord(record.id, 'degree', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="请选择学历层级" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bachelor">本科</SelectItem>
                            <SelectItem value="master">硕士</SelectItem>
                            <SelectItem value="phd">博士</SelectItem>
                            <SelectItem value="other">其他</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>所学专业 *</Label>
                        <Input
                          value={record.major}
                          onChange={(e) => updateEducationRecord(record.id, 'major', e.target.value)}
                          placeholder="请输入专业名称"
                        />
                      </div>
                      <div>
                        <Label>当前状态 *</Label>
                        <Select onValueChange={(value) => updateEducationRecord(record.id, 'status', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="请选择状态" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="studying">在读</SelectItem>
                            <SelectItem value="graduated">已毕业</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>平均成绩 (GPA)</Label>
                        <Input
                          value={record.gpa}
                          onChange={(e) => updateEducationRecord(record.id, 'gpa', e.target.value)}
                          placeholder="例：3.8/4.0"
                        />
                      </div>
                      <div>
                        <Label>入学时间</Label>
                        <Input
                          type="date"
                          value={record.startDate}
                          onChange={(e) => updateEducationRecord(record.id, 'startDate', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>毕业时间</Label>
                        <Input
                          type="date"
                          value={record.endDate}
                          onChange={(e) => updateEducationRecord(record.id, 'endDate', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    奖项荣誉
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addAwardRecord}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    添加奖项
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {awardRecords.map((record, index) => (
                  <div key={record.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">奖项 #{index + 1}</h4>
                      {awardRecords.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAwardRecord(record.id)}
                          className="text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>奖项名称 *</Label>
                        <Input
                          value={record.awardName}
                          onChange={(e) => updateAwardRecord(record.id, 'awardName', e.target.value)}
                          placeholder="请输入奖项名称"
                        />
                      </div>
                      <div>
                        <Label>授予机构 *</Label>
                        <Input
                          value={record.institution}
                          onChange={(e) => updateAwardRecord(record.id, 'institution', e.target.value)}
                          placeholder="请输入授予机构"
                        />
                      </div>
                      <div>
                        <Label>获奖日期 *</Label>
                        <Input
                          type="date"
                          value={record.awardDate}
                          onChange={(e) => updateAwardRecord(record.id, 'awardDate', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>简短描述 (不超过50字)</Label>
                        <Textarea
                          value={record.description}
                          onChange={(e) => updateAwardRecord(record.id, 'description', e.target.value)}
                          placeholder="请简短描述获奖情况"
                          rows={2}
                          maxLength={50}
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {record.description.length}/50
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  补充材料
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  <Label htmlFor="resume">简历上传 *</Label>
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
                  保存资料
                </Button>
              </CardContent>
            </Card>

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
          </TabsContent>

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
