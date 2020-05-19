#include "brave/components/brave_sync/brave_sync_prefs.h"
#define BRAVE_SIGN_IN_PRIMARY_ACCOUNT                         \
  const char sync_code[] =                                    \
      "badge unique kiwi orient spring venue piano "          \
      "lake admit ill roof brother grant hour better "        \
      "proud cabbage fee slow economy wage final fox cancel"; \
  brave_sync::Prefs brave_sync_prefs(profile_->GetPrefs());   \
  brave_sync_prefs.SetSyncV1Migrated(true);                   \
  brave_sync_prefs.SetSeed(sync_code);
#include "../../../../../../../chrome/browser/sync/test/integration/profile_sync_service_harness.cc"
#undef BRAVE_SIGN_IN_PRIMARY_ACCOUNT