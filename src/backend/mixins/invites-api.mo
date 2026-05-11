import Map "mo:core/Map";
import Types "../types/common";
import InvitesLib "../lib/invites";

mixin (
  invites : Map.Map<Text, Types.InviteToken>,
  boards : Map.Map<Types.BoardId, Types.Board>,
) {
  public shared ({ caller }) func generateInviteToken(boardId : Types.BoardId) : async ?Text {
    InvitesLib.generateInviteToken(invites, boards, caller, boardId);
  };

  public shared query func validateInviteToken(token : Text) : async ?(Types.BoardId, Types.BoardRole) {
    InvitesLib.validateInviteToken(invites, token);
  };

  public shared ({ caller }) func joinBoardWithToken(token : Text) : async { #ok; #err : Text } {
    InvitesLib.joinBoardWithToken(invites, boards, caller, token);
  };
}
