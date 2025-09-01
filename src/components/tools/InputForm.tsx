
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Link, FileText, Globe } from 'lucide-react';
import { useSecurity } from '@/hooks/useSecurity';
import { DataSanitizer } from '@/lib/security';

interface InputFormProps {
  title: string;
  description?: string;
  inputType: 'url' | 'text' | 'file' | 'keyword';
  placeholder?: string;
  onSubmit: (data: any) => void;
  loading?: boolean;
  children?: React.ReactNode;
}

export const InputForm = ({
  title,
  description,
  inputType,
  placeholder,
  onSubmit,
  loading = false,
  children
}: InputFormProps) => {
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { validateInput, logSecurityEvent } = useSecurity('input-form');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputType === 'file' && file) {
      // File validation
      const validation = validateInput(file);
      if (!validation.valid) {
        logSecurityEvent('invalid_file_upload', { 
          filename: file.name,
          size: file.size,
          error: validation.error 
        }, 'high');
        return;
      }
      onSubmit({ file });
    } else if (inputValue.trim()) {
      // Input validation
      const validation = validateInput(inputValue.trim());
      if (!validation.valid) {
        logSecurityEvent('invalid_input', { 
          inputType,
          error: validation.error 
        }, 'medium');
        return;
      }
      onSubmit({ value: validation.sanitized || inputValue.trim() });
    }
  };

  const getIcon = () => {
    switch (inputType) {
      case 'url':
        return <Globe className="w-5 h-5" />;
      case 'file':
        return <Upload className="w-5 h-5" />;
      case 'text':
        return <FileText className="w-5 h-5" />;
      case 'keyword':
        return <Link className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    
    switch (inputType) {
      case 'url':
        return 'https://exemple.com';
      case 'text':
        return 'Saisissez votre texte ici...';
      case 'keyword':
        return 'mot-clé principal, mot-clé secondaire...';
      default:
        return 'Saisissez vos données...';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-start space-x-4 mb-6">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          {getIcon()}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h2>
          {description && (
            <p className="text-gray-600 dark:text-gray-300">
              {description}
            </p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {inputType === 'file' ? (
          <div>
            <Label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Choisir un fichier
            </Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white dark:bg-gray-900 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Télécharger un fichier</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        if (selectedFile) {
                          // Basic file validation
                          const maxSize = 10 * 1024 * 1024; // 10MB
                          const allowedTypes = ['text/csv', 'text/plain', 'application/xml', 'text/xml'];
                          
                          if (selectedFile.size > maxSize) {
                            logSecurityEvent('file_too_large', { 
                              filename: selectedFile.name, 
                              size: selectedFile.size 
                            }, 'medium');
                            return;
                          }
                          
                          if (!allowedTypes.includes(selectedFile.type)) {
                            logSecurityEvent('invalid_file_type', { 
                              filename: selectedFile.name, 
                              type: selectedFile.type 
                            }, 'high');
                            return;
                          }
                        }
                        setFile(selectedFile || null);
                      }}
                    />
                  </label>
                  <p className="pl-1">ou glisser-déposer</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  CSV, TXT, XML jusqu'à 10MB
                </p>
              </div>
            </div>
            {file && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Fichier sélectionné: {file.name}
              </p>
            )}
          </div>
        ) : inputType === 'text' ? (
          <div>
            <Label htmlFor="text-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contenu à analyser
            </Label>
            <Textarea
              id="text-input"
              value={inputValue}
              onChange={(e) => {
                const sanitized = DataSanitizer.sanitizeString(e.target.value);
                setInputValue(sanitized);
              }}
              placeholder={getPlaceholder()}
              rows={6}
              className="w-full"
              required
            />
          </div>
        ) : (
          <div>
            <Label htmlFor="input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {inputType === 'url' ? 'URL à analyser' : inputType === 'keyword' ? 'Mots-clés' : 'Données'}
            </Label>
            <Input
              id="input"
              type={inputType === 'url' ? 'url' : 'text'}
              value={inputValue}
              onChange={(e) => {
                const sanitized = inputType === 'url' 
                  ? DataSanitizer.sanitizeUrl(e.target.value)
                  : DataSanitizer.sanitizeString(e.target.value);
                setInputValue(sanitized);
              }}
              placeholder={getPlaceholder()}
              className="w-full"
              required
            />
          </div>
        )}

        {children}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading || (!inputValue.trim() && !file)}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Analyse en cours...
            </>
          ) : (
            'Lancer l\'analyse'
          )}
        </Button>
      </form>
    </Card>
  );
};
