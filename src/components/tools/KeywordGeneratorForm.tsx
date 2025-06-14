
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface KeywordGeneratorFormProps {
  seedKeyword: string;
  language: string;
  country: string;
  minVolume: string;
  competition: string;
  onSeedKeywordChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onMinVolumeChange: (value: string) => void;
  onCompetitionChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export const KeywordGeneratorForm = ({
  seedKeyword,
  language,
  country,
  minVolume,
  competition,
  onSeedKeywordChange,
  onLanguageChange,
  onCountryChange,
  onMinVolumeChange,
  onCompetitionChange,
  onSubmit,
  loading
}: KeywordGeneratorFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="seedKeyword">Mot-clé de base</Label>
        <Input
          id="seedKeyword"
          value={seedKeyword}
          onChange={(e) => onSeedKeywordChange(e.target.value)}
          placeholder="Ex: SEO, marketing digital..."
          className="mt-1"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="language">Langue</Label>
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="en">Anglais</SelectItem>
              <SelectItem value="es">Espagnol</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="country">Pays</Label>
          <Select value={country} onValueChange={onCountryChange}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FR">France</SelectItem>
              <SelectItem value="US">États-Unis</SelectItem>
              <SelectItem value="ES">Espagne</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="minVolume">Volume minimum</Label>
          <Select value={minVolume} onValueChange={onMinVolumeChange}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Tous</SelectItem>
              <SelectItem value="100">100+</SelectItem>
              <SelectItem value="500">500+</SelectItem>
              <SelectItem value="1000">1000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="competition">Concurrence</Label>
          <Select value={competition} onValueChange={onCompetitionChange}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="low">Faible</SelectItem>
              <SelectItem value="medium">Moyenne</SelectItem>
              <SelectItem value="high">Élevée</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        onClick={onSubmit}
        disabled={!seedKeyword.trim() || loading}
        className="w-full"
      >
        {loading ? 'Génération en cours...' : 'Générer les mots-clés'}
      </Button>
    </div>
  );
};
