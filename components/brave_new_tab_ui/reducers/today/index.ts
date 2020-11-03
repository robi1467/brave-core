import { createReducer } from 'redux-act'
import * as Actions from '../../actions/today_actions'

export type BraveTodayState = {
  // Are we in the middle of checking for new data
  isFetching: boolean | string
  isUpdateAvailable: boolean
  // How many pages have been displayed so far for the current data
  currentPageIndex: number
  // Feed data
  feed?: BraveToday.Feed
  publishers?: BraveToday.Publishers
  articleScrollTo?: BraveToday.FeedItem
}

function storeInHistoryState (data: Object) {
  const oldHistoryState = (typeof history.state === 'object') ? history.state : {}
  const newHistoryState = { ...oldHistoryState, ...data }
  history.pushState(newHistoryState, document.title)
}

const defaultState: BraveTodayState = {
  isFetching: true,
  isUpdateAvailable: false,
  currentPageIndex: 0
}
// Get previously-clicked article from history state
if (history.state && history.state.todayArticle) {
  defaultState.currentPageIndex = history.state.todayPageIndex as number || 0
  defaultState.articleScrollTo = history.state.todayArticle as BraveToday.FeedItem
  // Clear history state now that we have the info on app state
  storeInHistoryState({ todayArticle: null, todayPageIndex: null })
}

// TODO(petemill): Make sure we don't keep scrolling to the scrolled-to article
// if it gets removed and rendered again (e.g. if brave today is toggled off and on).
// Reset to defaultState when Today is turned off or refreshed.

const reducer = createReducer<BraveTodayState>({}, defaultState)

export default reducer

reducer.on(Actions.interactionBegin, (state, payload) => ({
  ...state,
  isFetching: true
}))

reducer.on(Actions.errorGettingDataFromBackground, (state, payload) => ({
  ...state,
  isFetching: (payload && payload.error && payload.error.message) || 'Unknown error.'
}))

reducer.on(Actions.dataReceived, (state, payload) => {
  const newState = {
    ...state,
    isFetching: false
  }
  if (payload.feed) {
    const isNewFeed = !state.feed || state.feed.hash !== payload.feed.hash
    if (isNewFeed) {
      newState.feed = payload.feed
      newState.currentPageIndex = state.articleScrollTo ? state.currentPageIndex : 0
      newState.isUpdateAvailable = false
    }
  }
  if (payload.publishers) {
    newState.publishers = payload.publishers
  }
  return newState
})

reducer.on(Actions.anotherPageNeeded, (state) => {
  // Add a new page of content to the state
  return {
    ...state,
    currentPageIndex: state.currentPageIndex + 1
  }
})

reducer.on(Actions.setPublisherPref, (state, payload) => {
  // TODO(petemill): Store change in pending, or simply store that we're
  // waiting for the change.
  return state
})

reducer.on(Actions.isUpdateAvailable, (state, payload) => {
  return {
    ...state,
    isUpdateAvailable: payload.isUpdateAvailable
  }
})

reducer.on(Actions.refresh, (state) => {
  return {
    ...state,
    isFetching: true,
    articleScrollTo: undefined
  }
})
