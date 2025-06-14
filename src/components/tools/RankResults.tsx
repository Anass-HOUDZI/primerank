
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface RankData {
  keyword: string;
  position: number | null;
  url: string | null;
  previousPosition?: number;
  searchVolume: number;
  difficulty: number;
}

interface RankCheckResult {
  domain: string;
  keywords: RankData[];
  totalKeywords: number;
  avgPosition: number;
  improvements: number;
  declines: number;
}

interface RankResultsProps {
  data: RankCheckResult;
}

export const RankResults = ({ data }: RankResultsProps) => {
  const getPositionColor = (position: number | null) => {
    if (!position) return 'text-gray-400';
    if (position <= 3) return 'text-green-600 dark:text-green-400';
    if (position <= 10) return 'text-blue-600 dark:text-blue-400';
    if (position <= 20) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getChangeIcon = (current: number | null, previous: number | undefined) => {
    if (!current || !previous) return null;
    if (current < previous) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (current > previous) return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
    return <div className="w-4 h-4 text-gray-400">→</div>;
  };

  return (
    <div className="space-y-6">
      {/* Résumé */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{data.totalKeywords}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Mots-clés</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{data.avgPosition || 'N/A'}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Position moyenne</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{data.improvements}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Améliorations</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{data.declines}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Régressions</div>
        </Card>
      </div>

      {/* Tableau des résultats */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Détail des positions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium">Mot-clé</th>
                <th className="text-center py-3 px-4 font-medium">Position</th>
                <th className="text-center py-3 px-4 font-medium">Évolution</th>
                <th className="text-center py-3 px-4 font-medium">Volume</th>
                <th className="text-center py-3 px-4 font-medium">Difficulté</th>
                <th className="text-left py-3 px-4 font-medium">URL</th>
              </tr>
            </thead>
            <tbody>
              {data.keywords.map((result, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4 font-medium">{result.keyword}</td>
                  <td className={`py-3 px-4 text-center font-bold ${getPositionColor(result.position)}`}>
                    {result.position || 'Non classé'}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {getChangeIcon(result.position, result.previousPosition)}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">
                    {result.searchVolume.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs ${
                      result.difficulty >= 70 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      result.difficulty >= 40 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {result.difficulty}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300 truncate max-w-xs">
                    {result.url || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
