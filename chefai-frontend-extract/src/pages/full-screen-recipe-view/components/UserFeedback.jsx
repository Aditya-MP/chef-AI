import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserFeedback = ({ 
  recipe = null,
  className = ""
}) => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        verified: true
      },
      rating: 5,
      date: "2025-01-15",
      text: `This risotto recipe is absolutely perfect! The step-by-step instructions made it so easy to follow, even as a beginner. The mushrooms were perfectly caramelized and the creamy texture was spot on. My family loved it and asked for seconds!`,
      helpful: 12,
      photos: ["https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=200&h=200&fit=crop"]
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        verified: false
      },
      rating: 4,
      date: "2025-01-10",
      text: `Great recipe overall! I substituted the heavy cream with coconut cream for a dairy-free version and it worked wonderfully. The cooking time was accurate and the tips were very helpful. Will definitely make this again.`,
      helpful: 8,
      photos: []
    },
    {
      id: 3,
      user: {
        name: "Emma Rodriguez",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        verified: true
      },
      rating: 5,
      date: "2025-01-08",
      text: `Incredible! This is now my go-to risotto recipe. The ingredient substitution suggestions were a lifesaver when I couldn't find Arborio rice. Used short-grain rice instead and it turned out amazing. The timer feature in cooking mode was so helpful!`,
      helpful: 15,
      photos: []
    }
  ];

  const handleRatingClick = (rating) => {
    setUserRating(rating);
    if (!showReviewForm) {
      setShowReviewForm(true);
    }
  };

  const handleSubmitReview = async () => {
    if (userRating === 0) return;
    
    setSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Review submitted:', {
        recipeId: recipe?.id,
        rating: userRating,
        text: reviewText
      });
      
      // Reset form
      setUserRating(0);
      setReviewText('');
      setShowReviewForm(false);
      
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleHelpfulClick = (reviewId) => {
    console.log('Marked review as helpful:', reviewId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
  }));

  return (
    <div className={`bg-card rounded-lg border border-border shadow-warm ${className}`}>
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Reviews & Ratings
        </h3>
      </div>

      {/* Rating Summary */}
      <div className="p-4 lg:p-6 border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
              <span className="text-3xl font-mono font-bold text-foreground">
                {averageRating.toFixed(1)}
              </span>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    name="Star"
                    size={20}
                    className={`${
                      star <= Math.round(averageRating)
                        ? 'text-secondary fill-current' :'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on {reviews.length} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm font-mono text-muted-foreground w-8">
                  {rating}★
                </span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-secondary h-2 rounded-full transition-smooth"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm font-mono text-muted-foreground w-8">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Rating Section */}
      <div className="p-4 lg:p-6 border-b border-border">
        <h4 className="font-medium text-foreground mb-4">Rate this recipe</h4>
        
        <div className="flex items-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingClick(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="touch-target transition-quick hover:scale-110"
            >
              <Icon
                name="Star"
                size={24}
                className={`${
                  star <= (hoverRating || userRating)
                    ? 'text-secondary fill-current' :'text-muted-foreground hover:text-secondary'
                }`}
              />
            </button>
          ))}
          {userRating > 0 && (
            <span className="ml-2 text-sm text-muted-foreground">
              {userRating} out of 5 stars
            </span>
          )}
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="space-y-4">
            <Input
              label="Write a review (optional)"
              type="text"
              placeholder="Share your experience with this recipe..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full"
            />
            
            <div className="flex items-center space-x-3">
              <Button
                variant="default"
                onClick={handleSubmitReview}
                loading={submitting}
                disabled={userRating === 0}
              >
                Submit Review
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => {
                  setShowReviewForm(false);
                  setUserRating(0);
                  setReviewText('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="p-4 lg:p-6">
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
              {/* Review Header */}
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={review.user.avatar}
                    alt={review.user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <Icon name="User" size={20} className="text-muted-foreground" style={{ display: 'none' }} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="font-medium text-foreground">{review.user.name}</h5>
                    {review.user.verified && (
                      <Icon name="CheckCircle" size={16} className="text-primary" />
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon
                          key={star}
                          name="Star"
                          size={14}
                          className={`${
                            star <= review.rating
                              ? 'text-secondary fill-current' :'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-caption text-muted-foreground">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="ml-13">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {review.text}
                </p>

                {/* Review Photos */}
                {review.photos.length > 0 && (
                  <div className="flex space-x-2 mb-3">
                    {review.photos.map((photo, index) => (
                      <div key={index} className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                        <img
                          src={photo}
                          alt={`Review photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Review Actions */}
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleHelpfulClick(review.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Icon name="ThumbsUp" size={14} className="mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Icon name="MessageCircle" size={14} className="mr-1" />
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Reviews */}
        <div className="text-center mt-6">
          <Button variant="outline">
            Load More Reviews
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserFeedback;