import React from "react"

import { Button as BaseButton } from "rebass"

export const Button = ({ variant = "primary", ...props }) => (
  <BaseButton variant={props.disabled ? "disabled" : variant} {...props} />
)
