import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, User, GraduationCap, Target, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InteractiveFormProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  user: any;
}

const InteractiveForm = ({ onSubmit, onBack, user }: InteractiveFormProps) => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResumeUpload, setShowResumeUpload] = useState(true);
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    education: "",
    gpa: "",
    targetCountry: "",
    major: ""
  });

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('word'))) {
      setUploadedResume(file);
      
      // Simulate AI extraction of resume data
      setTimeout(() => {
        const mockExtractedData = {
          name: "张三",
          education: "bachelor",
          gpa: "3.7",
          major: "computer-science"
        };
        setExtractedData(mockExtractedData);
        setFormData(prev => ({ ...prev, ...mockExtractedData }));
        toast({
          title: "简历上传成功",
          description: "系统已自动提取您的信息，请核对并确认",
        });
      }, 2000);
    } else {
      toast({
        title: "文件格式不支持",
        description: "请上传PDF或Word格式的简历",
        variant: "destructive"
      });
    }
  };

  const handleSkipUpload = () => {
    setShowResumeUpload(false);
  };

  const handleConfirmExtractedData = () => {
    setShowResumeUpload(false);
    setCurrentQuestion(4); // Jump to the 5th question (target country)
  };

  if (showResumeUpload) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={onBack}
              className="hover:bg-purple-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回首页
            </Button>
          </div>

          <Card className="shadow-xl border-0 mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 p-3 rounded-full mr-4">
                  <Upload className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">上传简历 (可选)</h2>
                  <p className="text-blue-100 mt-1">上传简历可以帮助我们快速提取您的信息</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {!uploadedResume ? (
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <Label htmlFor="resume-upload" className="cursor-pointer">
                      <span className="text-lg font-medium text-gray-700">点击上传简历</span>
                      <p className="text-sm text-gray-500 mt-2">支持PDF或Word格式，最大5MB</p>
                    </Label>
                    <Input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="hidden"
                    />
                  </div>
                  
                  <div className="text-center">
                    <Button
                      variant="outline"
                      onClick={handleSkipUpload}
                      className="px-8 py-3"
                    >
                      跳过，手动填写信息
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {!extractedData ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">正在解析简历中...</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h3 className="text-lg font-semibold text-green-800 mb-3">已提取信息，请核对确认：</h3>
                        <div className="grid gap-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">姓名：</span>
                            <span className="font-medium">{extractedData.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">学历：</span>
                            <span className="font-medium">
                              {extractedData.education === 'bachelor' ? '本科' : 
                               extractedData.education === 'master' ? '硕士' : 
                               extractedData.education === 'phd' ? '博士' : '高中'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">GPA：</span>
                            <span className="font-medium">{extractedData.gpa}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">专业：</span>
                            <span className="font-medium">计算机科学</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <Button
                          onClick={handleConfirmExtractedData}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        >
                          确认信息，继续
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleSkipUpload}
                          className="flex-1"
                        >
                          手动填写
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="text-center text-gray-600">
            欢迎，{user?.name || user?.email || '用户'}！
          </div>
        </div>
      </div>
    );
  }

  const questions = [
    {
      id: 'name',
      title: '请告诉我们您的姓名',
      description: '这将帮助我们为您提供个性化的服务',
      icon: User,
      color: 'blue',
      scholarshipCount: 1000,
      component: (
        <div className="space-y-2">
          <Label htmlFor="name">姓名</Label>
          <Input
            id="name"
            placeholder="请输入您的姓名"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="h-12 text-lg"
            autoFocus
          />
        </div>
      )
    },
    {
      id: 'education',
      title: '您目前的学历是什么？',
      description: '这将帮助我们匹配适合您学历层次的奖学金项目',
      icon: GraduationCap,
      color: 'green',
      scholarshipCount: 856,
      component: (
        <div className="space-y-2">
          <Label>学历</Label>
          <Select value={formData.education} onValueChange={(value) => setFormData(prev => ({ ...prev, education: value }))}>
            <SelectTrigger className="h-12 text-lg">
              <SelectValue placeholder="请选择您的学历" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-school">高中</SelectItem>
              <SelectItem value="bachelor">本科</SelectItem>
              <SelectItem value="master">硕士</SelectItem>
              <SelectItem value="phd">博士</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    },
    {
      id: 'gpa',
      title: '您的GPA或平均分是多少？',
      description: '学术成绩是奖学金评定的重要标准',
      icon: GraduationCap,
      color: 'purple',
      scholarshipCount: 742,
      component: (
        <div className="space-y-2">
          <Label htmlFor="gpa">GPA/平均分</Label>
          <Input
            id="gpa"
            placeholder="例如：3.8 或 85分"
            value={formData.gpa}
            onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
            className="h-12 text-lg"
            autoFocus
          />
        </div>
      )
    },
    {
      id: 'major',
      title: '您的专业领域是什么？',
      description: '不同专业有专门的奖学金项目',
      icon: Target,
      color: 'indigo',
      scholarshipCount: 623,
      component: (
        <div className="space-y-2">
          <Label>专业</Label>
          <Select value={formData.major} onValueChange={(value) => setFormData(prev => ({ ...prev, major: value }))}>
            <SelectTrigger className="h-12 text-lg">
              <SelectValue placeholder="请选择您的专业领域" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="computer-science">计算机科学</SelectItem>
              <SelectItem value="engineering">工程学</SelectItem>
              <SelectItem value="business">商科</SelectItem>
              <SelectItem value="medicine">医学</SelectItem>
              <SelectItem value="law">法学</SelectItem>
              <SelectItem value="arts">文科</SelectItem>
              <SelectItem value="science">理科</SelectItem>
              <SelectItem value="education">教育学</SelectItem>
              <SelectItem value="other">其他</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    },
    {
      id: 'targetCountry',
      title: '您希望去哪个国家留学？',
      description: '我们将为您匹配目标国家的奖学金项目',
      icon: Target,
      color: 'orange',
      scholarshipCount: 445,
      component: (
        <div className="space-y-2">
          <Label>目标国家</Label>
          <Select value={formData.targetCountry} onValueChange={(value) => setFormData(prev => ({ ...prev, targetCountry: value }))}>
            <SelectTrigger className="h-12 text-lg">
              <SelectValue placeholder="请选择您的目标留学国家" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usa">美国</SelectItem>
              <SelectItem value="uk">英国</SelectItem>
              <SelectItem value="canada">加拿大</SelectItem>
              <SelectItem value="australia">澳大利亚</SelectItem>
              <SelectItem value="germany">德国</SelectItem>
              <SelectItem value="france">法国</SelectItem>
              <SelectItem value="singapore">新加坡</SelectItem>
              <SelectItem value="other">其他</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    }
  ];

  const currentQ = questions[currentQuestion];
  const IconComponent = currentQ.icon;

  const isCurrentQuestionValid = () => {
    const value = formData[currentQ.id as keyof typeof formData];
    return value && value.trim() !== '';
  };

  const handleNext = () => {
    if (!isCurrentQuestionValid()) {
      toast({
        title: "请完成当前问题",
        description: "请填写完整信息后继续",
        variant: "destructive"
      });
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      toast({
        title: "信息提交成功",
        description: "正在为您匹配最适合的奖学金项目...",
      });

      setTimeout(() => {
        onSubmit(formData);
      }, 1500);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={currentQuestion === 0 ? onBack : handlePrevious}
            className="hover:bg-purple-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {currentQuestion === 0 ? '返回首页' : '上一题'}
          </Button>
          <div className="text-sm text-gray-600">
            问题 {currentQuestion + 1} / {questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>完成进度</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-xl border-0 mb-8">
          <CardHeader className={`bg-gradient-to-r from-${currentQ.color}-600 to-${currentQ.color}-700 text-white rounded-t-lg`}>
            <div className="flex items-center mb-4">
              <div className={`bg-${currentQ.color}-500 p-3 rounded-full mr-4`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{currentQ.title}</h2>
                <p className="text-${currentQ.color}-100 mt-1">{currentQ.description}</p>
              </div>
            </div>
            <div className="text-sm text-${currentQ.color}-100">
              📊 {currentQ.scholarshipCount}+ 个奖学金项目需要此信息
            </div>
          </CardHeader>
          <CardContent className="p-8">
            {currentQ.component}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-end">
          <Button 
            onClick={handleNext}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={!isCurrentQuestionValid()}
          >
            {currentQuestion === questions.length - 1 ? '完成匹配' : '下一题'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* User Info */}
        <div className="mt-8 text-center text-gray-600">
          欢迎，{user?.name || user?.email || '用户'}！
        </div>
      </div>
    </div>
  );
};

export default InteractiveForm;
