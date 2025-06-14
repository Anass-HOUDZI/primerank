
/**
 * Moteur d'outils SEO côté client sans APIs
 */
export interface KeywordAnalysis {
  keywords: Array<{
    word: string;
    count: number;
    density: number;
    prominence: number;
    isRecommended: boolean;
  }>;
  suggestions: string[];
  readability: {
    score: number;
    level: string;
    improvements: string[];
  };
  wordCount: number;
  characterCount: number;
}

export interface MetaDescription {
  text: string;
  length: number;
  keywordDensity: number;
  cta: boolean;
  emotional: boolean;
  score: number;
}

export class OfflineToolsEngine {
  /**
   * Analyse la densité des mots-clés
   */
  static analyzeKeywordDensity(content: string): KeywordAnalysis {
    const text = content.toLowerCase().replace(/[^\w\s]/g, ' ');
    const words = text.split(/\s+/).filter(word => word.length > 2);
    const wordCount = words.length;
    const characterCount = content.length;
    
    // Comptage des mots
    const wordCounts: { [key: string]: number } = {};
    words.forEach(word => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });
    
    // Génération des statistiques
    const keywords = Object.entries(wordCounts)
      .map(([word, count]) => ({
        word,
        count,
        density: (count / wordCount) * 100,
        prominence: count > 1 ? count / Math.log(wordCount) : 0,
        isRecommended: count >= 2 && count <= Math.max(2, wordCount * 0.03)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
    
    const suggestions = this.generateKeywordSuggestions(keywords, wordCount);
    const readability = this.calculateReadability(content);
    
    return {
      keywords,
      suggestions,
      readability,
      wordCount,
      characterCount
    };
  }
  
  /**
   * Génère des méta descriptions optimisées
   */
  static generateMetaDescription(
    content: string, 
    primaryKeyword: string, 
    secondaryKeywords: string[] = []
  ): MetaDescription[] {
    const sentences = content.match(/[^\.!?]+[\.!?]+/g) || [content];
    const firstSentences = sentences.slice(0, 3).join(' ');
    
    const templates = [
      `Découvrez ${primaryKeyword} avec nos conseils experts. ${firstSentences.substring(0, 100)}...`,
      `${primaryKeyword} : tout ce que vous devez savoir. Guide complet et conseils pratiques.`,
      `Optimisez votre ${primaryKeyword} grâce à nos solutions innovantes. Résultats garantis.`,
      `${primaryKeyword} expliqué simplement. ${secondaryKeywords.slice(0, 2).join(', ')} et plus encore.`
    ];
    
    return templates.map(template => {
      const length = template.length;
      const keywordDensity = this.calculateKeywordDensity(template, primaryKeyword);
      
      return {
        text: template,
        length,
        keywordDensity,
        cta: template.includes('Découvrez') || template.includes('Optimisez'),
        emotional: template.includes('expert') || template.includes('innovant'),
        score: this.scoreMetaDescription(template, primaryKeyword, length)
      };
    }).sort((a, b) => b.score - a.score);
  }
  
  /**
   * Calcule la lisibilité du texte
   */
  static calculateReadability(content: string) {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = content.split(/\s+/).filter(w => w.length > 0);
    const syllables = words.reduce((total, word) => total + this.countSyllables(word), 0);
    
    // Score Flesch Reading Ease
    const avgSentenceLength = words.length / sentences.length;
    const avgSyllablesPerWord = syllables / words.length;
    const fleschScore = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
    
    let level = 'Très difficile';
    let improvements = [];
    
    if (fleschScore >= 90) level = 'Très facile';
    else if (fleschScore >= 80) level = 'Facile';
    else if (fleschScore >= 70) level = 'Assez facile';
    else if (fleschScore >= 60) level = 'Standard';
    else if (fleschScore >= 50) level = 'Assez difficile';
    else if (fleschScore >= 30) level = 'Difficile';
    
    if (avgSentenceLength > 20) {
      improvements.push('Raccourcir les phrases (moyenne actuelle: ' + Math.round(avgSentenceLength) + ' mots)');
    }
    
    if (avgSyllablesPerWord > 1.7) {
      improvements.push('Utiliser des mots plus simples');
    }
    
    return {
      score: Math.round(fleschScore),
      level,
      improvements
    };
  }
  
  private static generateKeywordSuggestions(keywords: any[], wordCount: number): string[] {
    const suggestions = [];
    
    const overUsed = keywords.filter(k => k.density > 5);
    if (overUsed.length > 0) {
      suggestions.push(`Réduire l'usage de: ${overUsed.map(k => k.word).join(', ')}`);
    }
    
    const underUsed = keywords.filter(k => k.density < 1 && k.count === 1);
    if (underUsed.length > 5) {
      suggestions.push('Développer davantage les mots-clés secondaires');
    }
    
    if (wordCount < 300) {
      suggestions.push('Contenu trop court pour un bon référencement (minimum 300 mots)');
    }
    
    return suggestions;
  }
  
  private static calculateKeywordDensity(text: string, keyword: string): number {
    const words = text.toLowerCase().split(/\s+/);
    const keywordCount = words.filter(word => word.includes(keyword.toLowerCase())).length;
    return (keywordCount / words.length) * 100;
  }
  
  private static scoreMetaDescription(text: string, keyword: string, length: number): number {
    let score = 50;
    
    // Longueur optimale
    if (length >= 150 && length <= 160) score += 20;
    else if (length >= 140 && length <= 170) score += 10;
    else if (length < 120 || length > 180) score -= 20;
    
    // Présence du mot-clé
    if (text.toLowerCase().includes(keyword.toLowerCase())) score += 15;
    
    // Call-to-action
    if (/découvrez|apprenez|optimisez|trouvez/.test(text.toLowerCase())) score += 10;
    
    return Math.max(0, Math.min(100, score));
  }
  
  private static countSyllables(word: string): number {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    
    const vowels = word.match(/[aeiouy]+/g);
    let syllableCount = vowels ? vowels.length : 1;
    
    if (word.endsWith('e')) syllableCount--;
    if (syllableCount <= 0) syllableCount = 1;
    
    return syllableCount;
  }
}
