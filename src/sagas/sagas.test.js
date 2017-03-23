/* eslint-env jest */
import { call, put } from 'redux-saga/effects'
import {
  packageSearch,
  packageSearchSucceeded,
  packageSearchFailed
} from '../actions/packages'
import searchApi from './searchApi'
import { searchPackages } from './sagas'

describe('searchPackages saga', () => {
  const query = 'react'
  const action = packageSearch(query)
  const apiResponse = {
    objects: [{
      package: { name: 'react' }
    }]
  }
  const apiError = new Error('something went wrong')

  describe('with a successful API response', () => {
    it('calls the search API and dispatches a success', () => {
      const generator = searchPackages(action)

      let next = generator.next()
      expect(next.value).toEqual(call(searchApi, 'react'))

      next = generator.next(apiResponse)
      expect(next.value)
        .toEqual(put(packageSearchSucceeded(query, apiResponse.objects)))

      next = generator.next()
      expect(next.done).toBe(true)
    })
  })

  describe('with a bad API response', () => {
    it('calls the search api and dispatches a failure', () => {
      const generator = searchPackages(action)

      let next = generator.next()
      expect(next.value).toEqual(call(searchApi, 'react'))

      next = generator.throw(apiError)
      expect(next.value)
        .toEqual(put(packageSearchFailed(query, apiError)))

      next = generator.next()
      expect(next.done).toBe(true)
    })
  })
})
