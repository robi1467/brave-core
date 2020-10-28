/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

import { BatColorIcon, WalletAddIcon } from 'brave-ui/components/icons'

import { CloseIcon } from '../components/icons/close_icon'
import { TermsOfService } from '../components/terms_of_service'
import { MainButton } from './main_button'
import { IdIcon } from './icons/id_icon'
import { CameraIcon } from './icons/camera_icon'

import * as style from './rewards_opt_in_modal.style'

interface Props {
  onClose: () => void
  onEnable: () => void
  onAddFunds: () => void
}

export function RewardsOptInModal (props: Props) {
  const [showAddFunds, setShowAddFunds] = React.useState(false)

  const onClickAddFunds = () => setShowAddFunds(true)

  const renderOptIn = () => (
    <>
      <style.header>
        <style.batIcon><BatColorIcon /></style.batIcon>
        Earn Tokens &amp; Give Back
      </style.header>
      <style.text>
        Earn tokens by viewing privacy-respecting ads and support your
        favorite sites and content creators automatically.
      </style.text>
      <style.enable>
        <MainButton onClick={props.onEnable}>
          Start using Brave Rewards
        </MainButton>
      </style.enable>
      <style.addFunds>
        <button onClick={onClickAddFunds}>
          <WalletAddIcon />Add funds
        </button>
      </style.addFunds>
    </>
  )

  const renderAddFunds = () => (
    <>
      <style.header>Add funds with Uphold</style.header>
      <style.text>
        If you don’t have an existing account with Uphold, you will need to
        show proof of identity with the following:
      </style.text>
      <style.addFundsItem>
        <IdIcon />Drivers license or passport
      </style.addFundsItem>
      <style.addFundsItem>
        <CameraIcon />A clear image of your face
      </style.addFundsItem>
      <style.addFundsAction>
        <MainButton onClick={props.onAddFunds}>
          Take me to Uphold
        </MainButton>
      </style.addFundsAction>
    </>
  )

  return (
    <style.root>
      <style.content>
        <style.close>
          <button onClick={props.onClose}><CloseIcon /></button>
        </style.close>
        {showAddFunds ? renderAddFunds() : renderOptIn()}
        <style.terms>
          <TermsOfService />
        </style.terms>
      </style.content>
    </style.root>
  )
}
