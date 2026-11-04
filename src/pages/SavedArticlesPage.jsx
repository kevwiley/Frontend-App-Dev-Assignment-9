
import ArticleCard from '../components/ArticleCard';
import { useArticles } from '../context/ArticlesContext';

function SavedArticlesPage() {
  //get function that returns current user's saved articles
  const { getUserSavedArticles } = useArticles();

  //get only articles saved by logged-in user
  const savedArticles = getUserSavedArticles();

  return (
    <div>
      <h2 className="page-heading">Saved Articles</h2>
      {savedArticles.length === 0 ? (
        <div className="message">
          No saved articles yet. Browse articles and click the bookmark icon to save them!
        </div>
      ) : (
        <div className="articles-grid">
          {savedArticles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedArticlesPage;