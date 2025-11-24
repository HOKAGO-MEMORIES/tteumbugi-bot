"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  onSearch: (nickname: string, button: string) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: Props) {
  const [nickname, setNickname] = useState("");
  const [button, setButton] = useState("4");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return alert("닉네임을 입력해주세요.");
    onSearch(nickname, button);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 border rounded-lg shadow-sm bg-white max-w-md mx-auto">

      <div className="flex justify-center mb-2">
        <Image 
          src="/tteumbugi.png"       
          alt="뜸부기"  
          width={500}           
          height={500}         
          priority              
          className="object-contain" 
        />
      </div>

      <h2 className="text-xl font-bold text-center">뜸부기봇</h2>
      
      <div>
        <label className="block text-sm font-medium mb-1">닉네임</label>
        <input
          type="text"
          className="w-full p-2 border rounded text-black"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="V-Archive 닉네임"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">버튼</label>
        <div className="flex gap-4 justify-center">
          {["4", "5", "6", "8"].map((btn) => (
            <label key={btn} className="cursor-pointer flex items-center gap-1">
              <input
                type="radio"
                name="button"
                value={btn}
                checked={button === btn}
                onChange={(e) => setButton(e.target.value)}
              />
              {btn}B
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400 transition"
      >
        {isLoading ? "분석 중..." : "조회하기"}
      </button>
    </form>
  );
}