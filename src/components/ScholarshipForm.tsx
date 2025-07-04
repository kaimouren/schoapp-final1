
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, User, GraduationCap, Target, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScholarshipFormProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
}

const ScholarshipForm = ({ onSubmit, onBack }: ScholarshipFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    education: "",
    gpa: "",
    targetCountry: "",
    major: "",
    economicSituation: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form - economicSituation is now optional
    if (!formData.name || !formData.education || !formData.gpa || !formData.targetCountry || !formData.major) {
      toast({
        title: "请完善所有信息",
        description: "请填写完整的申请信息以获得更精准的匹配结果",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "信息提交成功",
      description: "正在为您匹配最适合的奖学金项目...",
    });

    // Simulate processing delay
    setTimeout(() => {
      onSubmit(formData);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mr-4 hover:bg-blue-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回首页
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">奖学金申请信息</h1>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">
              填写您的申请信息
            </CardTitle>
            <p className="text-center text-blue-100 mt-2">
              请准确填写以下信息，我们将为您匹配最适合的奖学金项目
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <User className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">个人信息</h3>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">姓名 *</Label>
                  <Input
                    id="name"
                    placeholder="请输入您的姓名"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <GraduationCap className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">学术信息</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="education">学历 *</Label>
                    <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
                      <SelectTrigger className="h-12">
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

                  <div className="space-y-2">
                    <Label htmlFor="gpa">GPA/平均分 *</Label>
                    <Input
                      id="gpa"
                      placeholder="例如：3.8 或 85分"
                      value={formData.gpa}
                      onChange={(e) => handleInputChange('gpa', e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="major">专业 *</Label>
                  <Select value={formData.major} onValueChange={(value) => handleInputChange('major', value)}>
                    <SelectTrigger className="h-12">
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
              </div>

              {/* Target Information */}
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <Target className="h-5 w-5 text-purple-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">留学意向</h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetCountry">目标国家 *</Label>
                  <Select value={formData.targetCountry} onValueChange={(value) => handleInputChange('targetCountry', value)}>
                    <SelectTrigger className="h-12">
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
              </div>

              {/* Economic Information - now optional */}
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <DollarSign className="h-5 w-5 text-orange-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">经济情况</h3>
                  <span className="text-sm text-gray-500 ml-2">(可选)</span>
                </div>

                <div className="space-y-2">
                  <Label>家庭经济情况</Label>
                  <RadioGroup 
                    value={formData.economicSituation} 
                    onValueChange={(value) => handleInputChange('economicSituation', value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low">经济困难，急需资助</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">中等收入，希望减轻负担</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high">经济条件较好，寻求优秀奖学金</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                开始匹配奖学金
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScholarshipForm;
