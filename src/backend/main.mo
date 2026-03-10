import AccessControl "./authorization/access-control";
import MixinAuth "./authorization/MixinAuthorization";
import MixinBlob "./blob-storage/Mixin";

actor {
  let accessControlState : AccessControl.AccessControlState = AccessControl.initState();
  include MixinAuth (accessControlState);
  include MixinBlob ();
};
