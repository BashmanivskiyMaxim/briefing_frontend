import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [submissionId, setSubmissionId] = useState(null);
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      //const responseData = await response.json();
      //setSubmissionId(responseData._id);
    } catch (error) {
      console.error("There was an error!", error);
      // Handle error state
    }
  };

  if (submissionId) {
    return <p>Thank you! Submission Id: {submissionId}</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Розробка проекту</h1>

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
          <input {...register("messenger")} type="text" />
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
          Чи є у вас зараз сайт? Що вам подобається і не подобається у ньому?
        </span>
        <input
          {...register("product-essence", { required: "це поле обов'язкове!" })}
          type="text"
        />
      </div>
      <div>
        <span>
          Яка кінцева мета веб-сайту? Яка його суть?(наприклад, прямі продажі,
          надання інформації про компанію, використання як вітрини товарів)
        </span>
        <input
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
        <input
          {...register("business-niche", { required: "це поле обов'язкове!" })}
          type="text"
        />
      </div>

      <button disabled={isSubmitting}>Відправити</button>
    </form>
  );
}
