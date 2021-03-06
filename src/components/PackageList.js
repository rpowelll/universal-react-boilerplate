/* @flow */
import React from 'react'

import type { Package } from '../actions/types'

type Props = {
  packages: Array<Package>,
  onRefresh: () => void
}

const PackageList = ({ packages, onRefresh }: Props) => (
  <div className='packages'>
    <button onClick={onRefresh.bind(this)}>Refresh</button>
    <ul>
      {packages.map((p: Package) => (
        <li key={p.name}>{ p.name }</li>
      ))}
    </ul>
  </div>
)

export default PackageList
