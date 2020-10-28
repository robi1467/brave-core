/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { injectThemeVariables } from '../../lib/theme_loader'
import { LocaleContext } from '../../lib/locale_context'

import { RewardsTour } from '../rewards_tour'
import { RewardsOptInModal } from '../rewards_opt_in_modal'
import { TipOptInForm } from '../tip_opt_in_form'

import { localeStrings } from './locale_strings'

const localeContext = {
  getString (key: string) {
    return localeStrings[key] || 'MISSING'
  }
}

function actionLogger (name: string) {
  return (...args: any[]) => {
    console.log(name, ...args)
  }
}

interface StoryWrapperProps {
  width?: number
  height?: number
  children: React.ReactNode
}

function StoryWrapper (props: StoryWrapperProps) {
  function onRootMount (elem: HTMLElement | null) {
    if (elem) {
      injectThemeVariables(elem)
    }
  }

  return (
    <LocaleContext.Provider value={localeContext}>
      <div
        ref={onRootMount}
        style={{ width: props.width, height: props.height }}
      >
        {props.children}
      </div>
    </LocaleContext.Provider>
  )
}

function OnboardingTourWrapper () {
  const [adsPerHour, setAdsPerHour] = React.useState(1)
  const [acPercent, setAcPercent] = React.useState(5)

  return (
    <StoryWrapper width={363}>
      <RewardsTour
        showSettings={true}
        settings={{ adsPerHour, acPercent }}
        onAdsPerHourChanged={setAdsPerHour}
        onAcPercentChanged={setAcPercent}
        onDone={actionLogger('RewardsTour.onDone')}
      />
    </StoryWrapper>
  )
}

storiesOf('Rewards/Onboarding', module)
  .add('Onboarding Tour', () => {
    return <OnboardingTourWrapper />
  })
  .add('Opt-in Modal', () => {
    return (
      <StoryWrapper>
        <RewardsOptInModal
          onEnable={actionLogger('onEnable')}
          onClose={actionLogger('onClose')}
          onAddFunds={actionLogger('onAddFunds')}
        />
      </StoryWrapper>
    )
  })
  .add('Tip Opt-in', () => {
    return (
      <StoryWrapper width={363} height={454}>
        <TipOptInForm
          onEnable={actionLogger('onEnable')}
          onDismiss={actionLogger('onDismiss')}
        />
      </StoryWrapper>
    )
  })
