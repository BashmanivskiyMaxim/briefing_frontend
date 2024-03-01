import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./form.css";

// Структура брифу
// 1. Спосіб звʼязку (як звати, телефон, терміни часу)
// 2. Загальні відомості (назва продукту, суть, цінності, вигода клієнта)
// 3. Цільова аудиторія
// 4. Для чого потрібен сайт компанії (чи продукт звичайний для клієнта)
// 5. Конкуренти
// 6. Масштаб інтересів
// 7. Питання оцінок вартості (структура, дизайни, модулі)
// 8. Додаткові питання для продуктивності (просування, наповнення, що подобається, що ні)
// 9. Додаткова інформація

export default function Form({ itemId }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (itemId) {
      fetchData(itemId);
    } else {
      setLoading(false);
    }
  }, [itemId]);

  const navigate = useNavigate();

  const fetchData = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:5000/form/${itemId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(itemId, "itemId");
      const formData = await response.json();
      Object.entries(formData.data).forEach(([key, value]) => {
        setValue(key, value);
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching form data:", error);
      setLoading(false);
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "competitors-object",
  });
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:5000/form/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      navigate("/success");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      {loading ? "Loading..." : null}
      <h1>Розробка веб-сайту</h1>

      <div>
        <label>
          <span>Як до Вас звертатись?</span>
          <input
            {...register("last-first-name", {
              required: "це поле обов'язкове!",
            })}
            aria-invalid={errors["last-first-name"] ? "true" : "false"}
            type="text"
          />
        </label>
        {errors["last-first-name"] && (
          <p role="alert">{errors["last-first-name"]?.message}</p>
        )}
      </div>

      <div>
        <label>
          <span>Ваш номер телефону</span>
          <input {...register("number-phone")} type="tel" />
        </label>
      </div>

      <div>
        <label>
          <span>Вкажіть посилання на соціальні мережі для зв'язку</span>
          <input {...register("messanger-url")} type="text" />
        </label>
      </div>

      <label>
        <span>
          Який проміжок часу вам підходить для звернень або отримання
          повідомлень?
        </span>
        {[
          { label: "Ранок (9:00 - 12:00)", value: "morning" },
          { label: "День (12:00 - 18:00)", value: "midday" },
          { label: "Вечір (18:00 - 22:00)", value: "evening" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("available-time")}
                aria-invalid={errors["available-time"] ? "true" : "false"}
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["available-time"] && (
          <p role="alert">{errors["available-time"]?.message}</p>
        )}
      </label>

      <div>
        <span>В які дні тижня ви б хотіли займатись проектом?</span>
        {[
          { label: "Понеділок", value: "monday" },
          { label: "Вівторок", value: "tuesday" },
          { label: "Середа", value: "wednesday" },
          { label: "Четвер", value: "thursday" },
          { label: "П'ятниця", value: "friday" },
          { label: "Субота", value: "saturday" },
          { label: "Неділя", value: "sunday" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("free-week", {
                  required: true,
                })}
                aria-invalid={errors["free-week"] ? "true" : "false"}
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["free-week"] && (
          <p role="alert">{errors["free-week"]?.message}</p>
        )}
      </div>
      <div>
        <span>
          На який термін розробки проекту ви розраховуєте? (Вкажіть кінцеву дату
          або кількість тижнів, необхідних для завершення проекту).
        </span>
        <input
          {...register("project-terms", { required: "це поле обов'язкове!" })}
          type="text"
        />
      </div>
      <div>
        <span>Назва продукту, для якого створюється веб-сайт</span>
        <input
          {...register("product-name", { required: "це поле обов'язкове!" })}
          type="text"
        />
      </div>
      <div>
        <span>
          Чи є у вас зараз подібний по функціоналу сайт? Що вам подобається і не
          подобається у ньому?
        </span>
        <textarea
          {...register("product-essence", { required: "це поле обов'язкове!" })}
          type="text"
        />
      </div>
      <div>
        <span>
          Яка кінцева мета веб-сайту? Яка його суть?(наприклад, прямі продажі,
          надання інформації про компанію, використання як вітрини товарів)
        </span>
        <textarea
          {...register("product-goal", { required: "це поле обов'язкове!" })}
          type="text"
        />
      </div>
      <div>
        <span>Чи маєте ви додаткові цілі?</span>
        <div class="tooltip">
          <i aria-hidden="true">Підказка...</i>

          <span class="tooltiptext">
            <ul>
              <li>Покращення логічної структури сайту</li>
              <li>Залучення більшої кількості клієнтів</li>
              <li>Впровадження сучасних трендів дизайну</li>
              <li>Створення багатомовного сайту</li>
              <li>Збільшення впізнаваності бренду</li>
              <li>Просування нового продукту або послуги</li>
              <li>Збільшення кількості продажів</li>
              <li>Інформування (інформаційна мета)</li>
              <li>Ребрендинг або редизайн попереднього сайту</li>
              <li>SEO-оптимізація сайту, усунення помилок</li>
            </ul>
          </span>
        </div>
        <textarea
          {...register("adtional-goal", { required: "це поле обов'язкове!" })}
          type="text"
        />
      </div>
      <div>
        <span>
          Вкажіть особливості бізнес-ніші, в якій ви працюєте. Що визначає
          конкуренцію в ніші?
        </span>
        {[
          { label: "Технологічний прогрес", value: "Технологічний прогрес" },
          { label: "Бренд і репутація", value: "Бренд і репутація" },
          {
            label: "Якість продукту / обслуговування",
            value: "Якість продукту / обслуговування",
          },
          { label: "Маркетингові стратегії", value: "Маркетингові стратегії" },
          { label: "Регулююче середовище", value: "Регулююче середовище" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("business-niche-optional", {
                  required: true,
                })}
                aria-invalid={errors["free-week"] ? "true" : "false"}
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        <span>Вкажіть цільову аудиторю вашого продукту?</span>
        {[
          { label: "вік 18-25", value: "вік 18-25" },
          {
            label: "вік 25-45",
            value: "вік 25-45",
          },
          { label: "вік 45+", value: "вік 45+" },
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("business-audit", {
                  required: true,
                })}
                aria-invalid={errors["free-week"] ? "true" : "false"}
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        <span>Яка ваша унікальна торговельна пропозиція?</span>
        <textarea
          {...register("business-unique-proposition", {
            required: "це поле обов'язкове!",
          })}
          type="text"
          placeholder="Унікальна торговельна пропозиція — це перевага, яка відрізняє ваш продукт або послугу від пропозицій конкурентів. "
        />
      </div>
      <span>Ваші конкуренти</span>
      {fields.map((field, index) => (
        <div className="competitor-container" key={field.id}>
          <input
            {...register(`competitors-object.${index}.name`)}
            placeholder="Назва конкурента"
            className="competitor-name"
          />
          <input
            {...register(`competitors-object.${index}.best-sides`)}
            placeholder="Його кращі сторони"
            className="competitor-description"
          />
          <input
            {...register(`competitors-object.${index}.worst-sides`)}
            placeholder="Його мінуси"
            className="competitor-description"
          />
          <button
            className="remove-competitor-button"
            type="button"
            onClick={() => remove(index)}
          >
            Видалити
          </button>
        </div>
      ))}
      <button
        className="add-competitor-button"
        type="button"
        onClick={() => append({})}
      >
        Додати конкурента
      </button>
      <span>Чи маєте ви готові елементи дизайну, можливо брендбук?</span>
      <textarea
        {...register("site-design-elements", {
          required: "це поле обов'язкове!",
        })}
        type="text"
      />
      <span>
        Який дизайн ви бажаєте бачити на вашому сайті(мінімалістичний,
        креативний, корпоративний тощо)?
      </span>
      <textarea
        {...register("site-design", { required: "це поле обов'язкове!" })}
        type="text"
      />
      <span>
        Які конкретні функції або модулі ви бажаєте мати на своєму сайті
        (наприклад, контактна форма, блог, галерея зображень тощо)?
      </span>
      <textarea
        {...register("site-modules", { required: "це поле обов'язкове!" })}
        type="text"
      />
      <span>
        Чи потрібна інтеграція зі сторонніми сервісами або платформами
        (наприклад, платіжними шлюзами, соціальними медіа, CRM системами)?
      </span>
      <textarea
        {...register("site-integration", { required: "це поле обов'язкове!" })}
        type="text"
      />
      <span>
        Чи маєте ви готовий контент (текст, зображення) для деяких сторінок, або
        потрібно розробити контент разом із дизайном?
      </span>
      <textarea
        {...register("site-content", { required: "це поле обов'язкове!" })}
        type="text"
      />

      <button className="submit" disabled={isSubmitting}>
        Відправити
      </button>
    </form>
  );
}
