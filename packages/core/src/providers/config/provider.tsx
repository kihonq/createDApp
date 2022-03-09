import { JSXElement } from 'solid-js'

import { useReducer } from '../../hooks'
import { Config } from '../../constants'
import { DEFAULT_CONFIG } from '../../model/config/default'

import { ConfigContext } from './context'
import { configReducer } from './reducer'

interface ConfigProviderProps {
  children: JSXElement
  config: Config
}

export const ConfigProvider = (props: ConfigProviderProps) => {
  const config = () => props.config
  const [reducedConfig, dispatch] = useReducer(configReducer, { ...DEFAULT_CONFIG, ...config() })
  
  return <ConfigContext.Provider value={{ config: reducedConfig, updateConfig: dispatch }} children={props.children} />
}
