import { useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { Button, SubmitBtn } from "../../components/ui/Buttons";
import { toast } from "react-hot-toast";

const ReviewModal = ({ isOpen, onClose, movieId, movieName }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post(`/movie/${movieId}/add-review`, {
        rating,
        comment: reviewText,
      });
      toast.success("Review Added successfully");
      setRating(0);
      setReviewText("");
      onClose();
    } catch (err) {
      toast.error("Failed to submit review");
      console.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open backdrop-blur-sm ">
      <div className="modal-box">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">
            Review <span className="text-primary">{movieName}</span>
          </h3>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Star Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-4xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-400"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Your Review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-2 rounded-md bg-base-300 border border-gray-600 focus:outline-none focus:border-primary"
              rows="4"
              placeholder="Write your review here..."
              required
            />
          </div>

          {/* Modal Actions (Buttons) */}
          <div className="modal-action">
            <Button
              title="Cancel"
              className="btn bg-black text-white"
              onClick={onClose}
            />
            <SubmitBtn
              title="Submit Review"
              className="btn btn-primary"
              width="auto"
              loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;