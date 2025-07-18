
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, Calendar, DollarSign, MapPin, Award, Upload, FileText, CheckCircle, Sparkles, Crown, Heart } from "lucide-react";
import PricingModal from "@/components/PricingModal";

interface ScholarshipDetailsProps {
  scholarship: any;
  onBack: () => void;
  onSaveScholarship?: (scholarship: any) => void;
  onOneClickApply?: (scholarship: any) => void;
  isSaved?: boolean;
}

const ScholarshipDetails = ({ scholarship, onBack, onSaveScholarship, onOneClickApply, isSaved }: ScholarshipDetailsProps) => {
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File[]}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  
  // 模拟用户订阅状态 - 实际应用中应该从用户状态获取
  const [hasPremium, setHasPremium] = useState(false);

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleFileUpload = (documentType: string, files: FileList | null) => {
    if (files) {
      setUploadedFiles(prev => ({
        ...prev,
        [documentType]: Array.from(files)
      }));
    }
  };

  const handleAIAssist = (questionIndex: number) => {
    if (!hasPremium) {
      setShowPricing(true);
      return;
    }
    
    // AI生成逻辑 - 基于用户已有资料生成文字
    const generatedText = `基于您的背景和经历，我建议您这样回答：这是一个由AI生成的示例回答，展示了如何更好地展示您的能力和经验...`;
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: generatedText
    }));
  };

  const handleSubmit = () => {
    // 这里可以添加提交逻辑
    console.log('提交的答案:', answers);
    console.log('上传的文件:', uploadedFiles);
    setIsSubmitted(true);
  };

  const handleSaveToggle = () => {
    if (onSaveScholarship) {
      onSaveScholarship(scholarship);
    }
  };

  const handleOneClickApply = () => {
    if (onOneClickApply) {
      onOneClickApply(scholarship);
    }
  };

  const isFormComplete = () => {
    const answersComplete = scholarship.questions?.every((_, index) => answers[index]?.trim());
    const documentsComplete = scholarship.requiredDocuments?.every(doc => uploadedFiles[doc]?.length > 0);
    return answersComplete && documentsComplete;
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50 text-center">
            <CardContent className="p-12">
              <div className="flex justify-center mb-6">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">申请已提交</h2>
              <p className="text-lg text-gray-600 mb-8">
                太棒了！您的 {scholarship.name} 申请已成功提交。申请已提交，预计7天内反馈。我们会第一时间通知你结果！
              </p>
              <div className="flex justify-center gap-4">
                <Button onClick={onBack} size="lg" className="bg-blue-600 hover:bg-blue-700">
                  返回奖学金列表
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={onBack}
              className="mr-4 hover:bg-blue-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回列表
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">奖学金申请</h1>
              <p className="text-gray-600 mt-1">请完成以下申请材料</p>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-3">
            {onSaveScholarship && (
              <Button
                variant="outline"
                onClick={handleSaveToggle}
                className={`flex items-center gap-2 ${isSaved ? 'bg-red-50 text-red-600 border-red-200' : 'hover:bg-gray-50'}`}
              >
                <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? '取消收藏' : '收藏'}
              </Button>
            )}
            
            {onOneClickApply && (
              <Button
                onClick={handleOneClickApply}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                ⚡ 一键申请
              </Button>
            )}
          </div>
        </div>

        {/* 奖学金信息卡片 */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="h-6 w-6 text-yellow-500" />
                  <CardTitle className="text-2xl">{scholarship.name}</CardTitle>
                </div>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{scholarship.university} • {scholarship.country}</span>
                  </div>
                  <Badge variant="outline">{scholarship.type}</Badge>
                </div>
                <p className="text-gray-700">{scholarship.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">{scholarship.amount}</div>
                <div className="text-sm text-gray-500">每年</div>
                <div className="flex items-center gap-1 mt-2 text-red-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">{scholarship.deadline}</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* 申请问题 */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              申请问题
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {scholarship.questions?.map((question, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`question-${index}`} className="text-base font-medium">
                    {index + 1}. {question}
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAIAssist(index)}
                          className="flex items-center gap-1 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600"
                        >
                          <Sparkles className="h-3 w-3" />
                          AI助力
                          {!hasPremium && <Crown className="h-3 w-3" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>AI助力，帮您更好展示自己</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Textarea
                  id={`question-${index}`}
                  placeholder="请在此输入您的回答..."
                  value={answers[index] || ''}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="min-h-[120px] resize-none"
                />
                <div className="text-xs text-gray-500">
                  已输入 {answers[index]?.length || 0} 字符
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 文件上传 */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-600" />
              申请材料上传
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {scholarship.requiredDocuments?.map((document, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`file-${index}`} className="text-base font-medium">
                  {document} *
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                  <Input
                    id={`file-${index}`}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={(e) => handleFileUpload(document, e.target.files)}
                    className="hidden"
                  />
                  <label
                    htmlFor={`file-${index}`}
                    className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-600">点击上传文件</span>
                    <span className="text-xs text-gray-400">支持 PDF, DOC, DOCX, JPG, PNG 格式</span>
                  </label>
                </div>
                {uploadedFiles[document] && uploadedFiles[document].length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-green-600 mb-1">已上传文件：</p>
                    {uploadedFiles[document].map((file, fileIndex) => (
                      <div key={fileIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="h-4 w-4" />
                        <span>{file.name}</span>
                        <span className="text-xs text-gray-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 提交按钮 */}
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={!isFormComplete()}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            提交申请
          </Button>
        </div>

        {!isFormComplete() && (
          <p className="text-center text-sm text-gray-500 mt-4">
            请完成所有问题回答并上传必需文件后提交申请
          </p>
        )}
      </div>

      {/* 付费弹窗 */}
      <PricingModal 
        isOpen={showPricing} 
        onClose={() => setShowPricing(false)}
        onSubscribe={(plan) => {
          setHasPremium(true);
          setShowPricing(false);
        }}
      />
    </div>
  );
};

export default ScholarshipDetails;
