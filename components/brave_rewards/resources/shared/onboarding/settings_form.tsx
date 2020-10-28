/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

import * as style from './settings_form.style'

interface Props {
  adsPerHour: number
  acPercent: number
  onAdsPerHourChanged: (adsPerHour: number) => void
  onAcPercentChanged: (acPercent: number) => void
}

export function SettingsForm (props: Props) {
  const adsPerHourOptions = [1, 2, 3, 4, 5]
  const acOptions = [5, 25, 50, 75, 100]

  return (
    <style.root>
      <style.section>
        <style.label>
          How often do you want to see ads?
        </style.label>
        <style.sublabel>
          (Ads per hour)
        </style.sublabel>
        <style.optionBar>
          {
            adsPerHourOptions.map((value) => {
              const className = 'large-text ' +
                (value === props.adsPerHour ? 'selected' : '')
              const onClick = () => {
                if (value !== props.adsPerHour) {
                  props.onAdsPerHourChanged(value)
                }
              }
              return (
                <button key={value} onClick={onClick} className={className}>
                  {value}
                </button>
              )
            })
          }
        </style.optionBar>
      </style.section>
      <style.section>
        <style.label>
          How much support do you want to give to your favorite creators?
        </style.label>
        <style.sublabel>
          (percent of ads earnings)
        </style.sublabel>
        <style.optionBar>
          {
            acOptions.map((value) => {
              const className = value === props.acPercent ? 'selected' : ''
              const onClick = () => {
                if (value !== props.acPercent) {
                  props.onAcPercentChanged(value)
                }
              }
              return (
                <button key={value} onClick={onClick} className={className}>
                  {value}%
                </button>
              )
            })
          }
        </style.optionBar>
      </style.section>
    </style.root>
  )
}
