/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from 'styled-components'

export const root = styled.div`
  font-family: var(--brave-font-heading);
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--brave-palette-white);
`

export const stepPanel = styled.div`
  flex: 1 0 auto;
  text-align: center;
`

export const stepHeader = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  color: var(--brave-palette-black);
`

export const stepSubheader = styled.div`
  margin-top: 3px;
  color: var(--brave-color-brandBat);
  font-size: 14px;
  line-height: 20px;
`

export const stepText = styled.div`
  margin-top: 8px;
  font-size: 14px;
  line-height: 22px;
  color: var(--brave-palette-neutral700);
`

export const stepGraphic = styled.div`
  margin-top: 23px;
`

export const nav = styled.div`
  flex: 0 0 auto;
`
