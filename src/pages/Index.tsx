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
import FeaturedScholarships from "@/components/FeaturedScholarships";
import TemplateCenter from "@/components/TemplateCenter";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'auth' | 'form' | 'results' | 'details' | 'portal' | 'templates'>('home');
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
    
    // If it's an existing user, skip form and go directly to results
    if (userData.isReturningUser) {
      // Mock existing user data for demonstration
      const existingFormData = {
        name: userData.name || userData.email.split('@')[0],
        education: "bachelor",
        gpa: "3.5",
        targetCountry: "usa",
        major: "computer-science",
        economicSituation: "medium"
      };
      setFormData(existingFormData);
      setCurrentPage('results');
      setHasVisitedResults(true);
      
      toast({
        title: "欢迎回来！",
        description: "正在为您加载个性化的奖学金推荐...",
      });
    } else {
      // New user goes to form
      setCurrentPage('form');
    }
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

  if (currentPage === 'templates') {
    return <TemplateCenter onBack={handleBackToHome} />;
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
            我们帮你发现那些原本以为遥不可及的奖学金
          </h1>
          <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto">
            智能推荐 • 一键申请 • 申请进度追踪<br/>
            让每一份努力都能找到属于它的奖励
          </p>
          <Button 
            onClick={handleStartMatching}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-8 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            注册后解锁你的专属奖学金匹配
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
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

        {/* Featured Scholarships */}
        <FeaturedScholarships 
          onViewDetails={handleViewDetails}
          onSaveScholarship={handleSaveScholarship}
          savedScholarships={savedScholarships}
        />

        {/* Template Center Link */}
        <div className="mb-20 text-center">
          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <FileText className="h-16 w-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">文书模板中心</h3>
              <p className="text-lg text-gray-600 mb-6">
                不知道怎么写文书？我们先帮你起个头！<br/>
                个人陈述、推荐信模板免费下载，付费用户可请求文书定制修改
              </p>
              <Button
                onClick={() => setCurrentPage('templates')}
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
              >
                浏览模板中心
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
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
