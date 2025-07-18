import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Download, Star, Crown, Users, Eye, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PricingModal from "./PricingModal";

interface TemplateCenterProps {
  onBack: () => void;
}

const TemplateCenter = ({ onBack }: TemplateCenterProps) => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPricing, setShowPricing] = useState(false);
  const [hasPremium, setHasPremium] = useState(false);

  const templates = [
    {
      id: 1,
      title: "个人陈述模板 - 商科申请",
      description: "适合商学院申请的个人陈述模板，包含结构指导和示例内容",
      type: "个人陈述",
      category: "商科",
      downloads: 1234,
      rating: 4.8,
      isPremium: false,
      tags: ["商科", "MBA", "经典结构"],
      preview: "我选择商科的原因源于对商业世界的深度思考...",
    },
    {
      id: 2,
      title: "推荐信模板 - 导师推荐",
      description: "教授推荐信的标准模板，帮助导师更好地为你写推荐信",
      type: "推荐信",
      category: "通用",
      downloads: 987,
      rating: 4.9,
      isPremium: false,
      tags: ["导师推荐", "学术", "研究生"],
      preview: "作为XXX的导师，我很荣幸为他/她提供推荐...",
    },
    {
      id: 3,
      title: "奖学金申请书 - STEM专业",
      description: "专为STEM专业设计的奖学金申请书模板",
      type: "申请书",
      category: "STEM",
      downloads: 756,
      rating: 4.7,
      isPremium: true,
      tags: ["STEM", "理工科", "奖学金"],
      preview: "在科技快速发展的今天，我深深感受到...",
    },
    {
      id: 4,
      title: "CV模板 - 学术版",
      description: "适合学术申请的简历模板，突出研究经历和学术成果",
      type: "简历",
      category: "学术",
      downloads: 2341,
      rating: 4.6,
      isPremium: false,
      tags: ["学术简历", "研究经历", "博士申请"],
      preview: "个人信息\\n姓名：XXX\\n专业：XXX...",
    },
    {
      id: 5,
      title: "研究计划书模板",
      description: "博士申请和研究型硕士必备的研究计划书模板",
      type: "研究计划",
      category: "学术",
      downloads: 645,
      rating: 4.9,
      isPremium: true,
      tags: ["博士", "研究计划", "学术"],
      preview: "研究背景与意义\\n在XXX领域中...",
    },
    {
      id: 6,
      title: "动机信模板 - 艺术类",
      description: "艺术类专业申请的动机信模板，强调创意和个人风格",
      type: "动机信",
      category: "艺术",
      downloads: 432,
      rating: 4.5,
      isPremium: true,
      tags: ["艺术", "创意", "个人风格"],
      preview: "艺术对我而言不仅仅是一种表达方式...",
    }
  ];

  const handleDownload = (template: any) => {
    if (template.isPremium && !hasPremium) {
      setShowPricing(true);
      return;
    }

    // 模拟下载
    toast({
      title: "下载成功！",
      description: `${template.title} 已下载到您的设备`,
    });
  };

  const handlePreview = (template: any) => {
    setSelectedTemplate(template);
  };

  const customizeTemplate = (template: any) => {
    if (!hasPremium) {
      setShowPricing(true);
      return;
    }
    
    toast({
      title: "定制服务已启动",
      description: "我们的专业团队将在24小时内联系您",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
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
            <h1 className="text-3xl font-bold text-gray-900">文书模板中心</h1>
            <p className="text-gray-600 mt-1">不知道怎么写文书？我们先帮你起个头</p>
          </div>
        </div>

        {/* Encouragement Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">✨ 让写作变得简单</h2>
          <p className="text-lg opacity-90">
            精心设计的模板 + AI智能助手 = 完美的申请文书
          </p>
        </div>

        {/* Template Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {templates.map((template) => (
            <Card key={template.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      {template.isPremium && <Crown className="h-4 w-4 text-yellow-500" />}
                    </div>
                    <Badge variant="outline" className="mb-2">{template.type}</Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.map((tag: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      <span>{template.downloads}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{template.rating}</span>
                    </div>
                  </div>
                  {template.isPremium && (
                    <Badge className="bg-yellow-500 text-white text-xs">
                      Premium
                    </Badge>
                  )}
                </div>
                
                {/* Actions */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(template)}
                      className="flex-1"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      预览
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDownload(template)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      下载
                    </Button>
                  </div>
                  
                  {template.isPremium && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => customizeTemplate(template)}
                      className="w-full border-yellow-300 text-yellow-600 hover:bg-yellow-50"
                    >
                      <Crown className="h-3 w-3 mr-1" />
                      定制修改
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Premium Features */}
        <Card className="border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardContent className="p-6 text-center">
            <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">升级到Premium获得更多</h3>
            <p className="text-gray-600 mb-4">
              • 所有高级模板免费下载<br/>
              • 一对一文书定制修改服务<br/>
              • AI智能文书优化建议<br/>
              • 24小时专家在线答疑
            </p>
            <Button
              onClick={() => setShowPricing(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              立即升级 Premium
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTemplate?.title}</DialogTitle>
            <DialogDescription>
              {selectedTemplate?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="font-medium mb-2">模板预览：</h4>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {selectedTemplate?.preview}
              </p>
              <div className="text-xs text-gray-500 mt-2">
                ... 完整版本请下载查看
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                onClick={() => handleDownload(selectedTemplate)}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                下载完整模板
              </Button>
              {selectedTemplate?.isPremium && (
                <Button
                  variant="outline"
                  onClick={() => customizeTemplate(selectedTemplate)}
                  className="flex-1 border-yellow-300 text-yellow-600"
                >
                  定制修改
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pricing Modal */}
      <PricingModal 
        isOpen={showPricing} 
        onClose={() => setShowPricing(false)}
        onSubscribe={(plan) => {
          setHasPremium(true);
          setShowPricing(false);
          toast({
            title: "升级成功！",
            description: "欢迎成为Premium用户，享受全部高级功能",
          });
        }}
      />
    </div>
  );
};

export default TemplateCenter;