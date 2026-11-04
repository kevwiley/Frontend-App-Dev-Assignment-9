import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

//create Articles context
const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  //store saved articles in object organized by username
  const [savedArticles, setSavedArticles] = useState({});

  //get currently logged-in user
  const { user } = useAuth();

  //save article for the current user
  const saveArticle = (article) => {
    if (!user) return;
    const username = user.username;

    setSavedArticles(prev => {
      const userArticles = prev[username] || [];

      // Check if article is already saved
      if (userArticles.find(a => a.url === article.url)) {
        return prev;
      }
      return {
        ...prev,
        [username]: [...userArticles, article]
      };
    });
  };

  //remove article for the current user
  const removeArticle = (url) => {
    if (!user) return;
    const username = user.username;

    setSavedArticles(prev => {
      const userArticles = prev[username] || [];
      return {
        ...prev,
        [username]: userArticles.filter(article => article.url !== url)
      };
    });
  };

  //check whether article is saved by current user
  const isArticleSaved = (url) => {
    if (!user) return false;
    const userArticles = savedArticles[user.username] || [];
    return userArticles.some(article => article.url === url);
  };

  //return only current user's saved articles
  const getUserSavedArticles = () => {
    if (!user) return [];
    return savedArticles[user.username] || [];
  };

  //return saved articles for every user
  const getAllUserArticles = () => {
    return savedArticles;
  };

  return (
    <ArticlesContext.Provider
      value={{
        savedArticles,
        saveArticle,
        removeArticle,
        isArticleSaved,
        getUserSavedArticles,
        getAllUserArticles
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

//custom hook for accessing Articles context
export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }
  return context;
};