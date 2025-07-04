import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Search } from "lucide-react";
import ScholarshipDetails from "@/components/ScholarshipDetails";
import ScholarshipResults from "@/components/ScholarshipResults";
import InteractiveForm from "@/components/InteractiveForm";
import UserPortal from "./UserPortal";
import UserMenu from "@/components/UserMenu";
import NotificationCenter from "@/components/NotificationCenter";

const Index = () => {
  const { toast } = useToast();
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [currentView, setCurrentView] = useState('home');
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [savedScholarships, setSavedScholarships] = useState([]);
  const [appliedScholarships, setAppliedScholarships] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // 模拟API请求
    const mockScholarships = [
      {
        id: '1',
        name: '清华大学奖学金',
        university: '清华大学',
        country: '中国',
        type: '本科',
        amount: '¥50,000',
        deadline: '2024-03-15',
        description: '为鼓励优秀本科生设立的奖学金项目。',
        questions: [
          '请简述您的学术背景和未来的学习计划。',
          '您认为自己最大的优势是什么？',
          '您对清华大学的期望是什么？'
        ],
        requiredDocuments: ['成绩单', '推荐信', '个人陈述'],
      },
      {
        id: '2',
        name: '北京大学奖学金',
        university: '北京大学',
        country: '中国',
        type: '硕士',
        amount: '¥80,000',
        deadline: '2024-04-01',
        description: '为支持有潜力的硕士研究生设立的奖学金项目。',
        questions: [
          '请详细描述您的研究方向和已取得的成果。',
          '您希望通过在北京大学的学习实现什么目标？',
          '您对本领域未来发展的看法是什么？'
        ],
        requiredDocuments: ['研究计划', '推荐信', '学历证明'],
      },
      {
        id: '3',
        name: '斯坦福大学奖学金',
        university: '斯坦福大学',
        country: '美国',
        type: '博士',
        amount: '$70,000',
        deadline: '2024-02-28',
        description: '为吸引全球顶尖博士生设立的全额奖学金项目。',
        questions: [
          '请阐述您的博士研究课题及其创新性。',
          '您选择斯坦福大学的原因是什么？',
          '您对未来职业发展的规划是什么？'
        ],
        requiredDocuments: ['研究提案', '推荐信', 'GRE成绩'],
      },
      {
        id: '4',
        name: '麻省理工学院奖学金',
        university: '麻省理工学院',
        country: '美国',
        type: '本科',
        amount: '$60,000',
        deadline: '2024-03-20',
        description: '为国际本科生提供的基于需求的奖学金项目。',
        questions: [
          '请分享您在科学、技术、工程或数学方面的兴趣和经验。',
          '您为什么选择麻省理工学院？',
          '您希望如何利用您的知识和技能为社会做出贡献？'
        ],
        requiredDocuments: ['成绩单', '推荐信', 'SAT成绩'],
      },
      {
        id: '5',
        name: '牛津大学奖学金',
        university: '牛津大学',
        country: '英国',
        type: '硕士',
        amount: '£50,000',
        deadline: '2024-04-15',
        description: '为来自发展中国家的硕士生提供的全额奖学金项目。',
        questions: [
          '请说明您的研究课题与发展中国家需求的关联性。',
          '您为什么选择牛津大学？',
          '您计划如何将您的研究成果应用于实际？'
        ],
        requiredDocuments: ['研究计划', '推荐信', '语言成绩'],
      },
      {
        id: '6',
        name: '剑桥大学奖学金',
        university: '剑桥大学',
        country: '英国',
        type: '博士',
        amount: '£60,000',
        deadline: '2024-03-30',
        description: '为全球顶尖博士生提供的全额奖学金项目，涵盖所有学科。',
        questions: [
          '请详细描述您的研究课题及其对学术领域的贡献。',
          '您为什么选择剑桥大学？',
          '您对未来学术生涯的规划是什么？'
        ],
        requiredDocuments: ['研究提案', '推荐信', '语言成绩'],
      },
      {
        id: '7',
        name: '东京大学奖学金',
        university: '东京大学',
        country: '日本',
        type: '本科',
        amount: '¥600,000',
        deadline: '2024-02-20',
        description: '为国际本科生提供的奖学金项目，重点支持亚洲学生。',
        questions: [
          '请分享您对日本文化和社会的理解。',
          '您为什么选择东京大学？',
          '您希望如何促进中日文化交流？'
        ],
        requiredDocuments: ['成绩单', '推荐信', '日语能力证明'],
      },
      {
        id: '8',
        name: '新加坡国立大学奖学金',
        university: '新加坡国立大学',
        country: '新加坡',
        type: '硕士',
        amount: '$40,000',
        deadline: '2024-04-30',
        description: '为优秀的硕士研究生提供的奖学金项目，涵盖所有专业。',
        questions: [
          '请说明您的研究兴趣和学术背景。',
          '您为什么选择新加坡国立大学？',
          '您希望如何利用您的研究成果为社会做出贡献？'
        ],
        requiredDocuments: ['研究计划', '推荐信', '学历证明'],
      },
      {
        id: '9',
        name: '香港大学奖学金',
        university: '香港大学',
        country: '中国香港',
        type: '博士',
        amount: '$50,000',
        deadline: '2024-03-25',
        description: '为国际博士生提供的全额奖学金项目，支持创新研究。',
        questions: [
          '请详细描述您的研究课题及其创新性。',
          '您为什么选择香港大学？',
          '您对未来学术生涯的规划是什么？'
        ],
        requiredDocuments: ['研究提案', '推荐信', '语言成绩'],
      },
      {
        id: '10',
        name: '多伦多大学奖学金',
        university: '多伦多大学',
        country: '加拿大',
        type: '本科',
        amount: '$40,000',
        deadline: '2024-02-15',
        description: '为国际本科生提供的奖学金项目，基于学术成绩和领导力。',
        questions: [
          '请分享您的学术成就和领导经验。',
          '您为什么选择多伦多大学？',
          '您希望如何在多伦多大学实现个人成长？'
        ],
        requiredDocuments: ['成绩单', '推荐信', '语言成绩'],
      },
    ];

    setScholarships(mockScholarships);
    setFilteredScholarships(mockScholarships);

    // 提取筛选条件
    const uniqueUniversities = [...new Set(mockScholarships.map(s => s.university))];
    const uniqueCountries = [...new Set(mockScholarships.map(s => s.country))];
    const uniqueTypes = [...new Set(mockScholarships.map(s => s.type))];

    setUniversities(uniqueUniversities);
    setCountries(uniqueCountries);
    setTypes(uniqueTypes);
  }, []);

  useEffect(() => {
    // 应用筛选条件
    let results = scholarships;

    if (selectedUniversity) {
      results = results.filter(s => s.university === selectedUniversity);
    }

    if (selectedCountry) {
      results = results.filter(s => s.country === selectedCountry);
    }

    if (selectedType) {
      results = results.filter(s => s.type === selectedType);
    }

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      results = results.filter(s =>
        s.name.toLowerCase().includes(lowerCaseQuery) ||
        s.description.toLowerCase().includes(lowerCaseQuery) ||
        s.university.toLowerCase().includes(lowerCaseQuery)
      );
    }

    setFilteredScholarships(results);
  }, [selectedUniversity, selectedCountry, selectedType, searchQuery, scholarships]);

  // 处理收藏奖学金
  const handleSaveScholarship = (scholarship) => {
    setSavedScholarships(prev => {
      const isAlreadySaved = prev.some(s => s.id === scholarship.id);
      if (isAlreadySaved) {
        toast({
          title: "取消收藏",
          description: `已取消收藏 ${scholarship.name}`,
        });
        return prev.filter(s => s.id !== scholarship.id);
      } else {
        toast({
          title: "收藏成功",
          description: `已收藏 ${scholarship.name}`,
        });
        return [...prev, scholarship];
      }
    });
  };

  // 处理一键申请
  const handleOneClickApply = (scholarship) => {
    const newApplication = {
      ...scholarship,
      status: '已提交',
      submittedDate: new Date().toLocaleDateString('zh-CN'),
      applicationId: `APP-${Date.now()}`
    };
    
    setAppliedScholarships(prev => {
      const isAlreadyApplied = prev.some(s => s.id === scholarship.id);
      if (!isAlreadyApplied) {
        toast({
          title: "申请已成功提交！",
          description: `您的 ${scholarship.name} 申请已提交，我们将在3-5个工作日内审核。`,
        });
        return [...prev, newApplication];
      } else {
        toast({
          title: "已提交过申请",
          description: `您已经申请过 ${scholarship.name}`,
          variant: "destructive",
        });
        return prev;
      }
    });
  };

  const isScholarshipSaved = (scholarship) => {
    return savedScholarships.some(s => s.id === scholarship.id);
  };

  if (currentView === 'details' && selectedScholarship) {
    return (
      <ScholarshipDetails
        scholarship={selectedScholarship}
        onBack={() => setCurrentView('home')}
        onSaveScholarship={handleSaveScholarship}
        onOneClickApply={handleOneClickApply}
        isSaved={isScholarshipSaved(selectedScholarship)}
      />
    );
  }

  if (currentView === 'portal') {
    return (
      <UserPortal
        onBack={() => setCurrentView('home')}
        savedScholarships={savedScholarships}
        appliedScholarships={appliedScholarships}
        onOneClickApply={handleOneClickApply}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header with Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-blue-600">奖学金助手</h1>
              <nav className="hidden md:flex items-center gap-6">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentView('home')}
                  className={currentView === 'home' ? 'bg-blue-100 text-blue-700' : ''}
                >
                  首页
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setCurrentView('portal')}
                  className={currentView === 'portal' ? 'bg-blue-100 text-blue-700' : ''}
                >
                  用户中心
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  通知
                  {appliedScholarships.filter(s => s.status === '审核中').length > 0 && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </Button>
              </nav>
            </div>
            
            <UserMenu
              savedCount={savedScholarships.length}
              appliedCount={appliedScholarships.length}
              onPortalClick={() => setCurrentView('portal')}
            />
          </div>
        </div>
      </header>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="fixed top-16 right-4 z-50">
          <NotificationCenter />
        </div>
      )}

      {/* Main Content */}
      {currentView === 'home' && (
        <>
          {/* Hero Section */}
          <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-5xl font-bold mb-6">发现您的奖学金机会</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                智能匹配全球顶尖大学奖学金，助您实现学术梦想。我们已帮助超过10,000名学生获得奖学金资助。
              </p>
              <Button
                size="lg"
                onClick={() => setIsFormOpen(true)}
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
              >
                开始匹配奖学金
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-3xl font-bold text-blue-600 mb-2">10,000+</h3>
                <p className="text-gray-700">成功案例</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-green-600 mb-2">500+</h3>
                <p className="text-gray-700">合作院校</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-indigo-600 mb-2">全球</h3>
                <p className="text-gray-700">奖学金覆盖</p>
              </div>
            </div>
          </section>

          {/* Search Section */}
          <section className="py-8 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">搜索奖学金</h2>
                <div className="flex items-center gap-4">
                  <Input
                    type="text"
                    placeholder="搜索奖学金..."
                    className="w-64 md:w-80"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button>
                    <Search className="h-5 w-5 mr-2" />
                    搜索
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700">大学</label>
                  <select
                    id="university"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={selectedUniversity}
                    onChange={(e) => setSelectedUniversity(e.target.value)}
                  >
                    <option value="">所有大学</option>
                    {universities.map(university => (
                      <option key={university} value={university}>{university}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">国家</label>
                  <select
                    id="country"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    <option value="">所有国家</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">类型</label>
                  <select
                    id="type"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="">所有类型</option>
                    {types.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>
          
          {/* Results */}
          {filteredScholarships.length > 0 && (
            <ScholarshipResults
              scholarships={filteredScholarships}
              onViewDetails={(scholarship) => {
                setSelectedScholarship(scholarship);
                setCurrentView('details');
              }}
              onSaveScholarship={handleSaveScholarship}
              onOneClickApply={handleOneClickApply}
              savedScholarships={savedScholarships}
            />
          )}
        </>
      )}

      {/* Interactive Form Modal */}
      <InteractiveForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default Index;
