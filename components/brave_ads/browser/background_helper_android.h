/* Copyright (c) 2019 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef BRAVE_COMPONENTS_BRAVE_ADS_BROWSER_BACKGROUND_HELPER_ANDROID_H_
#define BRAVE_COMPONENTS_BRAVE_ADS_BROWSER_BACKGROUND_HELPER_ANDROID_H_

#include <memory>

#include "base/macros.h"
#include "base/memory/singleton.h"
#include "base/memory/weak_ptr.h"
#include "brave/components/brave_ads/browser/background_helper.h"
#include "base/android/application_status_listener.h"

namespace brave_ads {

class BackgroundHelperAndroid :
    public BackgroundHelper,
    public base::SupportsWeakPtr<BackgroundHelperAndroid> {
 public:
  BackgroundHelperAndroid(const BackgroundHelperAndroid&) = delete;
  BackgroundHelperAndroid& operator=(const BackgroundHelperAndroid&) = delete;

  static BackgroundHelperAndroid* GetInstance();

 private:
  friend struct base::DefaultSingletonTraits<BackgroundHelperAndroid>;

  BackgroundHelperAndroid();
  ~BackgroundHelperAndroid() override;

  std::unique_ptr<base::android::ApplicationStatusListener>
    app_status_listener_;

  base::android::ApplicationState last_state_;

  void OnApplicationStateChange(base::android::ApplicationState state);

  // BackgroundHelper impl
  bool IsForeground() const override;
};

}  // namespace brave_ads

#endif  // BRAVE_COMPONENTS_BRAVE_ADS_BROWSER_BACKGROUND_HELPER_ANDROID_H_
