/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

import { TourNavigation } from './tour_navigation'
import { SettingsForm } from './settings_form'

import * as style from './rewards_tour.style'

import batEcosystemImage from './assets/tour_bat_ecosystem.svg'
import braveAdsImage from './assets/tour_brave_ads.svg'
import batScheduleImage from './assets/tour_bat_schedule.svg'
import acImage from './assets/tour_ac.svg'
import tippingImage from './assets/tour_tipping.svg'
import redeemImage from './assets/tour_redeem.svg'
import completedImage from './assets/tour_completed.svg'

interface Settings {
  adsPerHour: number
  acPercent: number
}

interface Props {
  showSettings: boolean
  settings: Settings
  onAdsPerHourChanged: (adsPerHour: number) => void
  onAcPercentChanged: (acPercent: number) => void
  onDone: () => void
}

function basicStep (
  heading: React.ReactNode,
  text: React.ReactNode,
  image: string
) {
  return (
    <style.stepPanel>
      <style.stepHeader>{heading}</style.stepHeader>
      <style.stepText>{text}</style.stepText>
      <style.stepGraphic><img src={image} /></style.stepGraphic>
    </style.stepPanel>
  )
}

function stepWelcome () {
  return basicStep(
    'Welcome to Brave Rewards!',
    (
      <>
        Brave private ads rewards you with tokens to support content creators
        unlike traditional ads, all while keeping your personal information
        private.
      </>
    ),
    batEcosystemImage)
}

function stepAds () {
  return basicStep(
    'Where do ads show up?',
    (
      <>
        Brave private ads will appear as a normal notification. You control how
        often you see these ads in settings.
      </>
    ),
    braveAdsImage)
}

function stepSchedule () {
  return basicStep(
    'When do you receive rewards',
    (
      <>
        Your earned tokens from Brave ads throughout the current month will arrive
        on the 5th of the next month.
      </>
    ),
    batScheduleImage)
}

function stepAC () {
  return basicStep(
    'Giving back made effortless',
    (
      <>
        Creators receive your token contributions automatically based on your
        engagement levels that we measure as ‘Attention’.
      </>
    ),
    acImage)
}

function stepTipping () {
  return basicStep(
    'Say thank you with tips',
    (
      <>
        Tipping is a way to personally encourage and support content or creators
        that you love. Get tippin!
      </>
    ),
    tippingImage)
}

function stepRedeem () {
  return basicStep(
    'What can you do with tokens?',
    (
      <>
        Tokens can be used beyond supporting creators. You can buy digital goods
        and giftcards with a cashback bonus.
      </>
    ),
    redeemImage)
}

function stepSettings (props: Props) {
  return (
    <style.stepPanel>
      <style.stepHeader>
        Lastly, let’s get you set up on the basic settings
      </style.stepHeader>
      <style.stepSubheader>
        You can change this later.
      </style.stepSubheader>
      <SettingsForm
        adsPerHour={props.settings.adsPerHour}
        onAdsPerHourChanged={props.onAdsPerHourChanged}
        acPercent={props.settings.acPercent}
        onAcPercentChanged={props.onAcPercentChanged}
      />
    </style.stepPanel>
  )
}

function stepComplete () {
  return basicStep(
    (
      <>
        WOOOOHOOOOO!<br />You’re done.
      </>
    ),
    (
      <>
        By using Brave Rewards, you are protecting your privacy and helping make
        the web a better place for everyone. And that’s awesome!
      </>
    ),
    completedImage)
}

const stepPanels = [
  stepWelcome,
  stepAds,
  stepSchedule,
  stepAC,
  stepTipping,
  stepRedeem,
  stepSettings,
  stepComplete
]

export function RewardsTour (props: Props) {
  const [currentStep, setCurrentStep] = React.useState(0)

  const panels = props.showSettings
    ? stepPanels
    : stepPanels.filter(fn => fn !== stepSettings)

  const onSkip = () => {
    const settingsStep = panels.indexOf(stepSettings)
    if (settingsStep >= 0) {
      setCurrentStep(settingsStep)
    } else {
      props.onDone()
    }
  }

  return (
    <style.root>
      {panels[currentStep](props)}
      <style.nav>
        <TourNavigation
          stepCount={panels.length}
          currentStep={currentStep}
          onSelectStep={setCurrentStep}
          onDone={props.onDone}
          onSkip={onSkip}
        />
      </style.nav>
    </style.root>
  )
}
