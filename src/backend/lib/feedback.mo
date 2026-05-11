import List "mo:core/List";
import CommonTypes "../types/common";
import FeedbackTypes "../types/feedback";

module {
  public type State = {
    feedbacks     : List.List<FeedbackTypes.Feedback>;
    testimonials  : List.List<FeedbackTypes.Testimonial>;
    counter       : { var nextId : Nat };
  };

  public func submitFeedback(
    state      : State,
    parentName : Text,
    email      : Text,
    rating     : Nat,
    message    : Text
  ) : FeedbackTypes.Feedback {
    let fb : FeedbackTypes.Feedback = {
      id          = state.counter.nextId;
      parentName  = parentName;
      email       = email;
      rating      = rating;
      message     = message;
      submittedAt = CommonTypes.now();
    };
    state.counter.nextId += 1;
    state.feedbacks.add(fb);
    fb;
  };

  public func listFeedbacks(state : State) : [FeedbackTypes.Feedback] {
    state.feedbacks.toArray();
  };

  public func submitTestimonial(
    state      : State,
    parentName : Text,
    content    : Text
  ) : FeedbackTypes.Testimonial {
    let t : FeedbackTypes.Testimonial = {
      id          = state.counter.nextId;
      parentName  = parentName;
      content     = content;
      submittedAt = CommonTypes.now();
    };
    state.counter.nextId += 1;
    state.testimonials.add(t);
    t;
  };

  public func listTestimonials(state : State) : [FeedbackTypes.Testimonial] {
    state.testimonials.toArray();
  };
};
