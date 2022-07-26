import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeSortSelector } from "../redux/filters/selectors";

import { setActiveSortItem } from "../redux/filters/slice";

type SortItem = {
  title: string;
  value: string;
};

export const sortList: SortItem[] = [
  { title: "по популярности", value: "rating" },
  { title: "цене по убыванию", value: "price" },
  { title: "цена по возрастанию", value: "price" },
  { title: "по алфавиту", value: "name" },
];

export const Sort: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const [openSort, setOpenSort] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const activeSortItem: number = useSelector(activeSortSelector);

  const selectedSortItem = sortList[activeSortItem].title;

  const onClickSort = () => {
    setOpenSort(!openSort);
  };

  const onClickSortItem = (index: number) => {
    dispatch(setActiveSortItem(index));
    setOpenSort(false);
  };

  const handleClickOutSide = (e: MouseEvent) => {
    const _event = e as MouseEvent & {
      path: Node[];
    };

    if (sortRef.current && !_event.path.includes(sortRef.current)) {
      setOpenSort(false);
    }
  };

  React.useEffect(() => {
    document.body.addEventListener("click", handleClickOutSide);
    return () => {
      document.body.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={openSort ? "open" : ""}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={onClickSort}>{selectedSortItem}</span>
      </div>
      {openSort && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, index) => (
              <li
                key={`${obj.title}_${index}`}
                className={activeSortItem === index ? "active" : ""}
                onClick={() => onClickSortItem(index)}
              >
                {obj.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
