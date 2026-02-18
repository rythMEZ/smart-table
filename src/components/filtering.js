import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 [DONE] — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
  // @todo: #4.1 [DONE] — заполнить выпадающие списки опциями
  Object.keys(indexes) // Получаем ключи из объекта
    .forEach((elementName) => {
      // Перебираем по именам
      elements[elementName].append(
        // в каждый элемент добавляем опции
        ...Object.values(indexes[elementName]) // формируем массив имён, значений опций
          .map((name) => {
            const option = document.createElement("option");
            option.value = name;
            const optionText = document.createTextNode(name);
            option.append(optionText);
            return option;
          }),
      );
    });

  return (data, state, action) => {
    // @todo: #4.2 [DONE] — обработать очистку поля
    document.addEventListener("click", (e) => {
      const button = e.target.closest('[name="clear"]');

      if (!button) return;

      const parent = button.parentElement;
      const input = parent.querySelector("input");

      if (!input) return;
      input.value = "";
      const fieldName = input.name;
      state[fieldName] = "";
    });

    // @todo: #4.5 [DONE] — отфильтровать данные используя компаратор
    return data.filter((row) => compare(row, state));
  };
}
