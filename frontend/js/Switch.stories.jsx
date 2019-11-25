import React from 'react'
import { storiesOf } from '@storybook/react'
import StorybookPage from '../../Layout/StorybookPage/StorybookPage'

import Switch from './Switch'

storiesOf('UI/Form/Switch', module)
  .addDecorator(story => <StorybookPage>{story()}</StorybookPage>)
  .add('Default', () =>
    <Switch>Label name of the switch</Switch>
  )
  .add('Active by default', () =>
    <Switch isChecked={true}>I'm am checked by default</Switch>
  )
