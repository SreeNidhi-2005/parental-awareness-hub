import Map "mo:core/Map";
import Types "../types/common";
import PermissionsLib "../lib/permissions";

mixin (boards : Map.Map<Types.BoardId, Types.Board>) {
  public shared ({ caller }) func setUserRole(boardId : Types.BoardId, userPrincipal : Principal, role : Types.BoardRole) : async Bool {
    PermissionsLib.setUserRole(boards, caller, boardId, userPrincipal, role);
  };

  public shared query ({ caller }) func getUserRole(boardId : Types.BoardId) : async ?Types.BoardRole {
    PermissionsLib.getUserRole(boards, caller, boardId);
  };

  public shared query ({ caller }) func getBoardPermissions(boardId : Types.BoardId) : async [Types.PermissionEntry] {
    PermissionsLib.getBoardPermissions(boards, caller, boardId);
  };
}
