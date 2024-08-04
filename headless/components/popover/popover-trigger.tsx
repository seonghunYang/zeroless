import React, { forwardRef } from "react";
import { usePopoverContext } from "./popover";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "headless/types/polymorphic";
import type { PopoverTriggerProps } from "./popover";
import { mergeRef } from "headless/utils";

type _PopoverTriggerProps = {
  children: React.ReactNode;
};

type PolymorphicPopoverTriggerProps<T extends React.ElementType> =
  PolymorphicComponentPropsWithRef<T, _PopoverTriggerProps> &
    PopoverTriggerProps;

type PopoverTriggerComponent = <T extends React.ElementType = "button">(
  props: PolymorphicPopoverTriggerProps<T>
) => React.ReactNode;

export const PopoverTrigger: PopoverTriggerComponent = forwardRef(
  function PopoverTrigger<T extends React.ElementType = "button">(
    { as, ...props }: PolymorphicPopoverTriggerProps<T>,
    ref: PolymorphicRef<T>
  ) {
    const popoverContext = usePopoverContext();

    const isCompound = popoverContext !== null;

    const mergedProps = isCompound
      ? { ...popoverContext?.triggerProps, ...props }
      : props;

    const Element = as || "button";

    return (
      <Element
        {...mergedProps}
        ref={mergeRef(ref, popoverContext?.triggerRef)}
      />
    );
  }
);
