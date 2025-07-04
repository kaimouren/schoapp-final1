
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Heart, FileText } from "lucide-react";

interface UserMenuProps {
  savedCount: number;
  appliedCount: number;
  onPortalClick: () => void;
  user?: any;
}

const UserMenu = ({ savedCount, appliedCount, onPortalClick, user }: UserMenuProps) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        variant="ghost"
        className="relative p-2 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white/95 border border-gray-200 rounded-full"
        onClick={onPortalClick}
      >
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          
          <div className="flex items-center gap-2">
            {/* 收藏数量徽章 */}
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-red-500" />
              <Badge 
                variant="secondary" 
                className="h-5 px-2 text-xs bg-red-100 text-red-700 hover:bg-red-200"
              >
                {savedCount}
              </Badge>
            </div>
            
            {/* 申请数量徽章 */}
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4 text-blue-500" />
              <Badge 
                variant="secondary" 
                className="h-5 px-2 text-xs bg-blue-100 text-blue-700 hover:bg-blue-200"
              >
                {appliedCount}
              </Badge>
            </div>
          </div>
        </div>
      </Button>
    </div>
  );
};

export default UserMenu;
