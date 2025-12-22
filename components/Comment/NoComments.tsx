"use client";

import { MessageSquareOff } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function NoComments() {
  return (
    <Empty className="py-12 bg-[#1a110d]/20 border border-dashed border-[#3e2723] rounded-xl flex flex-col items-center justify-center text-center">
      <EmptyHeader className="space-y-4">
        <EmptyMedia variant="icon" className="mx-auto flex items-center justify-center">
          <div className="p-4 rounded-full bg-[#1a110d] border border-[#3e2723] shadow-[0_0_15px_-3px_rgba(212,175,55,0.15)]">
             <MessageSquareOff size={32} className="text-[#a1887f]" />
          </div>
        </EmptyMedia>
        
        <div className="space-y-2">
            <EmptyTitle className="text-lg font-bold text-[#eaddcf]">
                Silence in the Dojo
            </EmptyTitle>
            <EmptyDescription className="text-sm text-[#a1887f] max-w-xs mx-auto">
                No scrolls of wisdom have been shared yet. Be the first to break the silence and leave a mark.
            </EmptyDescription>
        </div>
      </EmptyHeader>
    </Empty>
  );
}