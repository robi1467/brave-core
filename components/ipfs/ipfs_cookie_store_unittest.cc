/* Copyright (c) 2020 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "net/cookies/cookie_monster_store_test.h"  // For CookieStore mock
#include "net/cookies/cookie_store.h"
#include "net/cookies/cookie_store_unittest.h"
#include "net/log/test_net_log.h"
#include "testing/gtest/include/gtest/gtest.h"
#include "url/gurl.h"

namespace net {

struct IPFSCookieStoreTestTraits {
  static std::unique_ptr<CookieStore> Create() {
    return std::make_unique<CookieMonster>(nullptr /* store */,
                                           nullptr /* netlog */);
  }

  static void DeliverChangeNotifications() { base::RunLoop().RunUntilIdle(); }

  static const bool supports_http_only = true;
  static const bool supports_non_dotted_domains = true;
  static const bool preserves_trailing_dots = true;
  static const bool filters_schemes = true;
  static const bool has_path_prefix_bug = false;
  static const bool forbids_setting_empty_name = false;
  static const int creation_time_granularity_in_ms = 0;
  static const bool supports_cookie_access_semantics = true;
};

INSTANTIATE_TYPED_TEST_SUITE_P(IPFSCookieStore,
                               CookieStoreTest,
                               IPFSCookieStoreTestTraits);

class IPFSCookieStoreTest : public CookieStoreTest<IPFSCookieStoreTestTraits> {
 protected:
  IPFSCookieStoreTest()
      : ipfs_url_(GURL(
            "http://"
            "QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR.ipfs.localhost")),
        ipns_url_(GURL(
            "http://"
            "QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR.ipns.localhost")) {}

  const GURL& ipfs_url() { return ipfs_url_; }
  const GURL& ipns_url() { return ipns_url_; }

  RecordingTestNetLog net_log_;

 private:
  GURL ipfs_url_;
  GURL ipns_url_;
};

TEST_F(IPFSCookieStoreTest, CannotSetCookieOnIPFSocalhost) {
  scoped_refptr<MockPersistentCookieStore> store(new MockPersistentCookieStore);
  std::unique_ptr<CookieMonster> cm(new CookieMonster(store.get(), &net_log_));

  EXPECT_TRUE(SetCookie(cm.get(), ipfs_url(), "A=B"));
  EXPECT_FALSE(SetCookie(cm.get(), ipfs_url(),
                         "secret=private; domain=.ipfs.localhost"));
  auto cookies = GetAllCookies(cm.get());
  EXPECT_EQ(1U, cookies.size());

  EXPECT_TRUE(SetCookie(cm.get(), ipns_url(), "C=D"));
  EXPECT_FALSE(SetCookie(cm.get(), ipns_url(),
                         "secret=private; domain=.ipns.localhost"));
  cookies = GetAllCookies(cm.get());
  EXPECT_EQ(2U, cookies.size());
}

}  // namespace net
