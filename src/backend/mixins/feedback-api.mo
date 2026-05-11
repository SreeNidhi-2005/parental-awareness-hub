import List "mo:core/List";
import FeedbackTypes "../types/feedback";
import FeedbackLib "../lib/feedback";

mixin (
  feedbacks    : List.List<FeedbackTypes.Feedback>,
  testimonials : List.List<FeedbackTypes.Testimonial>,
  fbCounter    : { var nextId : Nat }
) {

  public shared func submitFeedback(
    parentName : Text,
    email      : Text,
    rating     : Nat,
    message    : Text
  ) : async FeedbackTypes.Feedback {
    FeedbackLib.submitFeedback({ feedbacks; testimonials; counter = fbCounter }, parentName, email, rating, message);
  };

  public query func listFeedbacks() : async [FeedbackTypes.Feedback] {
    FeedbackLib.listFeedbacks({ feedbacks; testimonials; counter = fbCounter });
  };

  public shared func submitTestimonial(
    parentName : Text,
    content    : Text
  ) : async FeedbackTypes.Testimonial {
    FeedbackLib.submitTestimonial({ feedbacks; testimonials; counter = fbCounter }, parentName, content);
  };

  public query func listTestimonials() : async [FeedbackTypes.Testimonial] {
    FeedbackLib.listTestimonials({ feedbacks; testimonials; counter = fbCounter });
  };
};
