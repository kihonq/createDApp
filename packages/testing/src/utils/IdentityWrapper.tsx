import { JSXElement } from "solid-js"

export type ChildrenProps = { children?: JSXElement }

export const IdentityWrapper = ({ children }: ChildrenProps) => <>{children}</>
