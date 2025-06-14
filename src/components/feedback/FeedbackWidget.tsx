
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Star, Send, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/lib/analytics';

interface FeedbackWidgetProps {
  toolName?: string;
  position?: 'fixed' | 'inline';
}

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({
  toolName,
  position = 'fixed'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState<'bug' | 'feature' | 'improvement' | 'other'>('other');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { track } = useAnalytics();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Évaluation requise",
        description: "Veuillez donner une note avant d'envoyer",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const feedback = {
        toolName,
        rating,
        comment,
        category,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      };

      // Envoyer le feedback (remplacer par votre API)
      console.log('Feedback submitted:', feedback);

      // Tracking analytics
      track({
        name: 'feedback_submitted',
        category: 'conversion',
        properties: feedback
      });

      toast({
        title: "Merci pour votre retour !",
        description: "Votre feedback nous aide à améliorer nos outils"
      });

      // Reset form
      setRating(0);
      setComment('');
      setCategory('other');
      setIsOpen(false);

    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le feedback",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerClass = position === 'fixed' 
    ? 'fixed bottom-4 right-4 z-50'
    : 'w-full';

  if (!isOpen && position === 'fixed') {
    return (
      <div className={containerClass}>
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-12 w-12 shadow-lg"
          size="sm"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <Card className="p-4 w-80 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">Votre avis nous intéresse</h3>
          {position === 'fixed' && (
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {toolName && (
          <p className="text-xs text-gray-600 mb-3">
            Outil : {toolName}
          </p>
        )}

        {/* Rating */}
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">
            Note générale *
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`p-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                <Star className="h-5 w-5 fill-current" />
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">
            Type de retour
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full p-2 border rounded-md text-sm"
          >
            <option value="other">Général</option>
            <option value="bug">Bug/Problème</option>
            <option value="feature">Nouvelle fonctionnalité</option>
            <option value="improvement">Amélioration</option>
          </select>
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">
            Commentaire (optionnel)
          </label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Partagez vos suggestions..."
            className="text-sm"
            rows={3}
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || rating === 0}
          size="sm"
          className="w-full"
        >
          {isSubmitting ? (
            <>Envoi en cours...</>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Envoyer
            </>
          )}
        </Button>
      </Card>
    </div>
  );
};
