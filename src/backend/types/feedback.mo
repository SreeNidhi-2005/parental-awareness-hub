import CommonTypes "common";

module {
  public type FeedbackId = Nat;

  public type Feedback = {
    id          : FeedbackId;
    parentName  : Text;
    email       : Text;
    rating      : Nat;  // 1-5
    message     : Text;
    submittedAt : CommonTypes.Timestamp;
  };

  public type Testimonial = {
    id          : FeedbackId;
    parentName  : Text;
    content     : Text;
    submittedAt : CommonTypes.Timestamp;
  };
};
