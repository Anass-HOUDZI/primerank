
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface KeywordConfigFormProps {
  keywords: string[];
  domain: string;
  onKeywordsChange: (keywords: string[]) => void;
  onDomainChange: (domain: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export const KeywordConfigForm = ({
  keywords,
  domain,
  onKeywordsChange,
  onDomainChange,
  onSubmit,
  loading
}: KeywordConfigFormProps) => {
  const addKeyword = () => {
    onKeywordsChange([...keywords, '']);
  };

  const removeKeyword = (index: number) => {
    onKeywordsChange(keywords.filter((_, i) => i !== index));
  };

  const updateKeyword = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    onKeywordsChange(newKeywords);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="domain">Domaine à analyser</Label>
        <Input
          id="domain"
          type="url"
          placeholder="https://exemple.com"
          value={domain}
          onChange={(e) => onDomainChange(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label>Mots-clés à vérifier</Label>
        <div className="space-y-2 mt-2">
          {keywords.map((keyword, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                placeholder="Mot-clé à vérifier"
                value={keyword}
                onChange={(e) => updateKeyword(index, e.target.value)}
                className="flex-1"
              />
              {keywords.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeKeyword(index)}
                  type="button"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addKeyword}
            className="w-full"
            type="button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un mot-clé
          </Button>
        </div>
      </div>

      <Button 
        onClick={onSubmit}
        disabled={loading}
        className="w-full"
        type="button"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Vérification en cours...
          </>
        ) : (
          'Vérifier les positions'
        )}
      </Button>
    </div>
  );
};
