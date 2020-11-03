// Copyright (c) 2020 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import * as React from 'react'

// Feature Containers
import CardLarge from './cards/_articles/cardArticleLarge'
import CardSmall from './cards/_articles/cardArticleMedium'
import CategoryGroup from './cards/categoryGroup'
import PublisherGroup from './cards/publisherGroup'
import CardDeals from './cards/cardDeals'

// Disabled rules because we have a function
// which returns elements in a switch.
// tslint:disable:jsx-wrap-multiline jsx-alignment

enum CardType {
  Headline,
  HeadlinePaired,
  CategoryGroup,
  Deals,
  PublisherGroup
}

const PageContentOrder = [
  CardType.Headline,
  CardType.Headline,
  CardType.HeadlinePaired,
  CardType.HeadlinePaired,
  CardType.CategoryGroup,
  CardType.Headline,
  CardType.Deals,
  CardType.Headline,
  CardType.HeadlinePaired,
  CardType.PublisherGroup,
  CardType.Headline,
  CardType.HeadlinePaired
]

const RandomContentOrder = [
  CardType.Headline,
  CardType.HeadlinePaired,
  CardType.Headline
]

type Props = {
  content: BraveToday.Page
  publishers: BraveToday.Publishers
  articleToScrollTo?: BraveToday.FeedItem
  onReadFeedItem: (item: BraveToday.FeedItem) => any
}

type CardProps = Props & {
  cardType: CardType
  headlines: BraveToday.Article[]
}

function Card (props: CardProps) {
  switch (props.cardType) {
    case CardType.Headline:
      // TODO: article card should handle any number of articles and
      // adapt accordingly.
      return <CardLarge
              content={props.headlines.splice(0, 1)}
              publishers={props.publishers}
              articleToScrollTo={props.articleToScrollTo}
              onReadFeedItem={props.onReadFeedItem}
             />
    case CardType.HeadlinePaired:
      // TODO: handle content length < 2
      return <CardSmall
              content={props.headlines.splice(0, 2)}
              publishers={props.publishers}
              articleToScrollTo={props.articleToScrollTo}
              onReadFeedItem={props.onReadFeedItem}
             />
    case CardType.CategoryGroup:
      if (!props.content.itemsByCategory) {
        return null
      }
      const categoryName = props.content.itemsByCategory.categoryName
      return <CategoryGroup
        content={props.content.itemsByCategory.items}
        publishers={props.publishers}
        categoryName={categoryName}
        onReadFeedItem={props.onReadFeedItem}
        articleToScrollTo={props.articleToScrollTo}
             />
    case CardType.PublisherGroup:
      if (!props.content.itemsByPublisher) {
        return null
      }
      const publisherId = props.content.itemsByPublisher.name
      const publisher = props.publishers[publisherId]
      return <PublisherGroup
        content={props.content.itemsByPublisher.items}
        publisher={publisher}
        articleToScrollTo={props.articleToScrollTo}
        onReadFeedItem={props.onReadFeedItem}
             />
    case CardType.Deals:
      return <CardDeals content={props.content.deals} />
  }
  console.error('Asked to render unknown card type', props.cardType)
  return null
}

export default function CardsGroups (props: Props) {
  // Duplicate array so we can splice without affecting state
  const headlines = [...props.content.articles]
  const randomHeadlines = [...props.content.randomArticles]
  const groups = [
    { order: PageContentOrder, items: headlines },
    { order: RandomContentOrder, items: randomHeadlines }
  ]
  return <>{groups.flatMap((group, groupIndex) => group.order.map(
    (cardType, orderIndex) => (
      <Card
          key={`${groupIndex}-${orderIndex}`}
          {...props}
          cardType={cardType}
          headlines={group.items}
        />
    )
  ))}</>
}
