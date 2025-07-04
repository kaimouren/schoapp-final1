import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, DollarSign, MapPin, Award, ExternalLink, Star, Trophy, Heart, Eye, Users, HelpCircle, Sparkles, Target } from "lucide-react";
import InfoTooltip from "./InfoTooltip";
import ResultsNavigation from "./ResultsNavigation";
import MatchDetails from "./MatchDetails";
import MatchingLoader from "./MatchingLoader";

interface ScholarshipResultsProps {
  formData: any;
  onBack: () => void;
  onViewDetails: (scholarship: any) => void;
  showInitialLoader?: boolean;
}

const ScholarshipResults = ({ formData, onBack, onViewDetails, showInitialLoader = true }: ScholarshipResultsProps) => {
  const [showLoader, setShowLoader] = useState(showInitialLoader);
  const [activeTab, setActiveTab] = useState('results');
  const [savedScholarships, setSavedScholarships] = useState<Set<number>>(new Set());

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  const toggleSaved = (scholarshipId: number) => {
    setSavedScholarships(prev => {
      const newSet = new Set(prev);
      if (newSet.has(scholarshipId)) {
        newSet.delete(scholarshipId);
      } else {
        newSet.add(scholarshipId);
      }
      return newSet;
    });
  };

  // 汇率转换函数
  const convertToRMB = (amount: string) => {
    const numAmount = parseInt(amount.replace(/[^0-9]/g, ''));
    let rate = 7.3; // 默认美元汇率
    
    if (amount.includes('£')) rate = 9.2;
    else if (amount.includes('CAD')) rate = 5.4;
    else if (amount.includes('AUD')) rate = 4.8;
    else if (amount.includes('€')) rate = 7.8;
    else if (amount.includes('CHF')) rate = 8.1;
    
    const rmbAmount = (numAmount * rate / 10000).toFixed(1);
    return `约合人民币${rmbAmount}万元`;
  };

  if (showLoader) {
    return <MatchingLoader user={formData} onComplete={handleLoaderComplete} />;
  }

  // 推荐奖学金（匹配度最高且特别推荐）
  const recommendedScholarships = [
    {
      id: 1,
      name: "全额学费奖学金",
      university: "斯坦福大学",
      country: "美国",
      amount: "$50,000/年",
      deadline: "2024年12月15日",
      matchRate: 95,
      type: "全额奖学金",
      requirements: ["GPA 3.8+", "TOEFL 100+", "研究经历"],
      description: "面向优秀国际学生的全额学费奖学金，涵盖所有学费及生活补贴。",
      questions: [
        "请描述您的研究兴趣和未来计划（500字以内）",
        "您认为自己最大的学术成就是什么？",
        "为什么选择我们学校？"
      ],
      requiredDocuments: ["成绩单", "推荐信", "个人陈述", "研究计划"],
      isRecommended: true,
      applicationCount: 234,
      viewCount: 5600,
      matchDetails: {
        gpa: 'match' as const,
        language: 'match' as const,
        experience: 'partial' as const,
        background: 'match' as const
      },
      eligibilityStatus: "你完全符合申请条件"
    },
    {
      id: 2,
      name: "优秀学生奖学金",
      university: "牛津大学",
      country: "英国",
      amount: "£25,000/年",
      deadline: "2025年1月31日",
      matchRate: 92,
      type: "部分奖学金",
      requirements: ["GPA 3.6+", "IELTS 7.0+", "推荐信"],
      description: "奖励学术表现优异的国际学生，提供部分学费资助。",
      questions: [
        "请简述您的学术背景和专业技能",
        "您希望通过这个项目获得什么？"
      ],
      requiredDocuments: ["学位证明", "语言成绩", "推荐信"],
      isRecommended: true,
      applicationCount: 189,
      viewCount: 4200,
      matchDetails: {
        gpa: 'match' as const,
        language: 'match' as const,
        experience: 'match' as const,
        background: 'partial' as const
      },
      eligibilityStatus: "你完全符合申请条件"
    }
  ];

  const otherScholarships = [
    {
      id: 3,
      name: "研究生科研奖学金",
      university: "多伦多大学",
      country: "加拿大",
      amount: "CAD $30,000/年",
      deadline: "2024年11月30日",
      matchRate: 88,
      type: "科研奖学金",
      requirements: ["相关专业背景", "研究计划", "导师推荐"],
      description: "专为从事科研工作的研究生设立，提供研究资金支持。",
      questions: [
        "请详细描述您的研究计划",
        "您之前的研究经历是什么？",
        "您期望的导师是谁？为什么？"
      ],
      requiredDocuments: ["研究计划书", "导师推荐信", "研究成果证明"],
      applicationCount: 156,
      viewCount: 3400,
      matchDetails: {
        gpa: 'match' as const,
        language: 'partial' as const,
        experience: 'miss' as const,
        background: 'match' as const
      },
      eligibilityStatus: "研究经验略显不足，建议补充相关材料"
    },
    {
      id: 4,
      name: "国际学生助学金",
      university: "悉尼大学",
      country: "澳大利亚",
      amount: "AUD $20,000/年",
      deadline: "2025年2月28日",
      matchRate: 85,
      type: "助学金",
      requirements: ["经济需要证明", "学术成绩良好", "社区服务"],
      description: "帮助有经济困难的优秀国际学生完成学业。",
      questions: [
        "请说明您的经济状况",
        "您参与过哪些社区服务活动？"
      ],
      requiredDocuments: ["经济状况证明", "社区服务证明", "学术成绩单"],
      applicationCount: 123,
      viewCount: 2800,
      matchDetails: {
        gpa: 'match' as const,
        language: 'match' as const,
        experience: 'match' as const,
        background: 'match' as const
      },
      eligibilityStatus: "你完全符合申请条件"
    },
    {
      id: 5,
      name: "工程学院奖学金",
      university: "麻省理工学院",
      country: "美国",
      amount: "$45,000/年",
      deadline: "2024年12月1日",
      matchRate: 82,
      type: "专业奖学金",
      requirements: ["工程专业背景", "GPA 3.7+", "项目经历"],
      description: "专为工程学院学生设立的奖学金项目。",
      questions: [
        "描述您最具挑战性的工程项目",
        "您的工程职业目标是什么？"
      ],
      requiredDocuments: ["项目作品集", "成绩单", "推荐信"],
      applicationCount: 90,
      viewCount: 2200,
      matchDetails: {
        gpa: 'match' as const,
        language: 'match' as const,
        experience: 'partial' as const,
        background: 'match' as const
      },
      eligibilityStatus: "GPA略低于要求，建议补充推荐信"
    },
    {
      id: 6,
      name: "商学院精英奖学金",
      university: "伦敦商学院",
      country: "英国",
      amount: "£35,000/年",
      deadline: "2025年1月15日",
      matchRate: 80,
      type: "商科奖学金",
      requirements: ["商科背景", "GMAT 700+", "工作经验"],
      description: "面向商学院优秀学生的奖学金。",
      questions: [
        "您的职业规划是什么？",
        "描述一次领导经历"
      ],
      requiredDocuments: ["GMAT成绩", "工作证明", "推荐信"],
      applicationCount: 67,
      viewCount: 1800,
      matchDetails: {
        gpa: 'match' as const,
        language: 'match' as const,
        experience: 'match' as const,
        background: 'match' as const
      },
      eligibilityStatus: "你完全符合申请条件"
    },
    {
      id: 7,
      name: "艺术创新奖学金",
      university: "加州艺术学院",
      country: "美国",
      amount: "$28,000/年",
      deadline: "2025年3月15日",
      matchRate: 78,
      type: "艺术奖学金",
      requirements: ["艺术作品集", "创意项目", "艺术背景"],
      description: "支持有创意才能的艺术学生。",
      questions: [
        "描述您的艺术风格和理念",
        "您最自豪的作品是什么？"
      ],
      requiredDocuments: ["作品集", "创意陈述", "推荐信"],
      applicationCount: 54,
      viewCount: 1500,
      matchDetails: {
        gpa: 'match' as const,
        language: 'match' as const,
        experience: 'match' as const,
        background: 'match' as const
      },
      eligibilityStatus: "你完全符合申请条件"
    },
    {
      id: 8,
      name: "医学预科奖学金",
      university: "哈佛大学",
      country: "美国",
      amount: "$40,000/年",
      deadline: "2024年11月15日",
      matchRate: 76,
      type: "医学奖学金",
      requirements: ["生物医学背景", "MCAT成绩", "志愿服务"],
      description: "为未来的医学生提供资助。",
      questions: [
        "为什么选择医学职业？",
        "描述您的志愿服务经历"
      ],
      requiredDocuments: ["MCAT成绩", "志愿服务证明", "推荐信"],
      applicationCount: 41,
      viewCount: 1200,
      matchDetails: {
        gpa: 'match' as const,
        language: 'match' as const,
        experience: 'match' as const,
        background: 'match' as const
      },
      eligibilityStatus: "你完全符合申请条件"
    },
    {
      id: 9,
      name: "可持续发展奖学金",
      university: "苏黎世联邦理工学院",
      country: "瑞士",
      amount: "CHF 25,000/年",
      deadline: "2025年2月1日",
      matchRate: 74,
      type: "环保奖学金",
      requirements: ["环境科学背景", "可持续项目经验", "语言能力"],
      description: "支持致力于可持续发展的学生。",
      questions: [
        "您对可持续发展的理解",
        "描述一个环保项目经历"
      ],
      requiredDocuments: ["项目报告", "语言证明", "推荐信"],
      applicationCount: 38,
      viewCount: 1000,
      matchDetails: {
        gpa: 'match' as const,
        language: 'match' as const,
        experience: 'match' as const,
        background: 'match' as const
      },
      eligibilityStatus: "你完全符合申请条件"
    },
    {
      id: 10,
      name: "计算机科学奖学金",
      university: "卡内基梅隆大学",
      country: "美国",
      amount: "$38,000/年",
      deadline: "2024年12月20日",
      matchRate: 72,
      type: "技术奖学金",
      requirements: ["CS背景", "编程能力", "技术项目"],
      description: "为计算机科学专业学生提供资助。",
      questions: [
        "描述您最复杂的编程项目",
        "您的技术发展方向是什么？"
      ],
      requiredDocuments: ["代码作品集", "项目文档", "推荐信"],
      applicationCount: 35,
      viewCount: 900,
      matchDetails: {
        gpa: 'match' as const,
        language: 'match' as const,
        experience: 'match' as const,
        background: 'match' as const
      },
      eligibilityStatus: "你完全符合申请条件"
    },
    {
      id: 11,
      name: "国际关系奖学金",
      university: "巴黎政治学院",
      country: "法国",
      amount: "€22,000/年",
      deadline: "2025年1月20日",
      matchRate: 70,
      type: "政治学奖学金",
      requirements: ["政治学背景", "多语言能力", "国际经验"],
      description: "培养国际关系专业人才。",
      questions: [
        "您对当前国际形势的看法",
        "描述一次跨文化交流经历"
      ],
      requiredDocuments: ["语言证书", "实习证明", "推荐信"],
      applicationCount: 32,
      viewCount: 800,
      matchDetails: {
        gpa: 'match' as const,
        language: 'match' as const,
        experience: 'match' as const,
        background: 'match' as const
      },
      eligibilityStatus: "你完全符合申请条件"
    },
    {
      id: 12,
      name: "心理学研究奖学金",
      university: "剑桥大学",
      country: "英国",
      amount: "£24,000/年",
      deadline: "2025年2月10日",
      matchRate: 68,
      type: "研究奖学金",
      requirements: ["心理学背景", "研究经验", "统计能力"],
      description: "支持心理学研究项目。",
      questions: [
        "您的研究兴趣领域",
        "描述一次研究经历"
      ],
      requiredDocuments: ["研究计划", "统计技能证明", "推荐信"],
      applicationCount: 29,
      viewCount: 700,
      matchDetails: {
        gpa: 'match' as const,
        language: 'match' as const,
        experience: 'match' as const,
        background: 'match' as const
      },
      eligibilityStatus: "你完全符合申请条件"
    }
  ].sort((a, b) => b.matchRate - a.matchRate);

  const allScholarships = [...recommendedScholarships, ...otherScholarships];

  const getMatchColor = (rate: number) => {
    if (rate >= 90) return "bg-green-500";
    if (rate >= 80) return "bg-blue-500";
    if (rate >= 70) return "bg-yellow-500";
    return "bg-gray-500";
  };

  const calculateDaysLeft = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <ResultsNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        savedCount={savedScholarships.size}
      />

      <div className="container mx-auto px-4 max-w-6xl py-8">
        {/* Top Banner with Motivational Slogan */}
        <div className="mb-6 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-full inline-flex items-center gap-2 shadow-lg">
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">每一次选择，都是为未来投资</span>
          </div>
        </div>

        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mr-4 hover:bg-blue-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回首页
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">匹配结果</h1>
            <p className="text-gray-600 mt-1">为 {formData?.name} 找到 {allScholarships.length} 个匹配的奖学金项目</p>
          </div>
        </div>

        {/* Summary Card with Tooltips */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-8">
            <div className="text-center mb-4">
              <p className="text-blue-100 text-lg italic">别让任何一份机会与你擦肩而过</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="relative">
                <div className="text-3xl font-bold mb-2">{allScholarships.length}</div>
                <div className="text-blue-100 flex items-center justify-center gap-1">
                  匹配项目
                  <InfoTooltip content="根据您的背景信息，我们为您找到了这些符合条件的奖学金项目" />
                </div>
              </div>
              <div className="relative">
                <div className="text-3xl font-bold mb-2">
                  {Math.round(allScholarships.reduce((acc, s) => acc + s.matchRate, 0) / allScholarships.length)}%
                </div>
                <div className="text-blue-100 flex items-center justify-center gap-1">
                  平均匹配度
                  <InfoTooltip content="这是根据您的GPA、语言成绩、专业背景和研究经验计算出的综合匹配结果" />
                </div>
              </div>
              <div className="relative">
                <div className="text-3xl font-bold mb-2">
                  ${allScholarships.reduce((acc, s) => acc + parseInt(s.amount.replace(/[^0-9]/g, '')), 0).toLocaleString()}
                </div>
                <div className="text-blue-100 flex items-center justify-center gap-1">
                  总奖学金金额
                  <InfoTooltip content="这些奖学金项目的总金额，代表您的最大潜在收益（需分别申请）" />
                </div>
              </div>
              <div className="relative">
                <div className="text-3xl font-bold mb-2">{recommendedScholarships.length}</div>
                <div className="text-blue-100 flex items-center justify-center gap-1">
                  重点推荐
                  <InfoTooltip content="基于AI算法为您精选的最适合申请的奖学金项目" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motivational Quote Before Recommended Scholarships */}
        <div className="text-center mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-block">
            <p className="text-yellow-800 font-medium flex items-center gap-2">
              <Target className="h-5 w-5" />
              你的努力值得被全球看见
            </p>
          </div>
        </div>

        {/* Recommended Scholarships */}
        {recommendedScholarships.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">重点推荐奖学金</h2>
              <Badge className="bg-yellow-500 text-white">TOP推荐</Badge>
              <span className="text-gray-600 text-sm ml-2">- 奖学金，从来不只属于少数人</span>
            </div>
            <div className="grid gap-6">
              {recommendedScholarships.map((scholarship, index) => (
                <Card key={scholarship.id} className="border-2 border-yellow-400 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-yellow-50 to-orange-50 relative">
                  {/* Bookmark Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 z-10"
                    onClick={() => toggleSaved(scholarship.id)}
                  >
                    <Heart 
                      className={`h-5 w-5 ${savedScholarships.has(scholarship.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                    />
                  </Button>

                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start pr-12">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Trophy className="h-6 w-6 text-yellow-500" />
                          <CardTitle className="text-xl">{scholarship.name}</CardTitle>
                          <MatchDetails 
                            matchRate={scholarship.matchRate} 
                            details={scholarship.matchDetails}
                          />
                          <Badge className="bg-yellow-500 text-white">推荐</Badge>
                        </div>
                        {/* Slogan for each card */}
                        <div className="text-sm text-yellow-700 mb-2 italic">
                          {index === 0 ? "一份申请，成就无限可能" : "轻松申请，收获非凡"}
                        </div>
                        <div className="flex items-center gap-4 text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{scholarship.university} • {scholarship.country}</span>
                          </div>
                          <Badge variant="outline">{scholarship.type}</Badge>
                        </div>
                        {/* Application Stats */}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>本月已有{scholarship.applicationCount}人申请</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>浏览量：{scholarship.viewCount}+</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{scholarship.amount}</div>
                        <div className="text-sm text-green-500">{convertToRMB(scholarship.amount)}</div>
                        <div className="text-xs text-gray-500">每年</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{scholarship.description}</p>
                    
                    {/* Eligibility Status */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <p className="text-sm font-medium text-green-800">
                        申请资格评估: {scholarship.eligibilityStatus}
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-red-500" />
                          申请截止日期
                        </h4>
                        <p className="text-red-600 font-medium">{scholarship.deadline}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">申请要求</h4>
                        <div className="flex flex-wrap gap-2">
                          {scholarship.requirements.map((req, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(scholarship.matchRate / 20) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">匹配度评分</span>
                      </div>
                      
                      <Button 
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                        onClick={() => onViewDetails(scholarship)}
                      >
                        立即申请 (剩{calculateDaysLeft(scholarship.deadline)}天)
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Motivational Banner Between Sections */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 shadow-lg">
            <p className="text-lg font-semibold text-gray-800 mb-2">只要开始，就已经领先</p>
            <p className="text-gray-600">机会就在这里，等你伸手</p>
          </div>
        </div>

        {/* Other Scholarships with similar updates */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">其他匹配奖学金</h2>
            <span className="text-blue-600 text-sm font-medium">把握当下，赢得未来</span>
          </div>
          <div className="grid gap-6">
            {otherScholarships.map((scholarship, index) => (
              <Card key={scholarship.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
                {/* Bookmark Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 z-10"
                  onClick={() => toggleSaved(scholarship.id)}
                >
                  <Heart 
                    className={`h-5 w-5 ${savedScholarships.has(scholarship.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                  />
                </Button>

                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start pr-12">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="h-6 w-6 text-blue-500" />
                        <CardTitle className="text-xl">{scholarship.name}</CardTitle>
                        <MatchDetails 
                          matchRate={scholarship.matchRate} 
                          details={scholarship.matchDetails}
                        />
                      </div>
                      {/* Rotating slogans for other scholarships */}
                      <div className="text-sm text-blue-600 mb-2 italic">
                        {index % 4 === 0 && "每一份支持，都是向前的力量"}
                        {index % 4 === 1 && "下一位获奖者，或许就是你"}
                        {index % 4 === 2 && "现在的坚持，是明天的收获"}
                        {index % 4 === 3 && "未来没有剧本，机会由你定义"}
                      </div>
                      <div className="flex items-center gap-4 text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{scholarship.university} • {scholarship.country}</span>
                        </div>
                        <Badge variant="outline">{scholarship.type}</Badge>
                      </div>
                      {/* Application Stats */}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>本月已有{scholarship.applicationCount}人申请</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>浏览量：{scholarship.viewCount}+</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{scholarship.amount}</div>
                      <div className="text-sm text-green-500">{convertToRMB(scholarship.amount)}</div>
                      <div className="text-xs text-gray-500">每年</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{scholarship.description}</p>
                  
                  {/* Eligibility Status */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-green-800">
                      申请资格评估: {scholarship.eligibilityStatus}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-red-500" />
                        申请截止日期
                      </h4>
                      <p className="text-red-600 font-medium">{scholarship.deadline}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">申请要求</h4>
                      <div className="flex flex-wrap gap-2">
                        {scholarship.requirements.map((req, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(scholarship.matchRate / 20) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">匹配度评分</span>
                    </div>
                    
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => onViewDetails(scholarship)}
                    >
                      立即申请 (剩{calculateDaysLeft(scholarship.deadline)}天)
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">立即行动，不留遗憾</h3>
            <p className="text-xl mb-8 text-purple-100">让梦想，从这里启航</p>
            <div className="flex justify-center gap-4">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                继续浏览奖学金
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg font-semibold">
                保存匹配结果
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer with FAQ and Contact */}
        <Card className="mt-8 border-0 shadow-lg bg-gradient-to-r from-gray-50 to-blue-50">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <p className="text-lg font-medium text-gray-700 italic">未来没有剧本，机会由你定义</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">常见问题</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• 奖学金申请需要准备什么材料？</p>
                  <p>• 文书应该怎么写才能提高成功率？</p>
                  <p>• 申请多个奖学金会冲突吗？</p>
                  <p>• 如何提高语言成绩和GPA？</p>
                </div>
                <Button variant="outline" className="mt-4">
                  查看更多FAQ
                </Button>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">需要帮助？</h3>
                <p className="text-gray-600 mb-4">添加专业顾问微信，获得一对一指导</p>
                <div className="bg-white p-4 rounded-lg shadow-md inline-block">
                  <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">微信二维码</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Floating Motivational Tip */}
        <div className="fixed bottom-6 right-6 bg-white rounded-full shadow-lg p-4 border-2 border-blue-200 max-w-xs z-50">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <p className="text-sm text-gray-700 font-medium">现在的坚持，是明天的收获</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipResults;
