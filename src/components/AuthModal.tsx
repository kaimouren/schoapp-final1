
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, MessageCircle, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  onSuccess: (userData: any) => void;
  onBack: () => void;
}

const AuthModal = ({ onSuccess, onBack }: AuthModalProps) => {
  const { toast } = useToast();
  const [authMode, setAuthMode] = useState<'select' | 'email' | 'wechat' | 'login'>('select');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "请输入邮箱",
        description: "邮箱地址不能为空",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // 模拟登录过程
    setTimeout(() => {
      toast({
        title: "登录成功",
        description: "欢迎使用奖学金匹配平台！",
      });
      
      onSuccess({
        email: email,
        name: email.split('@')[0],
        loginMethod: 'email'
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleExistingLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "别急，我们再试一次",
        description: "请检查邮箱和密码是否正确",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // 模拟已有账户登录过程
    setTimeout(() => {
      toast({
        title: "登录成功",
        description: "欢迎回来！",
      });
      
      onSuccess({
        email: email,
        name: email.split('@')[0],
        loginMethod: 'existing',
        isReturningUser: true
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleWeChatLogin = () => {
    setIsLoading(true);
    
    // 模拟微信登录过程
    setTimeout(() => {
      toast({
        title: "微信登录成功",
        description: "欢迎使用奖学金匹配平台！",
      });
      
      onSuccess({
        name: "微信用户",
        loginMethod: 'wechat',
        wechatId: 'wx_' + Math.random().toString(36).substr(2, 9)
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={authMode === 'select' ? onBack : () => setAuthMode('select')}
              className="text-white hover:bg-white/20 mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-xl">
              {authMode === 'select' ? '选择登录方式' : 
               authMode === 'email' ? '新用户注册' : 
               authMode === 'login' ? '已有账户登录' : '微信登录'}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          {authMode === 'select' && (
            <div className="space-y-4">
              <p className="text-gray-600 text-center mb-6">
                我们不会泄露你的信息，请放心填写。让我们一起找到属于你的机会！
              </p>
              
              <Button
                onClick={() => setAuthMode('login')}
                className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <LogIn className="mr-3 h-5 w-5" />
                已有账户登录
              </Button>
              
              <Button
                onClick={() => setAuthMode('email')}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Mail className="mr-3 h-5 w-5" />
                新用户注册
              </Button>
              
              <Button
                onClick={() => setAuthMode('wechat')}
                className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <MessageCircle className="mr-3 h-5 w-5" />
                微信登录
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                登录即表示您同意我们的服务条款和隐私政策
              </p>
            </div>
          )}

          {authMode === 'login' && (
            <form onSubmit={handleExistingLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="login-email">邮箱地址</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="请输入您的邮箱地址"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="请输入您的密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                  disabled={isLoading}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? "登录中..." : "登录"}
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                忘记密码？请联系客服协助找回
              </p>
            </form>
          )}

          {authMode === 'email' && (
            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">邮箱地址</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="请输入您的邮箱地址"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  disabled={isLoading}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "注册中..." : "注册"}
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                放心，我们会保护你的隐私。马上就能看到为你推荐的奖学金了！
              </p>
            </form>
          )}

          {authMode === 'wechat' && (
            <div className="text-center space-y-6">
              <div className="bg-gray-100 w-48 h-48 mx-auto rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <p className="text-gray-600">微信二维码</p>
                  <p className="text-sm text-gray-500">请使用微信扫码登录</p>
                </div>
              </div>
              
              <Button
                onClick={handleWeChatLogin}
                className="w-full h-12 bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? "登录中..." : "模拟微信登录"}
              </Button>
              
              <p className="text-xs text-gray-500">
                使用微信扫码或点击上方按钮完成登录
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthModal;
