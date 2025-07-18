import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, MapPin, Award, Clock, Users, Heart, Zap } from "lucide-react";

interface FeaturedScholarshipsProps {
  onViewDetails: (scholarship: any) => void;
  onSaveScholarship: (scholarship: any) => void;
  savedScholarships: any[];
}

const FeaturedScholarships = ({ onViewDetails, onSaveScholarship, savedScholarships }: FeaturedScholarshipsProps) => {
  const featuredScholarships = [
    {
      id: 101,
      name: "全球青年领袖奖学金",
      university: "斯坦福大学",
      country: "美国",
      amount: "$50,000/年",
      deadline: "2024年12月15日",
      matchRate: 95,
      type: "全额奖学金",
      tags: ["热门", "全额支持", "含生活津贴"],
      description: "面向有领导潜力的优秀国际学生，涵盖全部学费及生活补贴。",
      isHot: true,
      daysLeft: 28,
      applicants: 234
    },
    {
      id: 102,
      name: "创新科技奖学金",
      university: "MIT",
      country: "美国",
      amount: "$45,000/年",
      deadline: "2024年11月30日",
      matchRate: 88,
      type: "STEM奖学金",
      tags: ["适合本科新生", "STEM专业", "快截止了"],
      description: "专为科技创新领域的杰出学生设立。",
      isUrgent: true,
      daysLeft: 13,
      applicants: 189
    },
    {
      id: 103,
      name: "国际交流奖学金",
      university: "牛津大学",
      country: "英国",
      amount: "£35,000/年",
      deadline: "2025年1月20日",
      matchRate: 85,
      type: "交流奖学金",
      tags: ["文化交流", "语言优势", "欧洲机会"],
      description: "促进中英文化交流的优秀奖学金项目。",
      isRecommended: true,
      daysLeft: 63,
      applicants: 156
    }
  ];

  const isScholarshipSaved = (scholarshipId: number) => {
    return savedScholarships.some(s => s.id === scholarshipId);
  };

  const toggleSaved = (scholarship: any) => {
    onSaveScholarship(scholarship);
  };

  const convertToRMB = (amount: string) => {
    const numAmount = parseInt(amount.replace(/[^0-9]/g, ''));
    let rate = 7.3; // 默认美元汇率
    
    if (amount.includes('£')) rate = 9.2;
    else if (amount.includes('CAD')) rate = 5.4;
    else if (amount.includes('AUD')) rate = 4.8;
    else if (amount.includes('€')) rate = 7.8;
    
    const rmbAmount = (numAmount * rate / 10000).toFixed(1);
    return `约合人民币${rmbAmount}万元`;
  };

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">精选奖学金推荐</h2>
        <p className="text-xl text-gray-600">
          这些可能正是你在寻找的机会，不要让它们溜走！
        </p>
      </div>
      
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
        {featuredScholarships.map((scholarship, index) => (
          <Card 
            key={scholarship.id} 
            className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
              scholarship.isHot ? 'border-2 border-orange-400 bg-gradient-to-br from-orange-50 to-red-50' :
              scholarship.isUrgent ? 'border-2 border-red-400 bg-gradient-to-br from-red-50 to-pink-50' :
              scholarship.isRecommended ? 'border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50' : ''
            }`}
          >
            {/* Status badges */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              {scholarship.isHot && (
                <Badge className="bg-orange-500 text-white animate-pulse">
                  🔥 热门
                </Badge>
              )}
              {scholarship.isUrgent && (
                <Badge className="bg-red-500 text-white animate-pulse">
                  ⏰ 快截止了
                </Badge>
              )}
              {scholarship.isRecommended && (
                <Badge className="bg-blue-500 text-white">
                  ⭐ 推荐
                </Badge>
              )}
            </div>

            {/* Bookmark Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 left-4 z-10"
              onClick={() => toggleSaved(scholarship)}
            >
              <Heart 
                className={`h-5 w-5 ${isScholarshipSaved(scholarship.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
              />
            </Button>

            <CardHeader className="pt-16 pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="h-6 w-6 text-yellow-500" />
                    <CardTitle className="text-lg">{scholarship.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{scholarship.university} • {scholarship.country}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-500">本月{scholarship.applicants}人申请</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">{scholarship.amount}</div>
                  <div className="text-xs text-green-500">{convertToRMB(scholarship.amount)}</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-700 mb-4 text-sm">{scholarship.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {scholarship.tags.map((tag: string, idx: number) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Deadline info */}
              <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600 font-medium">{scholarship.deadline}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-orange-500" />
                  <span className="text-xs text-orange-600">还剩{scholarship.daysLeft}天</span>
                </div>
              </div>

              {scholarship.daysLeft <= 15 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 mb-4">
                  <p className="text-xs text-orange-800 font-medium">
                    ⚠️ 还剩{scholarship.daysLeft}天就截止，建议尽快准备！
                  </p>
                </div>
              )}
              
              <Button
                onClick={() => onViewDetails(scholarship)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
              >
                <Zap className="h-4 w-4" />
                一键申请
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <p className="text-gray-600 italic">
          "这可能就是你期待已久的机会" - 不要让好机会溜走！
        </p>
      </div>
    </div>
  );
};

export default FeaturedScholarships;