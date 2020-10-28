/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

import { BatColorIcon } from 'brave-ui/components/icons'

import { TermsOfService } from '../components/terms_of_service'
import { MainButton } from './main_button'

import * as style from './tip_opt_in_form.style'

interface Props {
  onEnable: () => void
  onDismiss: () => void
}

export function TipOptInForm (props: Props) {
  const onEnableClick = () => props.onEnable()
  const onDismissClick = () => props.onDismiss()
  return (
    <style.root>
      <style.content>
        <style.batIcon><BatColorIcon /></style.batIcon>
        <style.heading>Tip with Brave rewards</style.heading>
        <style.text>
          By using Brave rewards, you will start to gain BAT that you can use
          to tip creators.
        </style.text>
        <style.enable>
          <MainButton onClick={onEnableClick}>
            Start using Brave Rewards
          </MainButton>
        </style.enable>
        <style.dismiss>
          <button onClick={onDismissClick}>
            Maybe later
          </button>
        </style.dismiss>
      </style.content>
      <style.footer>
        <TermsOfService />
      </style.footer>
    </style.root>
  )
}
