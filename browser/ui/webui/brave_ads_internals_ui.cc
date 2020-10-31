/* Copyright (c) 2019 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "brave/browser/ui/webui/brave_ads_internals_ui.h"

#include <memory>
#include <string>
#include <utility>
#include <vector>

#include "brave/components/brave_ads/browser/ads_service.h"
#include "brave/components/brave_ads/browser/ads_service_factory.h"
// #include "brave/components/brave_ads/resources/grit/brave_ads_internals_generated_map.h"
#include "chrome/browser/profiles/profile.h"
#include "content/public/browser/web_ui.h"
#include "content/public/browser/web_ui_message_handler.h"
#include "bat/ads/mojom.h"

#if defined(BRAVE_CHROMIUM_BUILD)
#include "brave/components/brave_rewards/resources/grit/brave_rewards_resources.h"
#else
#include "components/grit/components_resources.h"
#include "components/grit/components_scaled_resources.h"
#endif

namespace {

const int g_partial_log_max_lines = 5000;

class AdsInternalsDOMHandler : public content::WebUIMessageHandler {
 public:
  AdsInternalsDOMHandler();
  ~AdsInternalsDOMHandler() override;

  void Init();

  // WebUIMessageHandler implementation.
  void RegisterMessages() override;

 private:
  void HandleGetAdsInternalsInfo(const base::ListValue* args);
  void OnGetAdsInternalsInfo(ads::InternalsInfoPtr info);

  brave_ads::AdsService* ads_service_;  // NOT OWNED
  Profile* profile_;
  base::WeakPtrFactory<AdsInternalsDOMHandler> weak_ptr_factory_;

  DISALLOW_COPY_AND_ASSIGN(AdsInternalsDOMHandler);
};

AdsInternalsDOMHandler::AdsInternalsDOMHandler()
    : ads_service_(nullptr), profile_(nullptr), weak_ptr_factory_(this) {}

AdsInternalsDOMHandler::~AdsInternalsDOMHandler() {}

void AdsInternalsDOMHandler::RegisterMessages() {
  web_ui()->RegisterMessageCallback(
      "brave_ads_internals.getAdsInternalsInfo",
      base::BindRepeating(
          &AdsInternalsDOMHandler::HandleGetAdsInternalsInfo,
          base::Unretained(this)));
}

void AdsInternalsDOMHandler::Init() {
  profile_ = Profile::FromWebUI(web_ui());
  ads_service_ =
      brave_ads::AdsServiceFactory::GetForProfile(profile_);
}

void AdsInternalsDOMHandler::HandleGetAdsInternalsInfo(
    const base::ListValue* args) {
  ads_service_->GetInternalsInfo(
      base::BindOnce(&AdsInternalsDOMHandler::OnGetAdsInternalsInfo,
                     weak_ptr_factory_.GetWeakPtr()));
}

void AdsInternalsDOMHandler::OnGetAdsInternalsInfo(
    ads::InternalsInfoPtr info) {
  if (!web_ui()->CanCallJavascript()) {
    return;
  }

  base::DictionaryValue info_dict;
  if (info) {
    info_dict.SetString("locale", "en-js");
  }
  web_ui()->CallJavascriptFunctionUnsafe(
      "brave_ads_internals.onGetAdsInternalsInfo", info_dict);
}

}

BraveAdsInternalsUI::BraveAdsInternalsUI(content::WebUI* web_ui,
                                                 const std::string& name)
    : BasicUI(web_ui,
              name,
              kBraveAdsInternalsGenerated,
              kBraveAdsInternalsGeneratedSize,
              IDR_BRAVE_ADS_INTERNALS_HTML) {
  auto handler_owner = std::make_unique<AdsInternalsDOMHandler>();
  AdsInternalsDOMHandler* handler = handler_owner.get();
  web_ui->AddMessageHandler(std::move(handler_owner));
  handler->Init();
}

BraveAdsInternalsUI::~BraveAdsInternalsUI() {
}
