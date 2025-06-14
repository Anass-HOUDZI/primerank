
export interface KeywordAnalysis {
  wordCount: number;
  characterCount: number;
  keywords: Array<{
    word: string;
    count: number;
    density: number;
    isRecommended: boolean;
  }>;
  readability: {
    score: number;
    level: string;
    improvements: string[];
  };
  suggestions: string[];
}

export interface MetaDescription {
  text: string;
  length: number;
  score: number;
  keywordDensity: number;
  cta: boolean;
  emotional: boolean;
}

export class OfflineToolsEngine {
  static analyzeKeywordDensity(content: string): KeywordAnalysis {
    const words = content.toLowerCase().match(/\b\w+\b/g) || [];
    const wordCount = words.length;
    const characterCount = content.length;
    
    const wordFreq: Record<string, number> = {};
    words.forEach(word => {
      if (word.length > 3) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });

    const keywords = Object.entries(wordFreq)
      .map(([word, count]) => ({
        word,
        count,
        density: (count / wordCount) * 100,
        isRecommended: count / wordCount >= 0.01 && count / wordCount <= 0.03
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    const avgWordsPerSentence = content.split(/[.!?]+/).length > 1 
      ? wordCount / content.split(/[.!?]+/).length 
      : wordCount;
    
    const readabilityScore = Math.max(0, Math.min(100, 100 - (avgWordsPerSentence * 2)));
    
    return {
      wordCount,
      characterCount,
      keywords,
      readability: {
        score: Math.round(readabilityScore),
        level: readabilityScore >= 70 ? 'Facile' : readabilityScore >= 50 ? 'Moyen' : 'Difficile',
        improvements: readabilityScore < 70 ? ['Raccourcir les phrases', 'Utiliser des mots plus simples'] : []
      },
      suggestions: keywords.length > 0 ? ['Optimiser la densité des mots-clés principaux'] : []
    };
  }

  static generateMetaDescription(content: string, primaryKeyword: string, secondaryKeywords: string[]): MetaDescription[] {
    const descriptions: MetaDescription[] = [];
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    const ctaWords = ['découvrez', 'obtenez', 'apprenez', 'téléchargez', 'essayez'];
    const emotionalWords = ['incroyable', 'exceptionnel', 'unique', 'révolutionnaire', 'innovant'];
    
    for (let i = 0; i < 5; i++) {
      const randomSentences = sentences.sort(() => 0.5 - Math.random()).slice(0, 2);
      let description = randomSentences.join('. ') + '.';
      
      if (description.length > 160) {
        description = description.substring(0, 157) + '...';
      }
      
      const hasCta = ctaWords.some(word => description.toLowerCase().includes(word));
      const hasEmotional = emotionalWords.some(word => description.toLowerCase().includes(word));
      const keywordDensity = (description.toLowerCase().split(primaryKeyword.toLowerCase()).length - 1) / description.split(' ').length * 100;
      
      let score = 50;
      if (description.length >= 150 && description.length <= 160) score += 30;
      if (hasCta) score += 10;
      if (hasEmotional) score += 10;
      if (keywordDensity >= 1 && keywordDensity <= 3) score += 20;
      
      descriptions.push({
        text: description,
        length: description.length,
        score: Math.min(100, score),
        keywordDensity,
        cta: hasCta,
        emotional: hasEmotional
      });
    }
    
    return descriptions.sort((a, b) => b.score - a.score);
  }
}
