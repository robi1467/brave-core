/* Copyright (c) 2020 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "brave/browser/net/ipfs_redirect_network_delegate_helper.h"

#include <memory>
#include <string>
#include <vector>

#include "brave/browser/net/url_context.h"
#include "brave/common/translate_network_constants.h"
#include "chrome/test/base/chrome_render_view_host_test_harness.h"
#include "net/traffic_annotation/network_traffic_annotation_test_helper.h"
#include "net/url_request/url_request_test_util.h"
#include "url/gurl.h"

namespace {

TEST(IPFSRedirectNetworkDelegateHelperTest, TranslateIPFSURIHTTPScheme) {
  GURL url("http://a.com/ipfs/QmfM2r8seH2GiRaC4esTjeraXEachRt8ZsSeGaWTPLyMoG");
  auto brave_request_info = std::make_shared<brave::BraveRequestInfo>(url);
  int rc = ipfs::OnBeforeURLRequest_IPFSRedirectWork(brave::ResponseCallback(),
                                                     brave_request_info);
  EXPECT_EQ(rc, net::OK);
  EXPECT_TRUE(brave_request_info->new_url_spec.empty());
}

TEST(IPFSRedirectNetworkDelegateHelperTest, TranslateIPFSURIIPFSSchemeLocal) {
  GURL url("ipfs://QmfM2r8seH2GiRaC4esTjeraXEachRt8ZsSeGaWTPLyMoG");
  auto brave_request_info = std::make_shared<brave::BraveRequestInfo>(url);
  brave_request_info->ipfs_local = true;
  int rc = ipfs::OnBeforeURLRequest_IPFSRedirectWork(brave::ResponseCallback(),
                                                     brave_request_info);
  EXPECT_EQ(rc, net::OK);
  EXPECT_EQ(brave_request_info->new_url_spec,
            "http://localhost:48080/ipfs/"
            "QmfM2r8seH2GiRaC4esTjeraXEachRt8ZsSeGaWTPLyMoG");
}

TEST(IPFSRedirectNetworkDelegateHelperTest, TranslateIPFSURIIPFSScheme) {
  GURL url("ipfs://QmfM2r8seH2GiRaC4esTjeraXEachRt8ZsSeGaWTPLyMoG");
  auto brave_request_info = std::make_shared<brave::BraveRequestInfo>(url);
  brave_request_info->ipfs_local = false;
  int rc = ipfs::OnBeforeURLRequest_IPFSRedirectWork(brave::ResponseCallback(),
                                                     brave_request_info);
  EXPECT_EQ(rc, net::OK);
  EXPECT_EQ(
      brave_request_info->new_url_spec,
      "https://dweb.link/ipfs/QmfM2r8seH2GiRaC4esTjeraXEachRt8ZsSeGaWTPLyMoG");
}

TEST(IPFSRedirectNetworkDelegateHelperTest, TranslateIPFSURIIPNSSchemeLocal) {
  GURL url("ipns://QmSrPmbaUKA3ZodhzPWZnpFgcPMFWF4QsxXbkWfEptTBJd");
  auto brave_request_info = std::make_shared<brave::BraveRequestInfo>(url);
  brave_request_info->ipfs_local = true;
  int rc = ipfs::OnBeforeURLRequest_IPFSRedirectWork(brave::ResponseCallback(),
                                                     brave_request_info);
  EXPECT_EQ(rc, net::OK);
  EXPECT_EQ(brave_request_info->new_url_spec,
            "http://localhost:48080/ipns/"
            "QmSrPmbaUKA3ZodhzPWZnpFgcPMFWF4QsxXbkWfEptTBJd");
}

TEST(IPFSRedirectNetworkDelegateHelperTest, TranslateIPFSURIIPNSScheme) {
  GURL url("ipns://QmSrPmbaUKA3ZodhzPWZnpFgcPMFWF4QsxXbkWfEptTBJd");
  auto brave_request_info = std::make_shared<brave::BraveRequestInfo>(url);
  brave_request_info->ipfs_local = false;
  int rc = ipfs::OnBeforeURLRequest_IPFSRedirectWork(brave::ResponseCallback(),
                                                     brave_request_info);
  EXPECT_EQ(rc, net::OK);
  EXPECT_EQ(
      brave_request_info->new_url_spec,
      "https://dweb.link/ipns/QmSrPmbaUKA3ZodhzPWZnpFgcPMFWF4QsxXbkWfEptTBJd");
}

}  // namespace
