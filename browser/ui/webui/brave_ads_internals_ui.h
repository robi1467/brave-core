/* Copyright (c) 2019 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef BRAVE_BROWSER_UI_WEBUI_BRAVE_ADS_INTERNALS_UI_H_
#define BRAVE_BROWSER_UI_WEBUI_BRAVE_ADS_INTERNALS_UI_H_

#include <memory>
#include <string>

#include "base/memory/weak_ptr.h"
#include "brave/browser/ui/webui/basic_ui.h"

class BraveAdsInternalsUI : public BasicUI {
 public:
  BraveAdsInternalsUI(content::WebUI* web_ui, const std::string& host);
  ~BraveAdsInternalsUI() override;

 private:
  DISALLOW_COPY_AND_ASSIGN(BraveAdsInternalsUI);
};

#endif  // BRAVE_BROWSER_UI_WEBUI_BRAVE_ADS_INTERNALS_UI_H_
