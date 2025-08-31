
import React from 'react';
import { GlobalHeader } from '../components/layout/GlobalHeader';
import { GlobalFooter } from '../components/layout/GlobalFooter';
import { Mail, Linkedin, Github, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader showSearch={false} />
      
      <main className="flex-1">
        <div className="bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Contactez-nous
              </h1>
              <p className="text-xl text-muted-foreground">
                Une question ? Une suggestion ? N'hésitez pas à nous contacter !
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <a
                href="mailto:anass.houdzi@gmail.com"
                className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group border"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">anass.houdzi@gmail.com</p>
                  </div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/anasshoudzi/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group border"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                    <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">LinkedIn</h3>
                    <p className="text-muted-foreground">Anass Houdzi</p>
                  </div>
                </div>
              </a>

              <a
                href="https://github.com/Anass-HOUDZI/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group border"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                    <Github className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">GitHub</h3>
                    <p className="text-muted-foreground">Anass-HOUDZI</p>
                  </div>
                </div>
              </a>

              <div className="bg-card rounded-xl p-6 shadow-sm border">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Support</h3>
                    <p className="text-muted-foreground">Réponse sous 24h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-card rounded-xl p-8 shadow-sm border">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Questions Fréquentes
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Les outils sont-ils vraiment gratuits ?
                  </h3>
                  <p className="text-muted-foreground">
                    Oui, tous nos outils sont 100% gratuits et le resteront. Notre mission est de 
                    démocratiser l'accès aux outils SEO professionnels.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Mes données sont-elles sécurisées ?
                  </h3>
                  <p className="text-muted-foreground">
                    Absolument. Nous ne stockons aucune donnée personnelle et toutes les analyses 
                    sont effectuées de manière sécurisée et confidentielle.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Puis-je suggérer de nouveaux outils ?
                  </h3>
                  <p className="text-muted-foreground">
                    Bien sûr ! N'hésitez pas à nous contacter par email avec vos suggestions. 
                    Nous sommes toujours à l'écoute de la communauté.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Copyright notice */}
      <div className="bg-muted/30 border-t">
        <div className="max-w-4xl mx-auto px-4 py-4 text-center">
          <p className="text-sm text-muted-foreground">
            Copyright © 2025{' '}
            <a 
              href="https://www.linkedin.com/in/anasshoudzi/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Anass Houdzi
            </a>
            {' '} – Tous droits réservés.
          </p>
        </div>
      </div>
      
      <GlobalFooter />
    </div>
  );
};

export default Contact;
