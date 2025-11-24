"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import ResultView from "@/components/ResultView";
import { AnalyzeResponse } from "@/types/api";

export default function Home() {
  const [data, setData] = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  const fetchAnalyze = async (nickname: string, button: string) => {
    setLoading(true);
    setData(null); // 기존 결과 초기화

    try {
      const res = await fetch(`${API_BASE_URL}/api/analyze?nickname=${nickname}&button=${button}`);
      
      if (!res.ok) {
        // 백엔드에서 보낸 404 등의 에러 메시지 처리
        const errorJson = await res.json();
        alert(errorJson.message || "조회 중 오류가 발생했습니다.");
        return;
      }

      const resultJson: AnalyzeResponse = await res.json();
      setData(resultJson); // 데이터 저장 -> 화면이 자동으로 바뀜 (ResultView 표시)

    } catch (error) {
      console.error(error);
      alert("서버 통신 실패! 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      {/* 1. 검색 폼 (항상 보임) */}
      <SearchForm onSearch={fetchAnalyze} isLoading={loading} />

      {/* 2. 결과 화면 (데이터가 있을 때만 보임) */}
      {data && <ResultView data={data} />}
    </main>
  );
}