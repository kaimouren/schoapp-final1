import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, ArrowRight, Star, MapPin, Calendar, Target, DollarSign, Users, Clock, FileText, Award } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import InteractiveForm from "@/components/InteractiveForm";
import ScholarshipResults from "@/components/ScholarshipResults";
import ScholarshipDetails from "@/components/ScholarshipDetails";
import UserPortal from "./UserPortal";
import UserMenu from "@/components/UserMenu";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'auth' | 'form' | 'results' | 'details' | 'portal'>('home');
  const [formData, setFormData] = useState(null);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [user, setUser] = useState(null);
  const [hasVisitedResults, setHasVisitedResults] = useState(false);
  const [savedScholarships, setSavedScholarships] = useState<any[]>([]);
  const [appliedScholarships, setAppliedScholarships] = useState<any[]>([]);
  const { toast } = useToast();

  const handleStartMatching = () => {
    setCurrentPage('auth');
  };

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    setCurrentPage('form');
  };

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    setCurrentPage('results');
    setHasVisitedResults(true);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setFormData(null);
    setSelectedScholarship(null);
    setUser(null);
    setHasVisitedResults(false);
  };

  const handleViewDetails = (scholarship: any) => {
    setSelectedScholarship(scholarship);
    setCurrentPage('details');
  };

  const handleBackToResults = () => {
    setCurrentPage('results');
    setSelectedScholarship(null);
  };

  const handlePortalClick = () => {
    setCurrentPage('portal');
  };

  const handleBackFromPortal = () => {
    if (hasVisitedResults) {
      setCurrentPage('results');
    } else {
      setCurrentPage('home');
    }
  };

  const handleSaveScholarship = (scholarship: any) => {
    setSavedScholarships(prev => {
      const exists = prev.find(s => s.id === scholarship.id);
      if (exists) {
        return prev.filter(s => s.id !== scholarship.id);
      } else {
        return [...prev, scholarship];
      }
    });
  };

  const handleOneClickApply = (scholarship: any) => {
    const applicationRecord = {
      ...scholarship,
      status: '已提交',
      submittedDate: new Date().toLocaleDateString('zh-CN')
    };
    
    setAppliedScholarships(prev => {
      const exists = prev.find(s => s.id === scholarship.id);
      if (exists) {
        return prev;
      }
      return [...prev, applicationRecord];
    });

    toast({
      title: "申请已成功提交！",
      description: `您已成功申请 ${scholarship.name}`,
    });
  };

  const isScholarshipSaved = (scholarshipId: number) => {
    return savedScholarships.some(s => s.id === scholarshipId);
  };

  // 只在用户已经登录（完成认证或表单）时显示用户菜单
  const showUserMenu = user && (currentPage === 'results' || currentPage === 'details' || currentPage === 'portal');

  if (currentPage === 'auth') {
    return <AuthModal onSuccess={handleAuthSuccess} onBack={handleBackToHome} />;
  }

  if (currentPage === 'form') {
    return <InteractiveForm onSubmit={handleFormSubmit} onBack={handleBackToHome} user={user} />;
  }

  if (currentPage === 'results') {
    return (
      <>
        {showUserMenu && (
          <UserMenu 
            savedCount={savedScholarships.length}
            appliedCount={appliedScholarships.length}
            onPortalClick={handlePortalClick}
            user={user}
          />
        )}
        <ScholarshipResults 
          formData={formData} 
          onBack={handleBackToHome} 
          onViewDetails={handleViewDetails} 
          showInitialLoader={!hasVisitedResults}
          onSaveScholarship={handleSaveScholarship}
          onOneClickApply={handleOneClickApply}
          savedScholarships={savedScholarships}
        />
      </>
    );
  }

  if (currentPage === 'details') {
    return (
      <>
        {showUserMenu && (
          <UserMenu 
            savedCount={savedScholarships.length}
            appliedCount={appliedScholarships.length}
            onPortalClick={handlePortalClick}
            user={user}
          />
        )}
        <ScholarshipDetails 
          scholarship={selectedScholarship} 
          onBack={handleBackToResults}
          onSaveScholarship={handleSaveScholarship}
          onOneClickApply={handleOneClickApply}
          isSaved={isScholarshipSaved(selectedScholarship?.id)}
        />
      </>
    );
  }

  if (currentPage === 'portal') {
    return (
      <UserPortal 
        onBack={handleBackFromPortal}
        savedScholarships={savedScholarships}
        appliedScholarships={appliedScholarships}
        onOneClickApply={handleOneClickApply}
        user={user}
      />
    );
  }

  const successCases = [
    {
      name: "李明",
      scholarship: "哈佛大学全额奖学金",
      amount: "$75,000",
      major: "计算机科学",
      country: "美国",
      year: "2024",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "王小雅",
      scholarship: "牛津大学Rhodes奖学金",
      amount: "£60,000",
      major: "国际关系",
      country: "英国",
      year: "2024",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "张浩然",
      scholarship: "多伦多大学Lester B. Pearson奖学金",
      amount: "$45,000",
      major: "工程学",
      country: "加拿大",
      year: "2023",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "陈思妤",
      scholarship: "澳洲国立大学校长奖学金",
      amount: "AU$50,000",
      major: "商科",
      country: "澳大利亚",
      year: "2023",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-20 pt-12">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-full">
              <GraduationCap className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-8">
            奖学金智能匹配平台
          </h1>
          <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto">
            为中国学生推荐最合适的海外奖学金，基于AI算法精准匹配，助您实现留学梦想
          </p>
          <Button 
            onClick={handleStartMatching}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-8 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            开始匹配奖学金
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>

        {/* Scholarship Information Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">奖学金的真相与机遇</h2>
          <p className="text-xl text-gray-600 text-center mb-12">打破常见误解，发现属于你的机会</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold">给"合适的人"，不是"特别优秀的人"</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  很多奖学金其实有特定偏好，比如中国背景、某个专业、留学生身份，甚至是某段经历。只要匹配上，你就有机会。不是你不够好，是你没找到适合你的。
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Award className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold">不仅是"钱"，更是"你的资本"</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  你可以把奖学金写进简历、推荐信里，它就是你在海外获得认可的凭证。很多学校或雇主都很看重你是否得过类似荣誉，这比你自己写再多形容词都更有说服力。
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <DollarSign className="h-8 w-8 text-purple-600 mr-3" />
                  <h3 className="text-xl font-semibold">最轻松赚到几千美金的方式</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  有的奖学金一次申请就能拿5,000美金以上，顶得上一整个学期打工的钱。你只需要集中花几天时间准备材料，我们会帮你搞定路径和文书模版，性价比非常高。
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-orange-600 mr-3" />
                  <h3 className="text-xl font-semibold">自带"隐藏福利"</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  有些奖学金还自带推荐信、导师项目、暑期实习、圈层活动，能直接打开你在北美或全球的人脉和资源通道。这些很多人都不知道，但真的很有用。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">为什么选择我们的奖学金申请引擎</h2>
          <p className="text-xl text-gray-600 text-center mb-12">专业、高效、贴心的全程陪伴</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-3">节省时间，直达重点</h3>
                <p className="text-gray-600 text-sm">
                  我们不是给你几百个链接让你自己看，而是根据你的背景、兴趣和目标国家，直接推荐你可以申请、也值得申请的奖学金。
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-3">申请流程清晰，一步步来</h3>
                <p className="text-gray-600 text-sm">
                  从材料清单、截止时间、到文书模板，我们会自动帮你生成完整的行动路径，让你知道每一步该做什么，跟着做就能完成。
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <GraduationCap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-3">AI帮你润色写材料</h3>
                <p className="text-gray-600 text-sm">
                  怕写文书？我们有AI辅助功能，帮你优化内容、润色语法，你只管提供核心想法就行。
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-3">不怕错过时间</h3>
                <p className="text-gray-600 text-sm">
                  系统会自动提醒你哪些奖学金快到截止日期，不用翻邮箱，不用自己记时间。
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-3">成果档案管理</h3>
                <p className="text-gray-600 text-sm">
                  申请经历、获奖内容都可以自动整理成展示材料，对后续找实习、申研究生非常有用。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-xl p-10 mb-20">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-3">1000+</div>
              <div className="text-gray-600 text-lg">奖学金项目</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-3">50+</div>
              <div className="text-gray-600 text-lg">合作院校</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-3">10000+</div>
              <div className="text-gray-600 text-lg">成功匹配</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-3">95%</div>
              <div className="text-gray-600 text-lg">满意度</div>
            </div>
          </div>
        </div>

        {/* Success Cases */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">成功案例</h2>
          <p className="text-xl text-gray-600 text-center mb-12">看看他们如何通过我们的平台获得理想奖学金</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {successCases.map((case_, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <img 
                      src={case_.avatar} 
                      alt={case_.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover"
                    />
                    <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                      <Star className="h-4 w-4 text-white fill-current" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{case_.name}</h3>
                  <p className="text-sm text-blue-600 font-medium mb-2">{case_.scholarship}</p>
                  <div className="text-2xl font-bold text-green-600 mb-3">{case_.amount}</div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center justify-center">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      {case_.major}
                    </div>
                    <div className="flex items-center justify-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {case_.country}
                    </div>
                    <div className="flex items-center justify-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {case_.year}年获得
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-16 text-white">
          <h2 className="text-4xl font-bold mb-6">开启您的留学之旅</h2>
          <p className="text-xl mb-10 opacity-90">
            立即开始奖学金匹配，找到最适合您的海外学习机会
          </p>
          <Button 
            onClick={handleStartMatching}
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-8 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            立即开始
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
