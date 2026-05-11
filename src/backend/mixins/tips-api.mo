import Time "mo:core/Time";
import TipsLib "../lib/tips";

mixin () {

  public query func getDailyTip() : async Text {
    TipsLib.getDailyTip(Time.now());
  };
};
