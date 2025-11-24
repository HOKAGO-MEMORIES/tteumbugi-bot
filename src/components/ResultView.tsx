import { AnalyzeResponse } from "@/types/api";

export default function ResultView({ data }: { data: AnalyzeResponse }) {
  return (
    <div className="mt-8 max-w-2xl mx-auto space-y-8">
      
      {/* 1. 기본 정보 */}
      <div className="bg-gray-50 p-6 rounded-lg text-center border">
        <h2 className="text-2xl font-bold text-blue-600">{data.tier.tierName}</h2>
        <p className="text-gray-600 mt-1">
            DJ CLASS: <span className="font-bold">{data.djClass.displayScore}</span> ({data.djClass.grade})
        </p>
      </div>

      {/* 2. 기록 갱신 추천 */}
      <div>
        <h3 className="text-lg font-bold mb-3 border-b pb-2">기록 갱신 추천</h3>
        <ul className="space-y-3">
          {data.improvements.map((item, idx) => (
            <li key={idx} className="p-3 bg-white border rounded hover:shadow-md transition text-black">
              <div className="font-semibold">
                [{item.difficulty} {item.level}] {item.title}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                현재 {item.currentScore.toFixed(2)}% → <span className="text-blue-600 font-bold">목표 {item.targetScore.toFixed(2)}%</span> 
                (예상 +{item.powerIncrease.toFixed(2)}점)
              </div>
            </li>
          ))}
          {data.improvements.length === 0 && <p className="text-gray-500">추천 곡이 없습니다.</p>}
        </ul>
      </div>

      {/* 3. 미기록 노래 추천 */}
      <div>
        <h3 className="text-lg font-bold mb-3 border-b pb-2">미기록 노래 추천</h3>
        <ul className="space-y-3">
          {data.newSongs.map((item, idx) => (
            <li key={idx} className="p-3 bg-white border rounded hover:shadow-md transition text-black">
              <div className="font-semibold">
                <span className={item.category === 'NEW' ? "text-pink-500 mr-1" : "text-blue-500 mr-1"}>[{item.category}]</span>
                {item.title} ({item.difficulty} {item.level})
              </div>
              <div className="text-sm text-gray-600 mt-1">
                 목표 <span className="text-green-600 font-bold">{item.targetScore.toFixed(2)}%</span> 달성 시 진입 가능
                 (컷 +{item.gapOverCutoff.toFixed(2)}점)
              </div>
            </li>
          ))}
           {data.newSongs.length === 0 && <p className="text-gray-500">추천 곡이 없습니다.</p>}
        </ul>
      </div>
    </div>
  );
}