
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, Crown, Sparkles, Star, Zap } from "lucide-react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (plan: string) => void;
}

const PricingModal = ({ isOpen, onClose, onSubscribe }: PricingModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');

  const plans = [
    {
      id: 'basic',
      name: '基础版',
      price: '¥59',
      period: '/月',
      description: '适合偶尔申请奖学金的用户',
      features: [
        'AI文书优化 5次/月',
        '基础模板库',
        '邮件提醒',
        '标准客服支持'
      ],
      icon: <Star className="h-6 w-6" />,
      popular: false
    },
    {
      id: 'premium',
      name: '高级版',
      price: '¥129',
      period: '/月',
      description: '最受欢迎的选择，功能全面',
      features: [
        'AI文书优化 无限次',
        '高级模板库',
        '个性化推荐',
        '一对一指导',
        '优先客服支持',
        '成功案例分析'
      ],
      icon: <Crown className="h-6 w-6" />,
      popular: true
    },
    {
      id: 'pro',
      name: '专业版',
      price: '¥259',
      period: '/月',
      description: '适合需要专业指导的用户',
      features: [
        '包含高级版所有功能',
        '专业导师一对一',
        '定制化申请策略',
        '面试辅导',
        '全程跟踪服务',
        '成功保障计划'
      ],
      icon: <Zap className="h-6 w-6" />,
      popular: false
    }
  ];

  const handleSubscribe = (planId: string) => {
    // 这里应该集成真实的支付逻辑
    console.log('订阅计划:', planId);
    onSubscribe(planId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            选择您的AI助力计划
          </DialogTitle>
          <p className="text-gray-600 text-center">
            解锁AI文书优化功能，让您的申请更出色
          </p>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative border-2 transition-all duration-300 hover:shadow-lg ${
                selectedPlan === plan.id 
                  ? 'border-blue-500 shadow-lg' 
                  : 'border-gray-200'
              } ${plan.popular ? 'scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                    最受欢迎
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-3">
                  <div className={`p-3 rounded-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-100 to-purple-100' 
                      : 'bg-gray-100'
                  }`}>
                    {plan.icon}
                  </div>
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-1 mt-2">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  {selectedPlan === plan.id ? '选择此计划' : '立即订阅'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
            <Sparkles className="h-4 w-4" />
            <span>所有计划都包含7天免费试用期</span>
          </div>
          <p className="text-xs text-gray-500">
            订阅后可随时取消，未使用的时间将按比例退款
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;
