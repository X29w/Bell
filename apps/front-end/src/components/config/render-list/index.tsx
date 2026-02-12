import { Fragment } from "react/jsx-runtime";

interface RenderListProps<T = unknown> {
  items?: T[];
  renderItems: (item: T, index: number) => React.ReactNode;
  extraKey?: (item: T) => string | number;
}

const RenderList = <T extends unknown>(props: RenderListProps<T>) => {
  const { items = [], renderItems, extraKey } = props;

  return items.map((item, index) => {
    const keyValue = extraKey ? extraKey(item) : index;
    return (
      <Fragment key={keyValue !== undefined ? keyValue : index}>
        {renderItems(item, index)}
      </Fragment>
    );
  });
};

export default RenderList;
