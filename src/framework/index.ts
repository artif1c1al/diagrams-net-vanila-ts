// const createElement = (elementName: string, properties?: any, children?: any): HTMLElement => {
//   const element = document.createElement(elementName);
//   element.innerHTML = children;
//
//   const propertiesMap = Object.entries(properties);
//
//   // eslint-disable-next-line no-restricted-syntax
//   for (const [key, value] of propertiesMap) {
//     if (Array.isArray(value)) {
//       element.setAttribute(key, value.join(';'));
//     } else {
//       element.setAttribute(key, value.toString());
//     }
//   }
//
//   // eslint-disable-next-line consistent-return
//   return element;
// };

type FrameworkElement = {
  type: string,
  props: {
    children: any[],
    class?: string,
  }
}

type FrameworkTextElement = {
  type: 'TEXT_ELEMENT',
} & FrameworkElement;

const createTextElement = (element): FrameworkTextElement => ({
  type: 'TEXT_ELEMENT',
  props: {
    ...element,
    children: [],
  },
});

const createElement = (
  type: string,
  properties: any,
  ...children: (HTMLElement | Text | string)[]
): FrameworkElement => ({
  type,
  props: {
    ...properties,
    children: children.map((child) => (typeof child === 'string' ? createTextElement(child) : child)),
  },
});

const createDom = (fiber: any) => {

};

const commitRoot = () => {

};

const render = (element: FrameworkElement, container: HTMLElement | Text): void => {
  // eslint-disable-next-line no-use-before-define
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
  };
  // eslint-disable-next-line no-use-before-define
  nextUnitOfWork = wipRoot;
};

// const render = (element: FrameworkElement, container: HTMLElement | Text): void => {
//   const node = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type);
//
//   element.props.children.forEach((child) => render(child, node));
//
//   const isProperty = (key) => key !== 'children';
//
//   Object.keys(element.props)
//     .filter(isProperty)
//     .forEach((key) => {
//       node[key] = element.props[key];
//     });
//
//   container.appendChild(node);
// };

let nextUnitOfWork = null;
let wipRoot = null;

// eslint-disable-next-line consistent-return
const performUnitOfWork = (fiber) => {
  if (!fiber.dom) {
    // eslint-disable-next-line no-param-reassign
    fiber.dom = createDom(fiber);
  }

  // if (fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom);
  // }

  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    if (index === 0) {
      // eslint-disable-next-line no-param-reassign
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    // eslint-disable-next-line no-plusplus
    index++;
  }
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
};

const registerIdleCallback = (workLoop) => {
  // TODO
};

const workLoop = (deadline: any) => {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }

  registerIdleCallback(workLoop);
};

registerIdleCallback(workLoop);

const Framework = {
  createElement,
  render,
} as const;

export default Framework;
