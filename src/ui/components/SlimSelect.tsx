import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { useEffect } from 'react'

import { DataArrayPartial,Option } from 'slim-select/dist/store'
import { SettingsPartial } from 'slim-select/dist/settings'
import SlimSelect, { Config, Events } from 'slim-select'

import 'slim-select/styles'

export type SlimSelectProps = {
  style?: React.CSSProperties
  id?: string | undefined
  modelValue?: string | string[] | undefined
  multiple?: boolean
  data?: DataArrayPartial
  settings?: SettingsPartial
  events?: Events
  children?: React.ReactNode
}
export interface SlimSelectRef {
  set: (newValue: string | string[]) => void
  // Potentially call other functions on SlimSelect that have not been exposed via Ref yet
  getSlimSelectInstance: () => SlimSelect
}

const SlimSelectComponent = (props: SlimSelectProps, ref: React.Ref<any>): JSX.Element => {
  const { id = undefined, modelValue, style = {}, multiple = false, data, settings, events, children } = props

  const slimHTMLElement = useRef(null)
  const slimSelect = useRef<SlimSelect>()
  const value = useRef<any>()

  useEffect(() => {
    const config = {
      select: slimHTMLElement.current as unknown as Element,
      events: {},
    } as Config

    // If data is passed in, use it
    if (data) {
      config.data = data
    }
    // If settings are passed in, use it
    if (settings) {
      config.settings = settings
    }
    // If events are passed in, use it
    if (events) {
      config.events = events
    }
    // Satisfy tsc
    if (config.events == undefined) {
      config.events = {}
    }

    // Wrap config.events.afterChange to run value update
    const originalPropAfterChange = config.events.afterChange

    config.events.afterChange = function (newSelectedOption: Option[]): void {
      if (Array.isArray(newSelectedOption) && newSelectedOption.length > 0) {
        const stringValue = multiple ? newSelectedOption.map((option) => option.value) : newSelectedOption[0].value
        if (value.current !== stringValue) {
          value.current = stringValue
        }
      }
      // If they had an original afterChange, run it
      if (config.events && originalPropAfterChange && typeof originalPropAfterChange === 'function') {
        originalPropAfterChange(newSelectedOption)
      }
    }

    // Initialize SlimSelect
    slimSelect.current = new SlimSelect(config)

    // Get SlimSelect selected values
    const selected = multiple
      ? (slimSelect.current as SlimSelect).getSelected()
      : (slimSelect.current as SlimSelect).getSelected()[0]

    // Check if modelValue is the same as the value of the select
    if (selected !== modelValue && modelValue) {
      // If not, set the value of the select to the modelValue
      ;(slimSelect.current as SlimSelect).setSelected(modelValue)
    }

    // Destroy SlimSelect on unmount
    return () => {
      if (slimSelect.current) {
        ;(slimSelect.current as SlimSelect)?.destroy()
      }
    }
  }, [modelValue, multiple, data, settings, events, children])

 

  useImperativeHandle(
    ref,
    () => {
      return {
        set(newValue: string | string[]): void {
          ;(slimSelect.current as SlimSelect)?.setSelected(newValue)
        },
        getSlimSelectInstance(): SlimSelect {
          return slimSelect.current as SlimSelect
        },
      } as SlimSelectRef
    },
    [],
  )

  return (
    <>
      <select style={style} id={id} data-testid={id} multiple={multiple} ref={slimHTMLElement}>
        {children}
      </select>
    </>
  )
}

export default forwardRef(SlimSelectComponent)