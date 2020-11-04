/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from 'styled-components'

export const root = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--brave-palette-white);
  font-family: var(--brave-font-heading);
  text-align: center;
`

export const content = styled.div`
  flex: 1 0 auto;
  margin-top: 22px;
  padding: 0 30px;
`

export const batIcon = styled.div`
  height: 55px;
`

export const heading = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  margin-top: 8px;
`

export const text = styled.div`
  margin: 4px auto 0;
  color: var(--brave-palette-neutral700);
  font-size: 14px;
  line-height: 24px;
  max-width: 300px;
`

export const enable = styled.div`
  margin-top: 57px;
`

export const dismiss = styled.div`
  margin-top: 8px;

  button {
    border: 0;
    padding: 0;
    background: none;
    color: var(--brave-palette-neutral600);
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
  }
`

export const footer = styled.div`
  flex: 0 0 auto;
  padding: 54px 40px 20px;
  color: var(--brave-palette-neutral600);
  font-size: 11px;
  line-height: 16px;

  a {
    color: var(--brave-color-brandBat);
    font-weight: 600;
    text-decoration: none;
  }
`
