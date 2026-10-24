import React, { Children, cloneElement, Fragment, isValidElement } from 'react';
export function Select({
  children,
  ...props
}) {
  let initial;
  function options(nodes) {
    return Children.toArray(nodes).flatMap(node => {
      if (!isValidElement(node)) return node;
      if (node.type === Fragment) return options(node.props.children);
      if (node.type !== 'option') return node;
      const {
        selected,
        ...optionProps
      } = node.props;
      if (selected) initial = optionProps.value ?? Children.toArray(optionProps.children).join('');
      return cloneElement(node, {
        ...optionProps,
        selected: undefined
      });
    });
  }
  const items = options(children);
  return <select {...props} defaultValue={props.defaultValue ?? initial}>{items}</select>;
}
